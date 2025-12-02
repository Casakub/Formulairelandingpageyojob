import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

// Create Supabase Admin Client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// ========== AUTHENTICATION ENDPOINTS ==========

/**
 * POST /auth/signup
 * Create a new admin user (one-time setup)
 * Body: { email: string, password: string, name: string }
 */
app.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    console.log('📝 Signup request received for:', email);

    if (!email || !password) {
      return c.json({ success: false, error: 'Email et mot de passe requis' }, 400);
    }

    if (password.length < 6) {
      return c.json({ success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' }, 400);
    }

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
    }

    const userExists = existingUsers?.users?.some((u) => u.email === email);

    if (userExists) {
      console.log('⚠️ User already exists:', email);
      return c.json({ success: false, error: 'Un utilisateur avec cet email existe déjà' }, 400);
    }

    // Create user with Supabase Auth using admin API
    console.log('🔧 Creating user with admin API...');
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since we don't have email server configured
      user_metadata: {
        name: name || 'Admin YOJOB',
        role: 'admin',
        created_at: new Date().toISOString(),
      },
    });

    if (error) {
      console.error('❌ Error creating admin user:', error);
      return c.json({ success: false, error: `Erreur lors de la création: ${error.message}` }, 500);
    }

    if (!data || !data.user) {
      console.error('❌ No user data returned from createUser');
      return c.json({ success: false, error: 'Erreur: aucune donnée utilisateur retournée' }, 500);
    }

    console.log('✅ Admin user created successfully:', email);
    console.log('   User ID:', data.user.id);
    console.log('   Email confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No');

    // Now create a session for immediate login
    console.log('🔐 Creating initial session...');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    const { data: sessionData, error: sessionError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (sessionError) {
      console.error('⚠️ Error creating session after signup:', sessionError);
      // Still return success for user creation, but warn about session
      return c.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name,
        },
        message: 'Utilisateur créé avec succès. Veuillez vous connecter.',
        needsLogin: true,
      });
    }

    // Return user data with session
    return c.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      },
      session: sessionData?.session ? {
        access_token: sessionData.session.access_token,
        refresh_token: sessionData.session.refresh_token,
        expires_at: sessionData.session.expires_at,
      } : undefined,
      message: 'Utilisateur créé avec succès',
    });
  } catch (error: any) {
    console.error('❌ Error in signup endpoint:', error);
    return c.json({ success: false, error: `Erreur inattendue: ${error.message}` }, 500);
  }
});

/**
 * POST /auth/login
 * Login with email and password
 * Body: { email: string, password: string }
 */
