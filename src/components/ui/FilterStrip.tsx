import React from 'react';
import { Search } from 'lucide-react';

interface FilterStripProps {
  search: string;
  onSearch: (v: string) => void;
  sortField: 'points' | 'winRate' | 'gd' | 'streak';
  onSortChange: (v: 'points' | 'winRate' | 'gd' | 'streak') => void;
  selectedDivision: string | null;
  onDivisionChange: (v: string | null) => void;
}

export const FilterStrip: React.FC<FilterStripProps> = ({ search, onSearch, sortField, onSortChange, selectedDivision, onDivisionChange }) => {
  const divisions = ['ELITE', 'PRO', 'CHALLENGER', 'ROOKIE'];
  const sorts = [
    { id: 'points', label: 'POINTS' },
    { id: 'winRate', label: 'WIN RATE' },
    { id: 'gd', label: 'GOAL DIFF' },
    { id: 'streak', label: 'STREAK' }
  ];

  return (
    <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md py-4 border-b border-white/10 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Predictive Search */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-cyan transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for a Pro, Gamertag, or Club..." 
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-cyan/50 font-sans transition-all"
          />
        </div>

        {/* Scrollable Filters */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-6 min-w-max">
            
            {/* Division Filters */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mr-2">Division</span>
              <button 
                onClick={() => onDivisionChange(null)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold font-barlow tracking-widest uppercase transition-all duration-300 border ${!selectedDivision ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/5 inner-glow' : 'border-white/10 text-gray-400 bg-black/40 hover:border-white/30'}`}
              >
                ALL
              </button>
              {divisions.map(div => (
                <button 
                  key={div}
                  onClick={() => onDivisionChange(selectedDivision === div ? null : div)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold font-barlow tracking-widest uppercase transition-all duration-300 border ${selectedDivision === div ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/5 inner-glow' : 'border-white/10 text-gray-400 bg-black/40 hover:border-white/30'}`}
                >
                  {div}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/10"></div>

            {/* Sort Toggles */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mr-2">Sort</span>
              {sorts.map(sort => (
                <button 
                  key={sort.id}
                  onClick={() => onSortChange(sort.id as any)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold font-barlow tracking-widest uppercase transition-all duration-300 border ${sortField === sort.id ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/5 inner-glow' : 'border-white/10 text-gray-400 bg-black/40 hover:border-white/30'}`}
                >
                  {sort.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
