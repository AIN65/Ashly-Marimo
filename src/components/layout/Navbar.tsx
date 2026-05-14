import React, { useState, useEffect } from 'react';
import { Search, Menu, User as UserIcon, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
  userData: any;
  onLoginClick: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, userData, onLoginClick, onSignOut }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down, hide
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);  // Scrolling up, show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#121626] to-[#0A0D14] flex items-center justify-center font-display font-black tracking-tighter text-lg border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 group-hover:from-cyan-400 group-hover:to-blue-600 transition-all">SS</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400/20 border-2 border-[#0A0D14] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
            </div>
          </div>
          <span className="hidden sm:block font-display font-bold text-xl tracking-tight text-white group-hover:text-cyan-50 transition-colors">STAR <span className="text-cyan-500">STRICK</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-cyan-500 after:rounded-full">Rankings</a>
          <a href="#" className="hover:text-white transition-colors">Players</a>
          <a href="#" className="hover:text-white transition-colors">Tournaments</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
            Live <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Search className="w-5 h-5" strokeWidth={2} />
        </button>
        
        <div className="w-px h-5 bg-white/10 hidden sm:block"></div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-white font-display">
                {userData?.gamertag || user.email}
              </span>
              <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Player</span>
            </div>
            <button onClick={onSignOut} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all group" title="Sign Out">
               <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="text-[11px] font-black tracking-[0.1em] px-6 py-2.5 rounded-sm text-black bg-[#00FF85] hover:bg-white hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,133,0.5)] hover:shadow-[0_0_30px_rgba(0,255,133,0.8)] border border-[#00FF85] uppercase"
          >
            Join Ranking
          </button>
        )}

        <button className="md:hidden text-gray-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};
