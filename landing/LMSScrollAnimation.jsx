import React, { useRef, useState, useEffect } from 'react';

export default function LMSScrollAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const requestRef = useRef(null);
  const touchStartY = useRef(0);
  const isTransitioningRef = useRef(false);

  // Preload all 60 frames
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 60;
    const tempImages = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/LMS ANIMATION/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      tempImages.push(img);
    }
    imagesRef.current = tempImages;
  }, []);

  // requestAnimationFrame loop for smooth momentum and slow cinematic transitions (60fps)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateAnimation = () => {
      // Lerp transition logic: slowed down to 0.03 for a more cinematic gliding momentum
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.03;
      } else {
        currentProgress.current = targetProgress.current;
      }

      const frameIndex = Math.min(59, Math.max(0, Math.floor(currentProgress.current * 60)));
      const img = imagesRef.current[frameIndex];

      if (img && (img.complete || img.naturalWidth !== 0)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aspect ratio cover algorithm
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(requestRef.current);
  }, [imagesLoaded]);

  // Monitor scroll locking and progress updates
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const lockScroll = (absoluteTop) => {
      setIsLocked(true);
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, absoluteTop);
    };

    const unlockScroll = (scrollToY) => {
      setIsLocked(false);
      document.body.style.overflow = '';
      isTransitioningRef.current = true;

      window.scrollTo({
        top: scrollToY,
        behavior: 'smooth'
      });

      // Temporary cool-off to prevent immediate re-locking
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 1000);
    };

    const handleWheel = (e) => {
      if (isTransitioningRef.current) return;

      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;

      if (isLocked) {
        if (e.cancelable) e.preventDefault();

        // Increment target progress based on scroll delta (slowed down from 0.0012 to 0.0003 for 4x slower feel)
        const delta = e.deltaY * 0.0003; 
        const next = Math.min(1, Math.max(0, targetProgress.current + delta));
        targetProgress.current = next;

        // Unlock only when boundaries are hit and user scrolls further in that direction
        if (next === 0 && e.deltaY < 0) {
          unlockScroll(absoluteTop - window.innerHeight);
        } else if (next === 1 && e.deltaY > 0) {
          unlockScroll(absoluteTop + rect.height);
        }
      } else {
        // Trigger lock when section reaches viewport top
        if (rect.top <= 10 && rect.bottom >= window.innerHeight - 10) {
          if (targetProgress.current === 0 && e.deltaY > 0) {
            if (e.cancelable) e.preventDefault();
            lockScroll(absoluteTop);
            targetProgress.current = 0.005;
          } else if (targetProgress.current === 1 && e.deltaY < 0) {
            if (e.cancelable) e.preventDefault();
            lockScroll(absoluteTop);
            targetProgress.current = 0.995;
          }
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isTransitioningRef.current) return;

      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const touchY = e.touches[0].clientY;
      const touchDeltaY = touchStartY.current - touchY;

      if (isLocked) {
        if (e.cancelable) e.preventDefault();

        // touch move sensitivity (slowed down from 0.0025 to 0.0006)
        const delta = touchDeltaY * 0.0006;
        const next = Math.min(1, Math.max(0, targetProgress.current + delta));
        targetProgress.current = next;

        if (next === 0 && touchDeltaY < 0) {
          unlockScroll(absoluteTop - window.innerHeight);
        } else if (next === 1 && touchDeltaY > 0) {
          unlockScroll(absoluteTop + rect.height);
        }
      } else {
        if (rect.top <= 10 && rect.bottom >= window.innerHeight - 10) {
          if (targetProgress.current === 0 && touchDeltaY > 0) {
            if (e.cancelable) e.preventDefault();
            lockScroll(absoluteTop);
            targetProgress.current = 0.005;
          } else if (targetProgress.current === 1 && touchDeltaY < 0) {
            if (e.cancelable) e.preventDefault();
            lockScroll(absoluteTop);
            targetProgress.current = 0.995;
          }
        }
      }
      touchStartY.current = touchY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
    };
  }, [isLocked]);

  // Resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-slate-950"
    >
      <div 
        className={`${
          isLocked ? 'fixed inset-0 z-50' : 'absolute inset-0'
        } w-full h-full overflow-hidden flex items-center justify-center`}
      >
        {/* Cinematic Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" 
        />
        
        {/* Subtle Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Ambient background glowing blobs */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />
      </div>
    </div>
  );
}
