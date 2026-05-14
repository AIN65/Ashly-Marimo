import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trophy, Medal, Star } from 'lucide-react';

export function PrizePool() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto min-h-screen">
      <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 uppercase drop-shadow-lg">
          $50,000
        </h1>
        <h2 className="text-2xl md:text-3xl font-display font-black italic tracking-tighter text-white uppercase">
          Championship Prize Pool
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Breakdown */}
        <div className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex items-center justify-between shadow-[0_0_30px_rgba(234,179,8,0.1)]">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-yellow-500/20 flex items-center justify-center rounded-xl border border-yellow-500/50">
                 <Trophy className="w-6 h-6 text-yellow-500" />
               </div>
               <div>
                 <div className="text-xs text-yellow-500/70 font-bold uppercase tracking-widest">1st Place</div>
                 <div className="font-barlow font-black text-2xl text-white uppercase">Champion</div>
               </div>
             </div>
             <div className="font-barlow-condensed font-black text-4xl text-yellow-400">$25,000</div>
          </div>

          <div className="bg-zinc-500/10 border border-zinc-500/30 rounded-2xl p-6 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-zinc-500/20 flex items-center justify-center rounded-xl border border-zinc-500/50">
                 <Medal className="w-5 h-5 text-zinc-300" />
               </div>
               <div>
                 <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">2nd Place</div>
                 <div className="font-barlow font-bold text-xl text-white uppercase">Runner Up</div>
               </div>
             </div>
             <div className="font-barlow-condensed font-black text-3xl text-zinc-300">$12,500</div>
          </div>

          <div className="bg-amber-700/10 border border-amber-700/30 rounded-2xl p-6 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-amber-700/20 flex items-center justify-center rounded-xl border border-amber-700/50">
                 <Medal className="w-5 h-5 text-amber-600" />
               </div>
               <div>
                 <div className="text-xs text-amber-600/70 font-bold uppercase tracking-widest">3rd Place</div>
                 <div className="font-barlow font-bold text-xl text-white uppercase">Bronze</div>
               </div>
             </div>
             <div className="font-barlow-condensed font-black text-3xl text-amber-500">$7,500</div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-purple-500/20 flex items-center justify-center rounded-xl border border-purple-500/50">
                 <Star className="w-5 h-5 text-purple-400" />
               </div>
               <div>
                 <div className="text-xs text-purple-400/80 font-bold uppercase tracking-widest">Individual</div>
                 <div className="font-barlow font-bold text-xl text-white uppercase">Tournament MVP</div>
               </div>
             </div>
             <div className="font-barlow-condensed font-black text-3xl text-purple-400">$5,000</div>
          </div>
        </div>

        {/* Sponsor Bio */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md h-full flex flex-col justify-center">
          <h3 className="text-brand-cyan text-sm font-bold uppercase tracking-widest mb-6">Powered By Our Sponsors</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            This season's monumental $50,000 prize pool is made possible through our premier partnerships. Thanks to the generosity and support of leading tech brands and gaming peripheral manufacturers, we are able to support the competitive ecosystem and reward the hard work of these elite athletes.
          </p>
          <div className="grid grid-cols-3 gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="h-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold">SPONSOR A</div>
             <div className="h-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold">SPONSOR B</div>
             <div className="h-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold">SPONSOR C</div>
          </div>
        </div>
      </div>
    </div>
  );
}
