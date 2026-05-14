import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search, ArrowUp, ArrowDown, Minus, User } from 'lucide-react';
import { PLAYERS } from '../data/players';
import { motion, AnimatePresence } from 'motion/react';

export function FullRankings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const filteredPlayers = PLAYERS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.team.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.points - a.points);

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-3 h-3 text-[#00FF85] fill-[#00FF85]" />;
    if (change < 0) return <ArrowDown className="w-3 h-3 text-[#FF003C] fill-[#FF003C]" />;
    return <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-bold">0</div>;
  };

  return (
    <div className="pt-20 pb-16 bg-[#050505] min-h-screen text-white font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
            Leaderboard
          </h1>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text"
              placeholder="Search for a player"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-white/5 rounded-full py-3 pl-12 pr-6 text-sm outline-none focus:border-white/20 transition-all placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-[60px_1fr_100px_80px] px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 bg-[#080808]">
            <div>Rank</div>
            <div>Player</div>
            <div className="text-right">Points</div>
            <div className="text-right">Change</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {filteredPlayers.map((player) => (
              <React.Fragment key={player.id}>
                <div 
                  onClick={() => setSelectedPlayerId(selectedPlayerId === player.id ? null : player.id)}
                  className={`grid grid-cols-[60px_1fr_100px_80px] px-6 py-6 items-center border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors ${selectedPlayerId === player.id ? 'bg-white/[0.03]' : ''}`}
                >
                  <div className="text-xl font-bold">{player.rank}</div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="font-bold text-lg tracking-tight uppercase">{player.name}</span>
                      <span className="bg-brand-cyan/20 text-brand-cyan text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border border-brand-cyan/30">
                        Alpha 2
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-bold">{player.points.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-600 font-bold ml-1 uppercase">pts</span>
                  </div>

                  <div className="flex justify-end pr-2">
                    {getChangeIcon(player.change)}
                  </div>
                </div>

                {/* Expanded Detail Panel */}
                <AnimatePresence>
                  {selectedPlayerId === player.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#080808] border-b border-white/5"
                    >
                      <div className="p-8 grid md:grid-cols-3 gap-8">
                        <div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Performance</div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                              <span className="text-sm font-bold text-gray-400">Win Rate</span>
                              <span className="text-xl font-bold text-emerald-400">{player.winRate}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                              <span className="text-sm font-bold text-gray-400">Team</span>
                              <span className="text-sm font-bold">{player.team}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                              <span className="text-sm font-bold text-gray-400">Nationality</span>
                              <span className="text-sm font-bold">{player.nationality}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Stats</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Offense</div>
                              <div className="text-2xl font-bold">{player.offense}</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Defense</div>
                              <div className="text-2xl font-bold">{player.defense}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center">
                           <button className="w-full bg-white text-black font-black uppercase text-xs py-4 rounded-lg tracking-widest hover:bg-gray-200 transition-colors">
                             View Full Profile
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

