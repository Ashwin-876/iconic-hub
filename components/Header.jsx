import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Terminal, Search, Bell, User, RefreshCw } from 'lucide-react';
import { useTransition } from './TransitionContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { startTransition } = useTransition();
  const [pillStyle, setPillStyle] = React.useState({ left: 0, width: 0, opacity: 0 });
  const itemsRef = React.useRef([]);

  const handleReset = () => {
    localStorage.clear();
    navigate('/onboarding/welcome');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Courses', path: '/courses' },
    { label: 'Learning Paths', path: '/learning-paths' },
    { label: 'Community', path: '/community' },
    { label: 'Events', path: '/events' },
    { label: 'Developer Hub', path: '/developer-hub' },
    { label: 'AI Tutor', path: '/ai-tutor' }
  ];

  const isLinkActive = (path) => {
    if (path === '#') return false;
    if (path === '/courses') {
      return pathname.startsWith('/courses');
    }
    return pathname === path;
  };

  const handleNavClick = (e, path, index) => {
    if (path === '#' || pathname === path) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    // Slide pill to clicked item instantly for fast visual feedback
    if (itemsRef.current[index]) {
      const el = itemsRef.current[index];
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }

    startTransition(() => {
      navigate(path);
    }, path);
  };

  React.useEffect(() => {
    const activeIndex = navItems.findIndex(item => isLinkActive(item.path));
    if (activeIndex !== -1 && itemsRef.current[activeIndex]) {
      const el = itemsRef.current[activeIndex];
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [pathname]);

  return (
    <header className="w-full bg-white/60 backdrop-blur-xl border-b border-white/50 px-6 h-20 flex items-center justify-between sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2 shrink-0">
          <img src="/iconic_logo.png" alt="IconicHub" className="h-9 w-auto object-contain" />
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold shrink-0 relative py-2">
          {/* Sliding Pill Background */}
          <div 
            className="absolute top-2 bottom-2 bg-gradient-to-tr from-[#2563EB]/10 to-blue-500/10 border border-[#2563EB]/20 rounded-full transition-all duration-200 ease-out pointer-events-none shadow-[0_2px_12px_rgba(37,99,235,0.03)]"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
            }}
          />

          {navItems.map((item, index) => {
            const active = isLinkActive(item.path);

            return item.path === '#' ? (
              <a 
                key={index} 
                ref={el => itemsRef.current[index] = el}
                href="#" 
                className="px-3.5 py-2 text-slate-600 hover:text-[#2563EB] hover:bg-blue-500/[0.03] rounded-full transition-all duration-200"
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={index} 
                ref={el => itemsRef.current[index] = el}
                to={item.path} 
                className={`px-3.5 py-2 rounded-full relative z-10 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-blue-500/[0.02] hover:shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${
                  active ? 'text-[#2563EB]' : 'text-slate-600 hover:text-[#2563EB]'
                }`}
                onClick={(e) => handleNavClick(e, item.path, index)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Notifications */}
          <button className="p-2.5 bg-slate-50 border border-surface-stroke hover:bg-slate-100 rounded-xl transition-all duration-200 relative text-slate-500 hover:text-[#2563EB]">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#2563EB] rounded-full animate-ping-subtle"></span>
          </button>

          {/* Reset Path & Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-surface-stroke">
            <Link 
              to="/profile" 
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                pathname === '/profile' 
                  ? 'bg-[#2563EB]/20 border-[#2563EB] text-[#2563EB]' 
                  : 'bg-[#2563EB]/10 border-[#2563EB]/20 text-[#2563EB] hover:bg-[#2563EB]/20'
              }`}
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
