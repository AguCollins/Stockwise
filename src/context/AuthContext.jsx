// src/context/AuthContext.jsx
import { useState, useEffect } from 'react';
import { AuthContext } from './authContextValue';

const STORAGE_KEY = 'stockwise.auth';

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredAuth(payload) {
  try {
    if (payload) localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const stored = readStoredAuth();
    if (stored?.user && stored?.token) {
      setUser(stored.user);
      setToken(stored.token);
    }
    setIsRestoring(false);
  }, []);

  const login = async (email) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockUser = {
        id: 1,
        email,
        firstName: 'Business',
        lastName: 'Owner',
        businessName: 'My Store',
      };
      const mockToken = `mock-token-${Date.now()}`;
      setUser(mockUser);
      setToken(mockToken);
      writeStoredAuth({ user: mockUser, token: mockToken });
      return { success: true };
    } catch {
      return { success: false, message: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockUser = {
        id: 1,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        businessName: formData.businessName,
        businessType: formData.businessType,
      };
      const mockToken = `mock-token-${Date.now()}`;
      setUser(mockUser);
      setToken(mockToken);
      writeStoredAuth({ user: mockUser, token: mockToken });
      return { success: true };
    } catch {
      return { success: false, message: 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    writeStoredAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isRestoring, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}