import React from 'react';
import { Player } from '../../data/players';
import { Flame, Target, Trophy, Swords, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BroadcastDetailProps {
  player: Player | null;
}

export const BroadcastDetail: React.FC<BroadcastDetailProps> = ({ player }) => {
  if (!player) return null;

  const jerseyNumber = (player.name.length * 7 + player.rank * 3) % 99 + 1;

  const getAIAnalysis = (p: Player) => {
    if (p.streak >= 3) return `${p.name} is on fire with a ${p.streak}-game win streak. Opponents are struggling to break through their defensive structure and counter-attacks.`;
    if (p.streak <= -2) return `${p.name} has hit a rough patch recently. Needs to re-evaluate their mid-field transition to turn things around and regain form.`;
    if (parseFloat(p.winRate) > 80) return `Absolute dominance. ${p.name} maintains an elite ${p.winRate} win rate, executing high-percentage plays consistently in the final third.`;
    if (p.gd > 20) return `Offensive powerhouse. A +${p.gd} goal difference highlights ${p.name}'s lethal finishing inside the box and aggressive high-press.`;
    if (parseFloat(p.winRate) < 50) return `Looking for form. ${p.name} needs to tighten up defensively to improve their ${p.winRate} win rate and climb the ranks.`;
    return `Steady performances from ${p.name}. Currently focusing on consistent point accumulation in the ${p.tier} division to push for promotion.`;
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/5 shadow-2xl flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={player.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col"
        >
          {/* Background Hero Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Ambient Glow */}
            <div className="absolute -top-[20%] -right-[20%] w-[140%] h-[140%] bg-gradient-to-bl from-brand-cyan/10 via-transparent to-transparent rotate-12 blur-[100px]"></div>
            
            {/* Ghost Text Auto-fit container */}
            <div className="absolute top-12 left-0 right-0 flex justify-center opacity-[0.03] overflow-hidden select-none px-4">
              <span className="font-barlow-condensed font-black italic whitespace-nowrap text-[180px] leading-none text-white tracking-tighter">
                {player.name}
              </span>
            </div>

            {/* Abstract Player Silhouette / Jersey representation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-64 h-80 rounded-t-full bg-gradient-to-b from-white/5 to-transparent blur-3xl opacity-50"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full overflow-y-auto scrollbar-hide p-6 lg:p-8 pt-6 pb-12">
            
            {/* Top Info */}
            <div className="flex flex-col items-center text-center space-y-4 shrink-0 mb-8 mt-4">
              <div className="w-24 h-24 border border-white/10 flex flex-col items-center justify-center mb-2 relative bg-brand-cyan text-brand-cyan font-black font-display tracking-tight z-10 shadow-[0_0_30px_rgba(0,255,133,0.1)] transition-all overflow-hidden" 
                   style={{ borderRadius: '0.5rem 0.5rem 1rem 1rem', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
                <div className="absolute inset-0 bg-[#0A0D14] m-[2px]" style={{ borderRadius: '0.4rem 0.4rem 0.9rem 0.9rem' }}></div>
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 z-10 font-barlow-condensed italic text-5xl">
                  {jerseyNumber}
                </span>
                <span className="text-[10px] font-bold text-brand-cyan mt-1 uppercase tracking-widest z-10">
                  {player.team.split(' ').map(w => w[0]).join('').substring(0,3).toUpperCase()}
                </span>
              </div>
              <div className="w-full @container">
                <h2 className="font-barlow font-black italic text-[clamp(2.5rem,10cqi,4rem)] leading-none tracking-tighter uppercase text-white drop-shadow-md break-all">
                  {player.name}
                </h2>
                <p className="text-brand-cyan font-bold tracking-[0.2em] uppercase text-sm mt-3 font-sans">
                  {player.team} <span className="text-white/30 mx-2">|</span> {player.nationality}
                </p>
              </div>
            </div>

            {/* Division Banner */}
            <div className="w-full shrink-0 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Division</span>
                  <span className="font-barlow font-bold italic uppercase tracking-wider text-white text-lg leading-tight">{player.tier}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">World Rank</span>
                <span className="font-barlow-condensed font-black italic text-3xl text-white">{player.rank.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div className="bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col justify-between h-24 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-cyan"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Points</span>
                  <Target className="w-4 h-4 text-brand-cyan opacity-50" />
                </div>
                <span className="font-barlow-condensed font-black text-3xl text-white">{player.points.toLocaleString()}</span>
              </div>

              <div className="bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col justify-between h-24 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Win Rate</span>
                  <Swords className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-barlow-condensed font-black text-3xl text-white">{player.winRate}</span>
              </div>

              <div className="bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col justify-between h-24 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Streak</span>
                  <Flame className={`w-4 h-4 ${player.streak > 2 ? 'text-orange-500' : 'text-gray-500'}`} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-barlow-condensed font-black text-3xl text-white">{Math.abs(player.streak)}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">{player.streak >= 0 ? 'W' : 'L'}</span>
                </div>
              </div>

              <div className="bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col justify-between h-24 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Goal Diff</span>
                </div>
                <span className={`font-barlow-condensed font-black text-3xl ${player.gd > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {player.gd > 0 ? '+' : ''}{player.gd}
                </span>
              </div>
            </div>

            {/* Form Strip */}
            <div className="mt-6 shrink-0">
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-2">Last 5 Matches</span>
               <div className="flex justify-between gap-2">
                 {player.form.map((r, i) => (
                   <div key={i} className={`flex-1 h-8 rounded shrink-0 flex items-center justify-center text-xs font-black font-barlow italic
                     ${r === 'W' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                       r === 'L' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                       'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}
                   >
                     {r}
                   </div>
                 ))}
               </div>
            </div>

            {/* Dynamic AI Analysis Section */}
            <div className="mt-6 shrink-0 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/10 blur-2xl rounded-full -mr-8 -mt-8 pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit className="w-4 h-4 text-brand-cyan" />
                <span className="text-[10px] text-brand-cyan font-bold uppercase tracking-widest">AI Scouting Report</span>
              </div>
              <p className="text-sm font-sans text-gray-300 leading-relaxed">
                {getAIAnalysis(player)}
              </p>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
