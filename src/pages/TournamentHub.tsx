import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, FileText, ExternalLink } from 'lucide-react';

export function TournamentHub() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
      <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>

      <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-4 text-white uppercase">
        Tournament Hub
      </h1>
      <p className="text-gray-400 mb-12 max-w-2xl text-lg">
        The central dashboard for the Season 4 World Circuit. Stay up to date with standings, matches, and official rules.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content: Bracket */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            <h2 className="text-2xl font-display font-black italic tracking-tighter text-white uppercase mb-6">Current Bracket Setup</h2>
            <div className="flex justify-between items-stretch gap-4 overflow-x-auto pb-4">
               {/* Extremely Simplified Bracket visualization */}
               <div className="flex flex-col justify-around gap-4 min-w-[150px]">
                  <div className="bg-[#111] p-3 rounded border border-white/10 text-sm font-bold text-center">Faker vs Chovy</div>
                  <div className="bg-[#111] p-3 rounded border border-white/10 text-sm font-bold text-center">Ruler vs Viper</div>
                  <div className="bg-[#111] p-3 rounded border border-white/10 text-sm font-bold text-center">ShowMaker vs Bdd</div>
                  <div className="bg-[#111] p-3 rounded border border-white/10 text-sm font-bold text-center">Canyon vs Peanut</div>
               </div>
               <div className="flex flex-col justify-around gap-4 min-w-[20px] items-center text-gray-500 font-bold">
                 <span>→</span>
                 <span>→</span>
               </div>
               <div className="flex flex-col justify-around gap-12 min-w-[150px]">
                  <div className="bg-[#111] p-3 rounded border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)] text-sm font-bold text-center">Zeka vs Knight</div>
                  <div className="bg-[#111] p-3 rounded border border-white/10 text-sm font-bold text-center">Bin vs Zeus</div>
               </div>
               <div className="flex flex-col justify-around gap-4 min-w-[20px] items-center text-gray-500 font-bold">
                 <span>→</span>
               </div>
               <div className="flex flex-col justify-around gap-4 min-w-[150px]">
                  <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-4 rounded border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)] text-sm font-bold text-center text-yellow-100">Grand Final TBD</div>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-display font-black tracking-tight text-white uppercase">Upcoming Matches</h2>
            </div>
            <div className="space-y-4">
              {[
                { date: 'Oct 15, 18:00 UTC', match: 'Faker vs Chovy', stage: 'Quarterfinals' },
                { date: 'Oct 16, 20:00 UTC', match: 'Ruler vs Viper', stage: 'Quarterfinals' },
                { date: 'Oct 20, 15:00 UTC', match: 'TBD vs TBD', stage: 'Semifinals' },
              ].map((m, i) => (
                <div key={i} className="flex flex-col pb-4 border-b border-white/10 last:border-0 last:pb-0">
                   <span className="text-xs text-brand-cyan font-bold mb-1">{m.date}</span>
                   <span className="font-barlow font-bold italic text-white text-lg">{m.match}</span>
                   <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">{m.stage}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-display font-black tracking-tight text-white uppercase">Rules & Regs</h2>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-purple-400 font-bold">•</span> All matches are Bo5 (Best of 5).
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-purple-400 font-bold">•</span> Standard global competitive ruleset applies.
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-purple-400 font-bold">•</span> 5 min delay on all broadcasts.
              </li>
            </ul>
            <button className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
              Registration Portal <ExternalLink className="w-4 h-4" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
