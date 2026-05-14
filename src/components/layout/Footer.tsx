import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#05050A] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-t-full mix-blend-screen"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#121626] to-[#0A0D14] flex items-center justify-center font-display font-black tracking-tighter text-sm border border-white/10">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">SS</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">STAR <span className="text-cyan-500">STRICK</span></span>
            </div>
            <p className="text-gray-500 font-sans text-sm max-w-sm leading-relaxed">
              The premier platform for elite competitive FC rankings. Discover, track, and compete with the best players in the world.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-wide">PLATFORM</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-sans">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Global Rankings</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Tournaments</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Player Profiles</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Teams</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-6 tracking-wide">SUPPORT</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-sans">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Rules & Format</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-sans">
            &copy; {new Date().getFullYear()} Star Strick Circuit. All rights reserved.
          </p>
          <div className="flex gap-4">
             {/* Social Links placeholders */}
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer">
                X
             </div>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer">
                IG
             </div>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer">
                YT
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
