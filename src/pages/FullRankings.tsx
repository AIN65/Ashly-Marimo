import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { PLAYERS } from '../data/players';

export function FullRankings() {
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterSeason, setFilterSeason] = useState('Season 4');

  const filteredPlayers = PLAYERS.filter(p => filterRegion === 'All' || p.nationality === filterRegion).sort((a, b) => b.points - a.points);

  return (
    <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto min-h-screen">
      <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-8 text-white uppercase">
        Full Rankings
      </h1>

      <div className="flex gap-4 mb-8">
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Region</label>
          <select 
            value={filterRegion} 
            onChange={e => setFilterRegion(e.target.value)}
            className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500"
          >
            <option value="All">All Regions</option>
            <option value="BR">Brazil</option>
            <option value="US">United States</option>
            <option value="KR">South Korea</option>
            <option value="JP">Japan</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="GB">United Kingdom</option>
            <option value="RU">Russia</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Season</label>
          <select 
            value={filterSeason} 
            onChange={e => setFilterSeason(e.target.value)}
            className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500"
          >
            <option value="Season 4">Season 4</option>
            <option value="Season 3">Season 3</option>
            <option value="Season 2">Season 2</option>
          </select>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Rank</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Player / Team</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Points</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Win/Loss</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, idx) => (
                <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-barlow-condensed font-bold text-xl text-white">#{idx + 1}</td>
                  <td className="p-4">
                    <div className="font-barlow font-bold italic text-lg text-white uppercase">{player.name}</div>
                    <div className="text-xs text-gray-400">{player.team}</div>
                  </td>
                  <td className="p-4 font-barlow-condensed font-bold text-xl text-cyan-400">
                    {player.points.toLocaleString()}
                  </td>
                  <td className="p-4 font-barlow-condensed font-bold text-xl text-emerald-400">
                    {player.winRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
