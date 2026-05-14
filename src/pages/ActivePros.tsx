import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Twitter, Twitch, User as UserIcon } from 'lucide-react';
import { PLAYERS } from '../data/players';

export function ActivePros() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>

      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-2 text-white uppercase">
            Active Pros
          </h1>
          <p className="text-gray-400 text-lg">Directory of the top competitors in the current global circuit.</p>
        </div>
        <div className="bg-brand-cyan/20 text-brand-cyan px-4 py-2 rounded-full border border-brand-cyan/30 text-sm font-bold uppercase tracking-widest">
          {PLAYERS.length} Players Registered
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {PLAYERS.map((player) => (
          <div key={player.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/30 transition-colors group">
            {/* Aspect ratio header */}
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-black relative flex items-center justify-center p-6 border-b border-white/10">
               {/* Headshot Placeholder */}
               <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                 <UserIcon className="w-10 h-10 text-white/50" />
               </div>
               <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                 {player.nationality}
               </div>
               <div className="absolute bottom-4 left-4 bg-brand-cyan text-black px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                 {player.tier}
               </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-display font-black italic text-2xl text-white uppercase tracking-tight truncate">{player.name}</h3>
                <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-purple-500/30">Entry Fragger</span>
              </div>
              <p className="text-brand-cyan font-bold text-sm uppercase tracking-widest mb-4 truncate">{player.team}</p>

              <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                A top-tier competitor representing {player.nationality}. Currently sitting at rank #{player.rank} globally with {player.points.toLocaleString()} points. Maining aggressive characters with high precision.
              </p>

              <div className="flex gap-2">
                <button className="flex-1 bg-white/10 hover:bg-[#1DA1F2] hover:text-white transition-colors text-gray-300 py-2 rounded-lg flex items-center justify-center">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="flex-1 bg-white/10 hover:bg-[#9146FF] hover:text-white transition-colors text-gray-300 py-2 rounded-lg flex items-center justify-center">
                  <Twitch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
