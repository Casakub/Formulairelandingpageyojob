import { projectId, publicAnonKey } from '../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/auth`;

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  created_at?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface LoginResponse {
  success: boolean;
  session?: Session;
  user?: User;
  error?: string;
}

export interface SignupResponse {
  success: boolean;
  user?: User;
  session?: Session;
  message?: string;
  error?: string;
  needsLogin?: boolean;
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
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

    if (!response.ok) {
      return { success: false, error: data.error || 'Erreur de connexion' };
    }

    // Store session in localStorage
    if (data.session) {
      localStorage.setItem('yojob_session', JSON.stringify(data.session));
      localStorage.setItem('yojob_user', JSON.stringify(data.user));
    }

    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: 'Erreur réseau lors de la connexion' };
  }
}

/**
 * Signup new admin user (first-time setup)
 */
export async function signup(email: string, password: string, name: string): Promise<SignupResponse> {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Signup failed:', data.error);
      return { success: false, error: data.error || 'Erreur lors de la création du compte' };
    }

    // If session is provided, store it
    if (data.session) {
      localStorage.setItem('yojob_session', JSON.stringify(data.session));
      localStorage.setItem('yojob_user', JSON.stringify(data.user));
      console.log('✅ Signup successful with session');
    } else {
      console.log('✅ Signup successful, login required');
    }

    return data;
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, error: 'Erreur réseau lors de la création du compte' };
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    const session = getStoredSession();
    
    if (!session) {
      return { success: true };
    }

    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    // Clear local storage even if API call fails
    localStorage.removeItem('yojob_session');
    localStorage.removeItem('yojob_user');
    localStorage.removeItem('yojob_admin_auth');
    localStorage.removeItem('yojob_admin_login_time');

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Logout error:', error);
    
    // Clear local storage even on error
    localStorage.removeItem('yojob_session');
    localStorage.removeItem('yojob_user');
    
    return { success: false, error: 'Erreur lors de la déconnexion' };
  }
}

/**
 * Get current session from localStorage
 */
export function getStoredSession(): Session | null {
  try {
    const sessionStr = localStorage.getItem('yojob_session');
    if (!sessionStr) return null;
    
    const session: Session = JSON.parse(sessionStr);
    
    // Check if session is expired
    if (session.expires_at && Date.now() / 1000 > session.expires_at) {
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error parsing stored session:', error);
    return null;
  }
}

/**
 * Get current user from localStorage
 */
export function getStoredUser(): User | null {
  try {
    const userStr = localStorage.getItem('yojob_user');
    if (!userStr) return null;
    
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
}

/**
 * Get current user (checks both localStorage and session validity)
 */
export async function getCurrentUser(): Promise<User | null> {
  // First check if we have a user in localStorage
  const storedUser = getStoredUser();
  const storedSession = getStoredSession();
  
  // If no user or session, return null
  if (!storedUser || !storedSession) {
    return null;
  }
  
  // Verify the session is still valid with the API
  const verification = await verifySession();
  
  if (verification.success && verification.user) {
    return verification.user;
  }
  
  // Session invalid, return null
  return null;
}

/**
 * Verify current session with API
 */
export async function verifySession(): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const session = getStoredSession();
    
    if (!session) {
      return { success: false, error: 'Aucune session active' };
    }

    const response = await fetch(`${BASE_URL}/session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Clear invalid session
      localStorage.removeItem('yojob_session');
      localStorage.removeItem('yojob_user');
      return { success: false, error: data.error || 'Session invalide' };
    }

    // Update stored user data
    if (data.user) {
      localStorage.setItem('yojob_user', JSON.stringify(data.user));
    }

    return data;
  } catch (error: any) {
    console.error('Session verification error:', error);
    return { success: false, error: 'Erreur lors de la vérification de session' };
  }
}

/**
 * Refresh access token
 */
export async function refreshSession(): Promise<{ success: boolean; session?: Session; error?: string }> {
  try {
    const session = getStoredSession();
    
    if (!session?.refresh_token) {
      return { success: false, error: 'Aucun token de rafraîchissement' };
    }

    const response = await fetch(`${BASE_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Échec du rafraîchissement' };
    }

    // Update stored session
    if (data.session) {
      localStorage.setItem('yojob_session', JSON.stringify(data.session));
    }

    return data;
  } catch (error: any) {
    console.error('Refresh session error:', error);
    return { success: false, error: 'Erreur lors du rafraîchissement de session' };
  }
}

/**
 * Change password
 */
export async function changePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = getStoredSession();
    
    if (!session) {
      return { success: false, error: 'Non authentifié' };
    }

    const response = await fetch(`${BASE_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ new_password: newPassword }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Change password error:', error);
    return { success: false, error: 'Erreur lors du changement de mot de passe' };
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const session = getStoredSession();
  return session !== null;
}

/**
 * Initialize auth (check existing session)
 */
export async function initAuth(): Promise<{ authenticated: boolean; user?: User }> {
  // Check for old localStorage auth (migration)
  const oldAuth = localStorage.getItem('yojob_admin_auth');
  if (oldAuth === 'true' && !getStoredSession()) {
    // Clear old auth system
    localStorage.removeItem('yojob_admin_auth');
    localStorage.removeItem('yojob_admin_login_time');
  }

  const session = getStoredSession();
  
  if (!session) {
    return { authenticated: false };
  }

  // Verify session with API
  const verification = await verifySession();
  
  if (!verification.success) {
    return { authenticated: false };
  }

  return { authenticated: true, user: verification.user };
}
