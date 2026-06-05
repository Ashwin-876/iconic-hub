import React, { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickedTab, setClickedTab] = useState(null);

  const startTransition = (callback, path) => {
    setClickedTab(path);
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      // Snappy mount recovery
      setTimeout(() => {
        setIsTransitioning(false);
        setClickedTab(null);
      }, 30);
    }, 150); // 150ms fade-out duration
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, clickedTab, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
