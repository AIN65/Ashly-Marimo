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
    let analysis = "";
    
    // Streaks
    if (p.streak >= 3) analysis += `${p.name} is on fire with a ${p.streak}-game win streak. `;
    else if (p.streak <= -2) analysis += `${p.name} has hit a rough patch recently. `;
    else analysis += `Steady recent performances. `;

    // Stats
    if (p.offense > 85 && p.defense < 75) analysis += `A brilliant offensive threat (${p.offense} rating), but their defense (${p.defense}) leaves them vulnerable to counter-attacks. `;
    else if (p.defense > 85 && p.offense < 75) analysis += `A defensive brick wall (${p.defense} rating). They absorb pressure exceptionally well but struggle to convert chances. `;
    else if (p.offense >= 85 && p.defense >= 85) analysis += `An elite, well-rounded tactical approach with exceptional dual-phase metrics (${p.offense} Off, ${p.defense} Def). `;
    else analysis += `A balanced but developing setup. `;

    // Possession
    if (p.possession > 55) analysis += `They dominate the ball with ${p.possession}% possession, dictating the tempo aggressively. `;
    else if (p.possession < 45) analysis += `They prefer a low-block, transitional game, only holding ${p.possession}% possession but remaining lethal on the break. `;

    // Division Context
    analysis += `Looking to make a statement in the ${p.tier} division.`;
    
    return analysis;
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-[2rem] bg-white/10 backdrop-blur-[40px] border border-white/20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.3),0_30px_80px_rgba(0,0,0,0.8)] flex flex-col items-stretch before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/50 before:rounded-[2rem] before:pointer-events-none">
      <AnimatePresence>
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
            <div className="w-full shrink-0 bg-white/10 border border-white/20 rounded-[1.5rem] p-5 flex items-center justify-between backdrop-blur-[40px] mb-6 shadow-[inset_0_2px_5px_rgba(255,255,255,0.3),0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
              <div className="flex items-center gap-4 relative z-10">
                <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider drop-shadow-sm">Division</span>
                  <span className="font-barlow font-black italic uppercase tracking-widest text-white text-xl leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-0.5">{player.tier}</span>
                </div>
              </div>
              <div className="text-right relative z-10 bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                <span className="text-[10px] text-brand-cyan font-bold uppercase tracking-widest block drop-shadow-sm">World Rank</span>
                <span className="font-barlow-condensed font-black italic text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] -mt-1 block">{player.rank.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div className="bg-white/10 backdrop-blur-[30px] border border-white/20 shadow-[inset_0_2px_5px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.4)] rounded-2xl p-4 flex flex-col justify-between h-24 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-cyan shadow-[0_0_10px_rgba(0,255,133,0.8)]"></div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest drop-shadow-sm">Points</span>
                  <Target className="w-4 h-4 text-brand-cyan drop-shadow-sm" />
                </div>
                <span className="font-barlow-condensed font-black text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10">{player.points.toLocaleString()}</span>
              </div>

              <div className="bg-white/10 backdrop-blur-[30px] border border-white/20 shadow-[inset_0_2px_5px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.4)] rounded-2xl p-4 flex flex-col justify-between h-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none mix-blend-overlay"></div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest drop-shadow-sm">Win Rate</span>
                  <Swords className="w-4 h-4 text-white/50" />
                </div>
                <span className="font-barlow-condensed font-black text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10">{player.winRate}</span>
              </div>

              <div className="bg-white/10 backdrop-blur-[30px] border border-white/20 shadow-[inset_0_2px_5px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.4)] rounded-2xl p-4 flex flex-col justify-between h-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none mix-blend-overlay"></div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest drop-shadow-sm">Streak</span>
                  <Flame className={`w-4 h-4 ${player.streak > 2 ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,1)]' : 'text-white/50'}`} />
                </div>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="font-barlow-condensed font-black text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{Math.abs(player.streak)}</span>
                  <span className="text-xs font-bold text-white/70 uppercase drop-shadow-sm">{player.streak >= 0 ? 'W' : 'L'}</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-[30px] border border-white/20 shadow-[inset_0_2px_5px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.4)] rounded-2xl p-4 flex flex-col justify-between h-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none mix-blend-overlay"></div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest drop-shadow-sm">Goal Diff</span>
                </div>
                <span className={`font-barlow-condensed font-black text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10 ${player.gd > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
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

            {/* Player Attributes */}
            <div className="mt-6 shrink-0">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-3">Technical Ratings</span>
              
              <div className="space-y-4">
                {/* Offense */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="text-white">Offense</span>
                    <span className="text-brand-cyan">{player.offense}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${player.offense}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-brand-cyan/40 to-brand-cyan shadow-[0_0_10px_rgba(0,255,133,0.5)]" 
                    />
                  </div>
                </div>

                {/* Defense */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="text-white">Defense</span>
                    <span className="text-brand-cyan">{player.defense}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${player.defense}%` }}
                      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-brand-cyan/40 to-brand-cyan shadow-[0_0_10px_rgba(0,255,133,0.5)]" 
                    />
                  </div>
                </div>

                {/* Possession */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="text-white">Avg Possession</span>
                    <span className="text-brand-cyan">{player.possession}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${player.possession}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-brand-cyan/40 to-brand-cyan shadow-[0_0_10px_rgba(0,255,133,0.5)]" 
                    />
                  </div>
                </div>
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
