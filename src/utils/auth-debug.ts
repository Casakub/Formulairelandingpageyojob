/**
 * Utilities for debugging authentication issues
 */

import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/auth`;

/**
 * Check if a user exists in Supabase Auth
 */
export async function checkUserExists(email: string): Promise<void> {
  console.log('🔍 Checking if user exists:', email);
  
  try {
    const response = await fetch(`${BASE_URL}/debug?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ User exists!');
      console.log('   Email:', data.user.email);
      console.log('   Created:', data.user.created_at);
      console.log('   Email confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No');
      console.log('   Last sign in:', data.user.last_sign_in_at || 'Never');
      console.log('   Name:', data.user.name);
      console.log('   Role:', data.user.role);
    } else {
      console.log('❌ User not found');
      console.log('   Total users in system:', data.totalUsers);
      console.log('   All emails:', data.allEmails);
    }

    return data;
  } catch (error) {
    console.error('❌ Error checking user:', error);
  }
}

/**
 * Test login with credentials
 */
export async function testLogin(email: string, password: string): Promise<void> {
  console.log('🔐 Testing login for:', email);
  
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Login successful!');
      console.log('   User ID:', data.user.id);
      console.log('   Email:', data.user.email);
      console.log('   Name:', data.user.name);
      console.log('   Token expires:', new Date(data.session.expires_at * 1000).toISOString());
    } else {
      console.log('❌ Login failed');
      console.log('   Error:', data.error);
    }

    return data;
  } catch (error) {
    console.error('❌ Error during login test:', error);
  }
}

/**
 * Quick test suite for authentication
 */
export async function runAuthTests(email: string = 'admin@yojob.com', password: string = 'Adeole@33700'): Promise<void> {
  console.log('🧪 Running authentication tests...');
  console.log('================================');
  
  // Test 1: Check if user exists
  console.log('\n📋 Test 1: Check user existence');
  await checkUserExists(email);
  
  // Test 2: Try to login
  console.log('\n📋 Test 2: Test login');
  await testLogin(email, password);
  
  console.log('\n================================');
  console.log('✅ Tests completed!');
}

/**
 * Get current logged in user from localStorage
 */
export function getCurrentUser(): void {
  const session = localStorage.getItem('yojob_session');
  const user = localStorage.getItem('yojob_user');
  
  if (!session || !user) {
    console.log('❌ Aucun utilisateur connecté');
    console.log('   Session:', session ? 'Existe' : 'Non trouvée');
    console.log('   User:', user ? 'Existe' : 'Non trouvé');
    return;
  }
  
  try {
    const sessionData = JSON.parse(session);
    const userData = JSON.parse(user);
    
    console.log('✅ Utilisateur connecté:');
    console.log('   Email:', userData.email);
    console.log('   Nom:', userData.name || 'Non défini');
    console.log('   Role:', userData.role || 'Non défini');
    console.log('   User ID:', userData.id);
    console.log('   Session expire:', new Date(sessionData.expires_at * 1000).toISOString());
    console.log('   Session valide:', new Date(sessionData.expires_at * 1000) > new Date() ? 'Oui ✅' : 'Non ❌ (expirée)');
    
    return userData;
  } catch (error) {
    console.error('❌ Erreur lors de la lecture des données:', error);
  }
}

/**
 * Clear session and logout
 */
export function clearSession(): void {
  console.log('🧹 Nettoyage de la session...');
  
  localStorage.removeItem('yojob_session');
  localStorage.removeItem('yojob_user');
  localStorage.removeItem('yojob_admin_auth');
  localStorage.removeItem('yojob_admin_login_time');
  
  console.log('✅ Session supprimée. Rechargez la page.');
}

// Export to window for easy console access
if (typeof window !== 'undefined') {
  (window as any).authDebug = {
    checkUserExists,
    testLogin,
    runAuthTests,
    getCurrentUser,
    clearSession,
  };
  
  console.log('🛠️ Auth Debug Tools loaded!');
  console.log('Available commands:');
  console.log('  authDebug.getCurrentUser()          - Voir qui est connecté');
  console.log('  authDebug.checkUserExists("email")  - Vérifier si un compte existe');
  console.log('  authDebug.testLogin("email", "pwd") - Tester le login');
  console.log('  authDebug.runAuthTests()            - Tout tester');
  console.log('  authDebug.clearSession()            - Se déconnecter manuellement');
}
