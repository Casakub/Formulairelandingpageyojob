import { Context } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const BUCKET_NAME = 'make-10092a63-landing-avatars';

// Initialize bucket on startup
async function initializeBucket() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`📦 Creating bucket: ${BUCKET_NAME}`);
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false, // Private bucket for security
        fileSizeLimit: 5242880, // 5MB limit
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      });
      
      if (error) {
        console.error('❌ Error creating bucket:', error);
      } else {
        console.log('✅ Bucket created successfully');
      }
    } else {
      console.log(`✅ Bucket already exists: ${BUCKET_NAME}`);
    }
  } catch (error) {
    console.error('❌ Error initializing storage bucket:', error);
  }
}

// Initialize on module load
initializeBucket();

/**
 * Upload avatar image
 * POST /storage/upload-avatar
 * Body: { fileName: string, fileData: string (base64), contentType: string }
 */
export async function uploadAvatar(c: Context) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { fileName, fileData, contentType } = await c.req.json();
    
    if (!fileName || !fileData || !contentType) {
      return c.json({ error: 'Missing required fields: fileName, fileData, contentType' }, 400);
    }
    
    // Validate content type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(contentType)) {
      return c.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }, 400);
    }
    
    // Convert base64 to buffer
    const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const extension = contentType.split('/')[1];
    const uniqueFileName = `avatar-${timestamp}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}.${extension}`;
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(uniqueFileName, buffer, {
        contentType,
        upsert: false
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: `Upload failed: ${uploadError.message}` }, 500);
    }
    
    // Generate signed URL (valid for 10 years for landing page images)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(uniqueFileName, 315360000); // 10 years in seconds
    
    if (urlError) {
      console.error('Signed URL error:', urlError);
      return c.json({ error: `Failed to generate URL: ${urlError.message}` }, 500);
    }
    
    console.log(`✅ Avatar uploaded successfully: ${uniqueFileName}`);
    
    return c.json({
      success: true,
      fileName: uniqueFileName,
      url: signedUrlData.signedUrl,
      message: 'Avatar uploaded successfully'
    });
    
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
}

/**
 * Delete avatar image
 * DELETE /storage/delete-avatar
 * Body: { fileName: string }
 */
export async function deleteAvatar(c: Context) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { fileName } = await c.req.json();
    
    if (!fileName) {
      return c.json({ error: 'Missing fileName' }, 400);
    }
    
    // Delete from Supabase Storage
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);
    
    if (error) {
      console.error('Delete error:', error);
      return c.json({ error: `Delete failed: ${error.message}` }, 500);
    }
    
    console.log(`✅ Avatar deleted successfully: ${fileName}`);
    
    return c.json({
      success: true,
      message: 'Avatar deleted successfully'
    });
    
  } catch (error: any) {
    console.error('Error deleting avatar:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
}

/**
 * Refresh signed URL for an existing file
 * POST /storage/refresh-url
 * Body: { fileName: string }
 */
export async function refreshSignedUrl(c: Context) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { fileName } = await c.req.json();
    
    if (!fileName) {
      return c.json({ error: 'Missing fileName' }, 400);
    }
    
    // Generate new signed URL
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 315360000); // 10 years
    
    if (urlError) {
      console.error('Signed URL error:', urlError);
      return c.json({ error: `Failed to generate URL: ${urlError.message}` }, 500);
    }
    
    return c.json({
      success: true,
      url: signedUrlData.signedUrl
    });
    
  } catch (error: any) {
    console.error('Error refreshing signed URL:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
}
