import React from 'react';
import { Player } from '../../data/players';
import { ChevronUp, ChevronDown, Minus, ShieldHalf } from 'lucide-react';

interface BroadcastRowProps {
  player: Player;
  isActive: boolean;
  onClick: () => void;
  isBiggestMover: boolean;
}

export const BroadcastRow: React.FC<BroadcastRowProps> = ({ player, isActive, onClick, isBiggestMover }) => {
  const getPodiumColor = (rank: number) => {
    if (rank === 1) return 'text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]'; // Gold
    if (rank === 2) return 'text-[#C0C0C0] drop-shadow-[0_0_10px_rgba(192,192,192,0.5)]'; // Silver
    if (rank === 3) return 'text-[#CD7F32] drop-shadow-[0_0_10px_rgba(205,127,50,0.5)]'; // Bronze
    return 'text-white/10';
  };

  const getJerseyColor = (index: number) => {
    const colors = ['bg-blue-600', 'bg-red-600', 'bg-purple-600', 'bg-emerald-600', 'bg-orange-600', 'bg-cyan-600'];
    return colors[index % colors.length];
  };

  // Generate a random-looking but deterministic number for the jersey based on the name length + rank
  const jerseyNumber = (player.name.length * 7 + player.rank * 3) % 99 + 1;
  const clubShort = player.team.split(' ').map(w => w[0]).join('').substring(0,3).toUpperCase();

  return (
    <div 
      onClick={onClick}
      className={`relative w-full rounded-xl overflow-hidden cursor-pointer flex items-stretch select-none transition-all duration-500 ease-out border border-white/5
        ${isActive 
          ? 'bg-[#0A0A0A] scale-[1.02] md:scale-[1.05] z-20 shadow-[0_0_25px_2px_rgba(0,255,133,0.3)] border-l-4 border-l-brand-cyan' 
          : 'bg-[#1A1A1A] hover:bg-[#222222] z-10 hover:border-l-4 hover:border-l-brand-cyan/50 hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-transparent'}
      `}
    >
      {/* Ghost Number */}
      <div className={`absolute -right-4 -top-8 text-[120px] font-barlow-condensed font-black italic select-none pointer-events-none opacity-20 ${getPodiumColor(player.rank)}`}>
        {player.rank.toString().padStart(2, '0')}
      </div>

      <div className="flex-1 flex items-center p-4 py-5 gap-4 relative z-10">
        
        {/* Rank & Change */}
        <div className="flex flex-col items-center justify-center w-8 shrink-0">
          <span className="font-barlow-condensed font-bold text-2xl tracking-tighter text-white">{player.rank.toString().padStart(2, '0')}</span>
          <div className="flex items-center text-[11px] font-black mt-1">
            {player.change > 0 && <ChevronUp className="w-3.5 h-3.5 text-brand-cyan mb-[1px]" strokeWidth={4} />}
            {player.change < 0 && <ChevronDown className="w-3.5 h-3.5 text-rose-500 mb-[1px]" strokeWidth={4} />}
            {player.change === 0 && <Minus className="w-3 h-3 text-gray-500" strokeWidth={4} />}
          </div>
        </div>

        {/* Jersey Avatar */}
        <div className={`shrink-0 w-12 h-14 rounded-b-xl rounded-t-sm flex flex-col items-center justify-center ${getJerseyColor(player.rank)} border-b-2 border-white/20 shadow-inner relative overflow-hidden`}>
           {isActive && (
             <div className="absolute inset-0 border-2 border-brand-cyan rounded-b-xl rounded-t-sm shadow-[0_0_10px_rgba(0,255,133,0.8)]"></div>
           )}
           <span className="font-barlow-condensed font-black italic text-xl leading-none text-white drop-shadow-md">{jerseyNumber}</span>
           <span className="text-[8px] font-bold text-white/80 mt-1 uppercase tracking-widest">{clubShort}</span>
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0 pr-4 flex flex-col justify-center pb-1">
          <div className="flex items-end gap-3 truncate">
            <h3 className="font-barlow font-black italic text-2xl tracking-tight text-white uppercase truncate drop-shadow-sm">{player.name}</h3>
            {isBiggestMover && (
              <div className="mb-1.5 px-1.5 py-0.5 bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-0.5">
                <ChevronUp className="w-3 h-3" strokeWidth={3} /> {Math.abs(player.change)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-400 font-sans text-xs mt-0.5 uppercase tracking-wider font-semibold">
            <span className="flex items-center gap-1.5 text-white/50"><ShieldHalf className="w-3.5 h-3.5" /> {player.team}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="text-white/50">{player.nationality}</span>
          </div>
        </div>

        {/* Desktop Data Points (Hidden on sm) */}
        <div className="hidden sm:flex items-center gap-8 pr-12">
          <div className="flex flex-col items-end justify-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-0.5">PTS</span>
            <span className="font-barlow-condensed font-black text-2xl text-white leading-none">{player.points.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-end justify-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-0.5">W/R</span>
            <span className="font-barlow-condensed font-bold text-xl text-white/90 leading-none">{player.winRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
