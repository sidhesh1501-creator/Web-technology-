import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, KEYS } from '../utils/storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => storage.get(KEYS.THEME, 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
