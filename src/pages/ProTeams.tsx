import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, ArrowRight } from 'lucide-react';
import { TEAMS } from '../data/teams';

export function ProTeams() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>

      <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-4 text-white uppercase">
        Partnered Pro Teams
      </h1>
      <p className="text-gray-400 text-lg mb-12 max-w-3xl">
        The apex predator organizations of our circuit. Explore their rosters and legacies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAMS.map((team) => (
          <Link 
            to={`/teams/${team.id}`}
            key={team.id} 
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col group hover:border-white/20 transition-all hover:scale-[1.01]"
          >
            {/* Header Banner */}
            <div className={`p-8 bg-gradient-to-b ${team.color} border-b border-white/5 flex flex-col items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-grid-white opacity-[0.03]"></div>
              
              {/* Logo Placeholder */}
              <div className="w-24 h-24 bg-black/50 border border-white/20 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center shadow-2xl relative z-10 backdrop-blur-xl">
                 <Shield className="w-10 h-10 text-white/50" />
              </div>
              
              <h2 className="text-3xl font-display font-black italic tracking-tighter text-white uppercase mt-6 relative z-10 text-center">{team.name}</h2>
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest mt-1 relative z-10">{team.region}</span>
            </div>

            {/* Roster & Bio */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xs text-brand-cyan font-bold uppercase tracking-widest mb-3">Current Roster</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {team.roster.map(player => (
                  <span key={player} className="bg-[#111] border border-white/10 px-3 py-1 rounded-md text-sm font-bold text-gray-300">
                    {player}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                   <h3 className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-2">Win Rate</h3>
                   <span className="text-xl font-bold text-white tracking-tight">{team.stats.winRate}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
