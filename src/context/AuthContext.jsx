// src/context/AuthContext.jsx
import { useState } from 'react';
import { AuthContext } from './authContextValue';

// AuthProvider wraps the app and provides auth state everywhere.
// This file exports only this component (the context object itself
// lives in ./authContextValue.js) to satisfy
// react-refresh/only-export-components.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate login (replace with real API call later)
  const login = async (email) => {
    setIsLoading(true);
    try {
      // Simulated delay like a real API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login
      const mockUser = {
        id: 1,
        email,
        firstName: 'Business',
        lastName: 'Owner',
        businessName: 'My Store',
      };
      setUser(mockUser);
      return { success: true };
    } catch {
      return { success: false, message: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate signup
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
      };
      setUser(mockUser);
      return { success: true };
    } catch {
      return { success: false, message: 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout clears the user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}