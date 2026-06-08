import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../App'), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#060814] flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return <App />;
}
