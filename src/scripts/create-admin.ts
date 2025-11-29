/**
 * Script to create the first admin account
 * 
 * This script can be run to create the initial admin user.
 * After creation, you can login with these credentials.
 * 
 * Usage:
 * 1. Open browser console on your app
 * 2. Copy and paste this code
 * 3. Run: createAdminAccount()
 */

interface CreateAdminParams {
  email?: string;
  password?: string;
  name?: string;
}

async function createAdminAccount(params: CreateAdminParams = {}) {
  const {
    email = 'admin@yojob.com',
    password = 'Adeole@33700',
    name = 'Admin YOJOB'
  } = params;

  console.log('🔐 Creating admin account...');
  console.log('📧 Email:', email);
  console.log('👤 Name:', name);

  try {
    // Get project ID and anon key
    const projectId = (window as any).SUPABASE_PROJECT_ID || 'YOUR_PROJECT_ID';
    const anonKey = (window as any).SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('✅ Admin account created successfully!');
      console.log('👤 User:', data.user);
      console.log('');
      console.log('🎉 You can now login with:');
      console.log('   Email:', email);
      console.log('   Password:', password);
      console.log('');
      console.log('🔒 Important: Change this password after first login!');
      return data;
    } else {
      console.error('❌ Error creating admin account:', data.error);
      
      if (data.error?.includes('existe déjà')) {
        console.log('');
        console.log('ℹ️  An admin account already exists.');
        console.log('   Try logging in with your credentials.');
      }
      
      return null;
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    console.log('');
    console.log('💡 Make sure:');
    console.log('   1. Supabase is configured');
    console.log('   2. Your internet connection is working');
    console.log('   3. The server is running');
    return null;
  }
}

// Export for use in console
if (typeof window !== 'undefined') {
  (window as any).createAdminAccount = createAdminAccount;
  console.log('✅ Admin creation script loaded!');
  console.log('');
  console.log('To create an admin account, run:');
  console.log('  createAdminAccount()');
  console.log('');
  console.log('Or with custom credentials:');
  console.log('  createAdminAccount({');
  console.log('    email: "admin@yojob.com",');
  console.log('    password: "Adeole@33700",');
  console.log('    name: "Admin YOJOB"');
  console.log('  })');
}

export { createAdminAccount };
