import { useState, useEffect } from 'react';
import { getStoredUser, logout as logoutService, type User } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    setIsLoading(true);
    // Just read from localStorage for fast loading
    // Session verification happens on API calls
    const currentUser = getStoredUser();
    setUser(currentUser);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await logoutService();
    setUser(null);
    setIsLoading(false);
    // Redirect to home
    window.location.href = '/';
  };

  const refresh = () => {
    loadUser();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refresh,
  };
}
