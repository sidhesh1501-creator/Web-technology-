import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, KEYS } from '../utils/storage';

const ProgressContext = createContext(null);

const DEFAULT_PROGRESS = {
  'xml-structure': { completed: 0, total: 7, percentage: 0 },
  'xpath': { completed: 0, total: 6, percentage: 0 },
  'xslt': { completed: 0, total: 7, percentage: 0 },
  'data-interpretation': { completed: 0, total: 4, percentage: 0 },
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() =>
    storage.get(KEYS.PROGRESS, DEFAULT_PROGRESS)
  );
  const [results, setResults] = useState(() =>
    storage.get(KEYS.RESULTS, null)
  );

  useEffect(() => { storage.set(KEYS.PROGRESS, progress); }, [progress]);
  useEffect(() => { storage.set(KEYS.RESULTS, results); }, [results]);

  const markComplete = (module, step) => {
    setProgress(prev => {
      const mod = prev[module];
      if (!mod) return prev;
      const completed = Math.min(mod.completed + 1, mod.total);
      return {
        ...prev,
        [module]: { ...mod, completed, percentage: Math.round((completed / mod.total) * 100) }
      };
    });
  };

  const saveResults = (r) => setResults(r);
  const resetProgress = () => { setProgress(DEFAULT_PROGRESS); setResults(null); };

  return (
    <ProgressContext.Provider value={{ progress, markComplete, results, saveResults, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
