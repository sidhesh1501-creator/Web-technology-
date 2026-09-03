import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, KEYS } from '../utils/storage';

const AuthContext = createContext(null);

// Demo user for offline/no-Firebase mode
const DEMO_USER = {
  uid: 'demo-user-001',
  displayName: 'Student Demo',
  email: 'student@webtech.edu',
  photoURL: null,
  isDemo: true
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously logged in (demo mode)
    const savedUser = storage.get(KEYS.USER);
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const loginDemo = () => {
    storage.set(KEYS.USER, DEMO_USER);
    setUser(DEMO_USER);
  };

  const loginWithEmail = (email, name) => {
    const u = { ...DEMO_USER, email, displayName: name || email, isDemo: false };
    storage.set(KEYS.USER, u);
    setUser(u);
  };

  const logout = () => {
    storage.remove(KEYS.USER);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginDemo, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
