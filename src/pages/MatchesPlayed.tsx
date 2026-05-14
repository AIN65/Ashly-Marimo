import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Play, Activity } from 'lucide-react';

export function MatchesPlayed() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl border border-emerald-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <Activity className="w-10 h-10 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-2 text-white uppercase">
            5,241 Matches Played
          </h1>
          <p className="text-gray-400 text-lg">Season 4 global statistics, recent results, and highlight VODs.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Results */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-black italic tracking-tighter text-emerald-400 uppercase">Recent Global Matches</h2>
          
          <div className="space-y-4">
            {[
               { id: 1, team1: 'T1', s1: 3, team2: 'JDG', s2: 1, time: '2 hours ago', vod: true },
               { id: 2, team1: 'Gen.G', s1: 3, team2: 'BLG', s2: 2, time: '5 hours ago', vod: true },
               { id: 3, team1: 'G2', s1: 0, team2: 'TL', s2: 3, time: '12 hours ago', vod: false },
               { id: 4, team1: 'C9', s1: 1, team2: 'FNC', s2: 3, time: '1 day ago', vod: false },
            ].map(match => (
              <div key={match.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                   <div className={`font-barlow font-black text-2xl uppercase ${match.s1 > match.s2 ? 'text-white' : 'text-gray-500'}`}>{match.team1}</div>
                   <div className="flex items-center gap-3">
                     <span className={`font-barlow-condensed font-black text-3xl ${match.s1 > match.s2 ? 'text-emerald-400' : 'text-gray-500'}`}>{match.s1}</span>
                     <span className="text-gray-600 font-bold">-</span>
                     <span className={`font-barlow-condensed font-black text-3xl ${match.s2 > match.s1 ? 'text-emerald-400' : 'text-gray-500'}`}>{match.s2}</span>
                   </div>
                   <div className={`font-barlow font-black text-2xl uppercase ${match.s2 > match.s1 ? 'text-white' : 'text-gray-500'}`}>{match.team2}</div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                   <span className="text-xs text-gray-500 font-bold uppercase">{match.time}</span>
                   {match.vod && (
                     <button className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/50 flex items-center gap-1.5 text-xs font-bold uppercase hover:bg-emerald-500/30">
                       <Play className="w-3 h-3" /> VOD
                     </button>
                   )}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-display font-black italic tracking-tighter text-white uppercase pt-8">Highlight VODs</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="aspect-video bg-black/50 border border-white/10 rounded-xl relative group overflow-hidden cursor-pointer">
                 <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/80 backdrop-blur flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                 </div>
                 <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent">
                   <span className="text-white font-bold text-sm">Top Plays of Week {i * 2}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="space-y-6">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display font-black tracking-tight text-white uppercase mb-6">Global Meta Stats</h2>
            
            <div className="space-y-6">
               <div>
                 <div className="flex justify-between text-xs font-bold uppercase text-gray-400 mb-2">
                   <span>Most Picked Map</span>
                   <span className="text-cyan-400">Final Destination</span>
                 </div>
                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400 w-[65%]"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs font-bold uppercase text-gray-400 mb-2">
                   <span>Highest Winrate Hero</span>
                   <span className="text-purple-400">Jinx (58.4%)</span>
                 </div>
                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-400 w-[58%]"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs font-bold uppercase text-gray-400 mb-2">
                   <span>Average Match Length</span>
                   <span className="text-yellow-400">32m 14s</span>
                 </div>
                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-yellow-400 w-[45%]"></div>
                 </div>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
