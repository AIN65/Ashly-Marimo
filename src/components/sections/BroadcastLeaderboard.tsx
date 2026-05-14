import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Player, PLAYERS } from '../../data/players';
import { BroadcastRow } from '../ui/BroadcastRow';
import { BroadcastDetail } from '../ui/BroadcastDetail';
import { FilterStrip } from '../ui/FilterStrip';
import { Trophy, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BroadcastLeaderboard = () => {
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>(PLAYERS);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'points' | 'winRate' | 'gd' | 'streak'>('points');
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Initialize from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('p');
    if (pid && PLAYERS.find(p => p.id === pid)) {
      setActivePlayerId(pid);
    }
  }, []);

  // Update URL
  useEffect(() => {
    if (activePlayerId) {
      const url = new URL(window.location.href);
      url.searchParams.set('p', activePlayerId);
      window.history.replaceState({}, '', url.toString());
    }
  }, [activePlayerId]);

  // Apply filters & sort
  useEffect(() => {
    let filtered = [...PLAYERS];
    
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(s) || 
        p.team.toLowerCase().includes(s) ||
        p.city.toLowerCase().includes(s)
      );
    }

    if (selectedDivision) {
      filtered = filtered.filter(p => p.tier.toLowerCase() === selectedDivision.toLowerCase());
    }

    filtered.sort((a, b) => {
      if (sortField === 'points') return b.points - a.points;
      if (sortField === 'winRate') return parseFloat(b.winRate) - parseFloat(a.winRate);
      if (sortField === 'gd') return b.gd - a.gd;
      if (sortField === 'streak') return b.streak - a.streak;
      return 0;
    });

    setPlayers(filtered);
    
    if (!activePlayerId && filtered.length > 0) {
      setActivePlayerId(filtered[0].id);
    } else if (activePlayerId && !filtered.find(p => p.id === activePlayerId) && filtered.length > 0) {
      setActivePlayerId(filtered[0].id);
    }
  }, [search, sortField, selectedDivision]); // activePlayerId intentionally omitted

  // Scroll tracking
  useEffect(() => {
    let animationFrameId: number;
    let isUserScrolling = false;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return; // Only desktop
      if (isMobileDetailOpen) return;
      isUserScrolling = true;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const trackScroll = () => {
      if (isUserScrolling && window.innerWidth >= 1024) {
        const viewportCenter = window.innerHeight / 2;
        let closestId: string | null = null;
        let smallestDistance = Infinity;

        players.forEach(p => {
          const el = rowRefs.current[p.id];
          if (el) {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - elementCenter);
            if (distance < smallestDistance) {
              smallestDistance = distance;
              closestId = p.id;
            }
          }
        });

        if (closestId && closestId !== activePlayerId) {
          setActivePlayerId(closestId);
        }
        isUserScrolling = false;
      }
      animationFrameId = requestAnimationFrame(trackScroll);
    };

    trackScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [players, activePlayerId, isMobileDetailOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = players.findIndex(p => p.id === activePlayerId);
        if (currentIndex === -1) return;
        
        let nextIndex = currentIndex;
        if (e.key === 'ArrowDown' && currentIndex < players.length - 1) nextIndex++;
        if (e.key === 'ArrowUp' && currentIndex > 0) nextIndex--;
        
        if (nextIndex !== currentIndex) {
          const nextId = players[nextIndex].id;
          setActivePlayerId(nextId);
          rowRefs.current[nextId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      if (e.key === 'Enter' && window.innerWidth < 1024 && activePlayerId) {
        setIsMobileDetailOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [players, activePlayerId]);

  const activePlayer = players.find(p => p.id === activePlayerId) || players[0];

  const handleRowClick = (id: string) => {
    setActivePlayerId(id);
    if (window.innerWidth < 1024) {
      setIsMobileDetailOpen(true);
    } else {
      rowRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const biggestChangePlayerId = [...PLAYERS].reduce((prev, curr) => (curr.change > prev.change ? curr : prev)).id;

  return (
    <section className="min-h-screen relative bg-[#050505] text-white pt-24 font-barlow pb-20">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#1A1A1A]/80 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col h-full">
        <FilterStrip 
          search={search} onSearch={setSearch}
          sortField={sortField} onSortChange={setSortField}
          selectedDivision={selectedDivision} onDivisionChange={setSelectedDivision}
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 items-start relative min-h-[80vh]">
          {/* Left Column: Rankings List */}
          <div className="w-full lg:w-[65%] shrink-0 pb-32" ref={listRef}>
            <div className="flex flex-col gap-3 relative z-10">
              <AnimatePresence>
                {players.flatMap((player, index) => {
                  const showTierHeader = sortField === 'points' && (!selectedDivision) && (index === 0 || players[index - 1].tier !== player.tier);
                  const items = [];
                  
                  if (showTierHeader) {
                    items.push(
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: -20, height: 0, marginTop: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto', marginTop: 24, marginBottom: 8 }}
                        exit={{ opacity: 0, scale: 0.95, height: 0, marginTop: 0, marginBottom: 0 }}
                        transition={{ duration: 0.4 }}
                        key={`header-${player.tier}`}
                        className="sticky top-20 lg:top-24 z-30 bg-[#050505]/90 backdrop-blur-xl py-4 border-b-2 border-brand-cyan shadow-[0_4px_15px_rgba(0,255,133,0.15)] first:mt-0 transition-colors duration-500 overflow-hidden"
                      >
                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase ml-2 select-none">
                          {player.tier}
                        </h2>
                      </motion.div>
                    );
                  }
                  
                  items.push(
                    <motion.div
                      key={`row-${player.id}`}
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: -12, transition: { duration: 0.2 } }}
                      transition={{ 
                        layout: { type: "spring", damping: 30, stiffness: 100, mass: 1 },
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.4 }
                      }}
                      ref={(el) => { if(el) rowRefs.current[player.id] = el; }}
                    >
                      <BroadcastRow 
                        player={player} 
                        isActive={activePlayerId === player.id}
                        onClick={() => handleRowClick(player.id)}
                        isBiggestMover={player.id === biggestChangePlayerId}
                      />
                    </motion.div>
                  );
                  
                  return items;
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Sticky Detail (Desktop) */}
          <div className="hidden lg:flex w-[35%] max-w-[480px] shrink-0 sticky top-32 h-[calc(100vh-160px)] max-h-[850px] justify-center ml-auto">
            <div className="w-full h-full aspect-[4/5] max-h-full">
              <BroadcastDetail player={activePlayer} />
            </div>
          </div>

          {/* Bottom Sheet Detail (Mobile) */}
          <AnimatePresence>
            {isMobileDetailOpen && activePlayer && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileDetailOpen(false)}
                  className="fixed inset-0 bg-black/80 z-[100] lg:hidden backdrop-blur-sm"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                  drag="y"
                  dragConstraints={{ top: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.y > 100 || velocity.y > 400) setIsMobileDetailOpen(false);
                  }}
                  className="fixed inset-x-0 bottom-0 h-[96dvh] z-[101] lg:hidden flex flex-col p-2 pb-0"
                >
                   <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing shrink-0 z-50 absolute top-2 left-0 right-0">
                       <div className="w-12 h-1.5 bg-white/40 shadow-sm rounded-full"></div>
                   </div>
                   <div className="flex-1 overflow-y-auto w-full relative overscroll-none pb-4 drop-shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                      <BroadcastDetail player={activePlayer} />
                   </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
