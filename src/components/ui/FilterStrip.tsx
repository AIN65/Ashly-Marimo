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

  const glassClasses = "bg-white/10 backdrop-blur-[30px] border border-white/20 shadow-[inset_0_2px_5px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.5),0_8px_32px_rgba(0,0,0,0.5)]";
  const glassActiveClasses = "bg-brand-cyan/30 backdrop-blur-[40px] border-t-white/40 border-b-black/50 border-x-brand-cyan/30 shadow-[inset_0_2px_6px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,255,133,0.3)] text-brand-cyan drop-shadow-md";
  const glassHoverClasses = "hover:bg-white/20 hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.3),0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300";

  return (
    <div className="sticky top-0 z-40 bg-[#050505]/30 backdrop-blur-[40px] py-4 border-b border-white/20 -mx-4 px-4 md:mx-0 md:px-0 shadow-[inset_0_-1px_1px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Predictive Search */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-cyan transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for a Pro, Gamertag, or Club..." 
            className={`w-full ${glassClasses} ${glassHoverClasses} rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all font-sans relative z-10 overflow-hidden`}
          />
        </div>

        {/* Scrollable Filters */}
        <div className="w-full overflow-x-auto scrollbar-hide py-2">
          <div className="flex items-center gap-6 min-w-max">
            
            {/* Division Filters */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mr-2 drop-shadow-sm">Division</span>
              <button 
                onClick={() => onDivisionChange(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-barlow tracking-widest uppercase transition-all duration-300 ${!selectedDivision ? glassActiveClasses : `${glassClasses} ${glassHoverClasses} text-gray-400`}`}
              >
                ALL
              </button>
              {divisions.map(div => (
                <button 
                  key={div}
                  onClick={() => onDivisionChange(selectedDivision === div ? null : div)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-barlow tracking-widest uppercase transition-all duration-300 ${selectedDivision === div ? glassActiveClasses : `${glassClasses} ${glassHoverClasses} text-gray-400`}`}
                >
                  {div}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-white/10 shadow-[1px_0_0_rgba(0,0,0,0.5)]"></div>

            {/* Sort Toggles */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mr-2 drop-shadow-sm">Sort</span>
              {sorts.map(sort => (
                <button 
                  key={sort.id}
                  onClick={() => onSortChange(sort.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-barlow tracking-widest uppercase transition-all duration-300 ${sortField === sort.id ? glassActiveClasses : `${glassClasses} ${glassHoverClasses} text-gray-400`}`}
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
