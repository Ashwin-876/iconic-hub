import React, { useEffect, useState } from 'react';
import { useTransition } from './TransitionContext';

export default function PageTransition({ children }) {
  const [visible, setVisible] = useState(false);
  const { isTransitioning } = useTransition();

  useEffect(() => {
    // Small delay to trigger transition after mounting
    const timer = setTimeout(() => setVisible(true), 50);
    
    // Set body background to match page theme to prevent black flashes during transitions
    const isDarkPage = ['/', '/login', '/create-account', '/forgot-password', '/otp-verification'].includes(window.location.pathname) || window.location.pathname.startsWith('/onboarding');
    document.body.style.backgroundColor = isDarkPage ? '#060814' : '#fff8f6';
    
    return () => clearTimeout(timer);
  }, []);

  // 300ms transition time: opacity 1 -> 0 and opacity 0 -> 1 with translateY(12px -> 0)
  let transitionClass = 'opacity-0 translate-y-3'; 
  if (isTransitioning) {
    transitionClass = 'opacity-0';
  } else if (visible) {
    transitionClass = 'opacity-100 translate-y-0';
  }

  return (
    <div className={`transition-all duration-200 ease-in-out transform ${transitionClass}`}>
      {children}
    </div>
  );
}
