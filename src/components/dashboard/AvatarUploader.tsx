import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface AvatarUploaderProps {
  currentAvatar?: string;
  onAvatarChange: (url: string | undefined) => void;
  name: string; // For fallback initials
}

// Helper function to generate initials
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Helper function to get avatar color based on name
function getAvatarColor(name: string): string {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-violet-500 to-purple-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-amber-500',
    'from-pink-500 to-rose-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function AvatarUploader({ currentAvatar, onAvatarChange, name }: AvatarUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPG, PNG, WebP ou GIF.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Fichier trop volumineux. Maximum 5 MB.');
      return;
    }

    setUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;

        // Upload to Supabase Storage via backend
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/storage/upload-avatar`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              fileName: file.name,
              fileData: base64Data,
              contentType: file.type,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json();

        if (data.success && data.url) {
          setPreview(data.url);
          onAvatarChange(data.url);
          toast.success('✅ Avatar uploadé avec succès !');
        } else {
          throw new Error('Invalid response from server');
        }
      };

      reader.onerror = () => {
        throw new Error('Failed to read file');
      };

      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Erreur d'upload : ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = () => {
    setPreview(undefined);
    onAvatarChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Avatar supprimé. Les initiales seront affichées.');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Preview */}
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt="Avatar preview"
            className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
          />
        ) : (
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getAvatarColor(name)} flex items-center justify-center border-2 border-slate-200`}>
            <span className="text-white text-xl">{getInitials(name)}</span>
          </div>
        )}
        
        {preview && (
          <button
            onClick={handleRemoveAvatar}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            title="Supprimer l'avatar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Upload button */}
      <div className="flex-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          size="sm"
          variant="outline"
          className="w-full"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-2" />
              Upload en cours...
            </>
          ) : (
            <>
              {preview ? (
                <>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Changer l&apos;avatar
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Uploader un avatar
                </>
              )}
            </>
          )}
        </Button>
        
        <p className="text-xs text-slate-500 mt-1">
          JPG, PNG, WebP ou GIF - Max 5 MB
        </p>
      </div>
    </div>
  );
}
