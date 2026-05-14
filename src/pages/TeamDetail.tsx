import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Shield, Trophy, Activity, Users, Globe } from 'lucide-react';
import { TEAMS } from '../data/teams';
import { motion } from 'motion/react';

export function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = TEAMS.find(t => t.id === teamId);

  if (!team) {
    return (
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-2xl text-white">Team not found</h1>
        <Link to="/teams" className="text-cyan-400 mt-4 inline-block italic font-bold">Back to Teams</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/teams" className="inline-flex items-center text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Teams
        </Link>

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br ${team.color} p-8 md:p-16 mb-12`}
        >
          <div className="absolute inset-0 bg-grid-white opacity-[0.02]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative">
              <Shield className="w-16 h-16 md:w-24 md:h-24 text-white/50" />
            </div>
            
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h1 className="text-5xl md:text-7xl font-display font-black italic tracking-tighter text-white uppercase">{team.name}</h1>
                <span className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white/80 uppercase tracking-widest border border-white/10">
                  {team.region}
                </span>
              </div>
              <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed italic">
                "{team.history.split('.')[0]}."
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Roster Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-cyan-400" />
                <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase">Active Roster</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.roster.map((player, i) => (
                  <div key={player} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                        <span className="text-xs font-black text-white/20">{['TOP', 'JNG', 'MID', 'ADC', 'SUP'][i]}</span>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white uppercase tracking-tight">{player}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Starting Lineup</div>
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-gray-600 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>

            {/* History Detail */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-purple-400" />
                <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase">Organizational History</h2>
              </div>
              <div className="bg-white/5 border border-white/5 p-8 rounded-3xl prose prose-invert max-w-none">
                <p className="text-gray-400 leading-loose text-lg">
                  {team.history}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar Stats & Achievements */}
          <div className="space-y-8">
            <section className="bg-white/5 border border-white/5 p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-display font-black uppercase text-white">Major Honors</h2>
              </div>
              <div className="space-y-4">
                {team.achievements.map((honor, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                    <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <span className="font-bold text-sm text-gray-300">{honor}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white/5 border border-white/5 p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-display font-black uppercase text-white">Season Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Win Rate</div>
                  <div className="text-2xl font-black text-emerald-400">{team.stats.winRate}</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total Prizing</div>
                  <div className="text-2xl font-black text-white">{team.stats.totalPrize}</div>
                </div>
                <div className="col-span-2 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Lifetime Matches</div>
                  <div className="text-2xl font-black text-white">{team.stats.matchesPlayed.toLocaleString()}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
