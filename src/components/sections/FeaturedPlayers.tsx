import React from 'react';
import { ArrowRight, Trophy, Flame } from 'lucide-react';
import { Player } from '../../data/players';

const FeaturedCard = ({ player }: { player: Player }) => {
  return (
    <div className="min-w-[300px] w-[300px] snap-center shrink-0 group relative cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] blur-xl pointer-events-none"></div>
      
      <div className="bg-[#0A0D14] border border-white/5 h-full w-full rounded-[32px] px-6 py-8 flex flex-col items-center relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[50px] pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-500"></div>

        {/* FC Badge */}
        <div className="absolute -top-1 -right-1 w-12 h-12 bg-gradient-to-bl from-yellow-500 to-amber-600 rounded-bl-full rounded-tr-[31px]">
          <Trophy className="absolute top-3 right-3 w-4 h-4 text-[#0A0D14]" strokeWidth={2.5} />
        </div>
        
        {/* Profile Avatar */}
        <div className="w-24 h-24 border border-yellow-500/30 flex flex-col items-center justify-center mb-5 relative bg-yellow-500 text-yellow-500 text-3xl font-black font-display tracking-tight z-10 shadow-[0_0_30px_rgba(234,179,8,0.15)] group-hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all overflow-hidden" 
             style={{ borderRadius: '0.5rem 0.5rem 1rem 1rem', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
          <div className="absolute inset-0 bg-[#0A0D14] m-[2px]" style={{ borderRadius: '0.4rem 0.4rem 0.9rem 0.9rem' }}></div>
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-200 to-yellow-600 z-10 font-barlow-condensed italic text-4xl">
            {(player.name.length * 7 + player.rank * 3) % 99 + 1}
          </span>
          <span className="text-[10px] font-bold text-yellow-500 mt-1 uppercase tracking-widest z-10">
            {player.team.split(' ').map(w => w[0]).join('').substring(0,3).toUpperCase()}
          </span>
          <div className="absolute -inset-1.5 rounded-full border border-yellow-500/20 mix-blend-screen rotate-45 group-hover:rotate-90 transition-transform duration-700 pointer-events-none"></div>
          <div className="absolute -inset-1.5 rounded-full border border-yellow-500/20 mix-blend-screen -rotate-45 group-hover:-rotate-90 transition-transform duration-700 pointer-events-none"></div>
        </div>
        
        <h3 className="text-2xl font-bold font-display tracking-tight mb-1 text-white">{player.name}</h3>
        <p className="text-gray-400 font-sans text-sm mb-5">{player.team}</p>
        
        <div className="px-4 py-1.5 mb-8 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-widest uppercase font-sans">
          Top Seed
        </div>

        <div className="w-full space-y-4 px-1 font-sans">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Global Points</span>
            <span className="text-cyan-400 font-bold tracking-wide text-base">{player.points.toLocaleString()}</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> W/R
            </span>
            <span className="text-white font-bold">{player.winRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedPlayers = ({ players }: { players: Player[] }) => {
  const topPlayers = players.slice(0, 4); // Show top 4
  
  return (
    <section className="mb-32 max-w-[1400px] mx-auto px-6 w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1.5 h-8 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
        <div>
          <div className="text-xs text-cyan-400 font-bold uppercase tracking-[0.2em] mb-1 font-sans">Hall of Fame</div>
          <h2 className="text-3xl font-display font-black tracking-tight text-white">FEATURED ATHLETES</h2>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide items-stretch pt-4 -mx-6 px-6 relative z-10 w-full justify-start xl:justify-center">
        {topPlayers.map((p, i) => (
          <FeaturedCard key={i} player={p} />
        ))}
        {/* Ghost card for scroll hint on mobile */}
        <div className="min-w-[40px] w-[40px] snap-center shrink-0 xl:hidden"></div>
      </div>
    </section>
  );
};