app.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    console.log('🔐 Login request received for:', email);

    if (!email || !password) {
      return c.json({ success: false, error: 'Email et mot de passe requis' }, 400);
    }

    // First, check if user exists in the system
    console.log('🔍 Checking if user exists...');
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error listing users:', listError);
    } else {
      const userExists = users?.users?.find((u) => u.email === email);
      if (!userExists) {
        console.log('⚠️ User not found in database:', email);
        return c.json({ 
          success: false, 
          error: 'Aucun compte trouvé avec cet email. Créez d\'abord un compte.' 
        }, 404);
      }
      console.log('✓ User exists in database');
      console.log('  Email confirmed:', userExists.email_confirmed_at ? 'Yes' : 'No');
      console.log('  Last sign in:', userExists.last_sign_in_at || 'Never');
    }

    // Create a temporary Supabase client for authentication
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    // Sign in with email and password
    console.log('🔑 Attempting sign in with password...');
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Authentication error during login:', error);
      console.error('   Error name:', error.name);
      console.error('   Error message:', error.message);
      console.error('   Error status:', error.status);
      
      if (error.message.includes('Invalid login credentials')) {
        return c.json({ 
          success: false, 
          error: 'Email ou mot de passe incorrect. Vérifiez vos identifiants.' 
        }, 401);
      }
      
      return c.json({ 
        success: false, 
        error: `Erreur d'authentification: ${error.message}` 
      }, 401);
    }

    if (!data.session || !data.user) {
      console.error('❌ No session or user data returned');
      return c.json({ 
        success: false, 
        error: 'Échec de la création de session' 
      }, 500);
    }

    console.log('✅ User logged in successfully:', email);
    console.log('   User ID:', data.user.id);
    console.log('   Session expires at:', new Date(data.session.expires_at! * 1000).toISOString());

    return c.json({
      success: true,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role,
      },
    });
  } catch (error: any) {
    console.error('❌ Error in login endpoint:', error);
    return c.json({ success: false, error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * POST /auth/logout
 * Logout current user
 * Headers: Authorization: Bearer {access_token}
 */
app.post('/logout', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ success: false, error: 'Token non fourni' }, 401);
    }

    // Verify and sign out
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user) {
      return c.json({ success: false, error: 'Token invalide' }, 401);
    }

    // Sign out the user
    const { error } = await supabaseAdmin.auth.admin.signOut(accessToken);

    if (error) {
      console.error('Error signing out user:', error);
      return c.json({ success: false, error: error.message }, 500);
    }

    console.log('✅ User logged out successfully:', user.email);

    return c.json({
      success: true,
      message: 'Déconnexion réussie',
    });
  } catch (error: any) {
    console.error('Error in logout endpoint:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /auth/session
 * Get current session
 * Headers: Authorization: Bearer {access_token}
 */
app.get('/session', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ success: false, error: 'Token non fourni' }, 401);
    }

    // Verify token and get user
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ success: false, error: 'Session invalide ou expirée' }, 401);
    }

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        role: user.user_metadata?.role,
        created_at: user.user_metadata?.created_at,
      },
    });
  } catch (error: any) {
    console.error('Error in session endpoint:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /auth/refresh
 * Refresh access token
 * Body: { refresh_token: string }
 */
app.post('/refresh', async (c) => {
  try {
    const body = await c.req.json();
    const { refresh_token } = body;

    if (!refresh_token) {
      return c.json({ success: false, error: 'Refresh token requis' }, 400);
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    // Refresh the session
    const { data, error } = await supabaseClient.auth.refreshSession({
      refresh_token,
    });

    if (error || !data.session) {
      console.error('Error refreshing session:', error);
      return c.json({ success: false, error: 'Token de rafraîchissement invalide' }, 401);
    }

    return c.json({
      success: true,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
    });
  } catch (error: any) {
    console.error('Error in refresh endpoint:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /auth/change-password
 * Change user password
 * Headers: Authorization: Bearer {access_token}
 * Body: { new_password: string }
 */
app.post('/change-password', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ success: false, error: 'Token non fourni' }, 401);
    }

    const body = await c.req.json();
    const { new_password } = body;

    if (!new_password) {
      return c.json({ success: false, error: 'Nouveau mot de passe requis' }, 400);
    }

    // Verify token and get user
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user) {
      return c.json({ success: false, error: 'Token invalide' }, 401);
    }

    // Update password
    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: new_password,
    });

    if (error) {
      console.error('Error updating password:', error);
      return c.json({ success: false, error: error.message }, 500);
    }

    console.log('✅ Password changed successfully for:', user.email);

    return c.json({
      success: true,
      message: 'Mot de passe modifié avec succès',
    });
  } catch (error: any) {
    console.error('Error in change-password endpoint:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /auth/users
 * List all users (admin only)
 * Headers: Authorization: Bearer {access_token}
 */
app.get('/users', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ success: false, error: 'Token non fourni' }, 401);
    }

    // Verify token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user) {
      return c.json({ success: false, error: 'Token invalide' }, 401);
    }

    // Get all users
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error('Error listing users:', error);
      return c.json({ success: false, error: error.message }, 500);
    }

    const users = data.users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.user_metadata?.name,
      role: u.user_metadata?.role,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
      email_confirmed_at: u.email_confirmed_at,
    }));

    return c.json({
      success: true,
      users,
      total: users.length,
    });
  } catch (error: any) {
    console.error('Error in users endpoint:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /auth/debug
 * Debug endpoint to check user existence (no auth required for debugging)
 * Query: ?email=xxx
 */
app.get('/debug', async (c) => {
  try {
    const email = c.req.query('email');

    if (!email) {
      return c.json({ success: false, error: 'Email parameter required' }, 400);
    }

    console.log('🔍 Debug: Checking user existence for:', email);

    // Get all users
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error('❌ Error listing users:', error);
      return c.json({ success: false, error: error.message }, 500);
    }

    const user = data.users.find((u) => u.email === email);

    if (!user) {
      console.log('⚠️ User not found:', email);
      return c.json({
        success: false,
        message: 'User not found',
        totalUsers: data.users.length,
        allEmails: data.users.map(u => u.email),
      });
    }

    console.log('✓ User found:', email);
    console.log('  Created:', user.created_at);
    console.log('  Confirmed:', user.email_confirmed_at);
    console.log('  Last sign in:', user.last_sign_in_at);

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        role: user.user_metadata?.role,
        created_at: user.created_at,
        email_confirmed_at: user.email_confirmed_at,
        last_sign_in_at: user.last_sign_in_at,
      },
      message: 'User exists and can login',
    });
  } catch (error: any) {
    console.error('❌ Error in debug endpoint:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /auth/force-reset-password
 * 🚨 EMERGENCY: Force reset password for an existing user
 * Body: { email: string, new_password: string }
 */
app.post('/force-reset-password', async (c) => {
  try {
    const body = await c.req.json();
    const { email, new_password } = body;

    console.log('🔧 Force password reset for:', email);

    if (!email || !new_password) {
      return c.json({ 
        success: false, 
        error: 'Email et nouveau mot de passe requis' 
      }, 400);
    }

    if (new_password.length < 6) {
      return c.json({ 
        success: false, 
        error: 'Le mot de passe doit contenir au moins 6 caractères' 
      }, 400);
    }

    // Find user by email
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
      return c.json({ success: false, error: 'Erreur lors de la recherche de l\'utilisateur' }, 500);
    }

    const user = users?.users?.find((u) => u.email === email);

    if (!user) {
      return c.json({ 
        success: false, 
        error: 'Utilisateur introuvable avec cet email' 
      }, 404);
    }

    console.log('✓ User found:', user.email);
    console.log('  User ID:', user.id);

    // Update password using admin API
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: new_password }
    );

    if (error) {
      console.error('❌ Error updating password:', error);
      return c.json({ 
        success: false, 
        error: `Erreur lors de la mise à jour du mot de passe: ${error.message}` 
      }, 500);
    }

    console.log('✅ Password updated successfully for:', email);

    return c.json({
      success: true,
      message: `Mot de passe mis à jour avec succès pour ${email}`,
      user: {
        id: data.user.id,
        email: data.user.email,
      }
    });

  } catch (error: any) {
    console.error('❌ Error in force-reset-password:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default app;
