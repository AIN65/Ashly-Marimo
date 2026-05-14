import React, { useState, useEffect } from 'react';
import { Search, Menu, Filter, ArrowDown, ArrowRight, User as UserIcon, LogOut } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const PLAYERS = [
  { rank: 1, change: 0, name: 'WILFY-Z', team: 'Harare Thunder', tier: 'Elite', points: 3120, winRate: '90.3%', form: ['W','W','W','D','W'] },
  { rank: 2, change: 1, name: 'ASH-MAR1', team: 'Bulawayo Strikers', tier: 'Elite', points: 3085, winRate: '86.8%', form: ['W','D','W','W','W'] },
  { rank: 3, change: -1, name: 'KUNDAI', team: 'Harare Thunder', tier: 'Elite', points: 2980, winRate: '84.3%', form: ['L','W','W','W','W'] },
  { rank: 4, change: 1, name: 'FARABALL2', team: 'Mutare Riders', tier: 'Elite', points: 2842, winRate: '81.6%', form: ['W','W','W','D','W'] },
  { rank: 5, change: -1, name: 'MUNA101', team: 'Bulawayo Strikers', tier: 'Elite', points: 2790, winRate: '79.1%', form: ['D','W','W','W','L'] },
  { rank: 6, change: 2, name: 'ZW_RUFA1', team: 'Gweru Falcons', tier: 'Pro', points: 2640, winRate: '75%', form: ['W','W','W','D','L'] },
  { rank: 7, change: -1, name: 'TATENDOO2', team: 'Bulawayo Strikers', tier: 'Pro', points: 2588, winRate: '72.3%', form: ['W','D','W','W','W'] },
  { rank: 8, change: -1, name: 'PANA-X1', team: 'Harare Thunder', tier: 'Pro', points: 2510, winRate: '69.9%', form: ['L','W','W','D','W'] },
  { rank: 9, change: 2, name: 'SIMBA-FC1', team: 'ZW Spartans', tier: 'Pro', points: 2470, winRate: '67.5%', form: ['W','W','L','W','D'] },
  { rank: 10, change: -1, name: 'BLESS-92', team: 'Mutare Riders', tier: 'Pro', points: 2410, winRate: '65.1%', form: ['W','D','W','L','W'] },
  { rank: 11, change: -1, name: 'TAPS1', team: 'Harare Thunder', tier: 'Pro', points: 2360, winRate: '62.7%', form: ['W','W','W','D','L'] },
  { rank: 12, change: 2, name: 'NY-X1', team: 'ZW Spartans', tier: 'Challenger', points: 2280, winRate: '60.2%', form: ['W','D','W','D','W'] },
  { rank: 13, change: -1, name: 'TAWA-FC1', team: 'ZW Spartans', tier: 'Challenger', points: 2210, winRate: '57.8%', form: ['L','W','W','W','L'] },
  { rank: 14, change: 2, name: 'T-HOVE1', team: 'Harare Thunder', tier: 'Challenger', points: 2150, winRate: '55.4%', form: ['W','W','D','L','W'] },
  { rank: 15, change: 0, name: 'TINO-X3RISER', team: 'Bulawayo Strikers', tier: 'Challenger', points: 2090, winRate: '53%', form: ['W','W','W','W','D'] },
  { rank: 16, change: 2, name: 'ANE-SU1', team: 'Harare Thunder', tier: 'Challenger', points: 2050, winRate: '51%', form: ['W','D','W','L','W'] },
];

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user data
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-[#060811] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      <div className="fixed top-40 right-[-100px] w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#060811]/90 backdrop-blur-md border-b border-white/[0.03]">
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold tracking-tighter text-sm">
            ZW
            <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#060811]"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300 hidden sm:block">
                {userData?.fullName || user.email}
              </span>
              <button onClick={handleSignOut} className="text-gray-400 hover:text-white transition-colors" title="Sign Out">
                 <LogOut className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="text-sm font-semibold tracking-wide flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <UserIcon className="w-4 h-4" strokeWidth={2} />
              Login / Register
            </button>
          )}

          <div className="w-px h-5 bg-white/10 mx-1"></div>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Search className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors relative">
            <Menu className="w-6 h-6" strokeWidth={1.5} />
            <div className="absolute inset-0 rounded-full border border-white/10 scale-125 pointer-events-none"></div>
          </button>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-4 max-w-md mx-auto sm:max-w-xl md:max-w-4xl relative z-10">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-slate-800/50 mb-8 border-b-cyan-500/50">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            <span className="text-xs font-semibold tracking-wide text-gray-200">Season 4 Live</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Elite FC Rankings</span>
          </h1>

          <p className="text-gray-400/90 text-sm md:text-base leading-relaxed mb-10 max-w-xs mx-auto">
            Zimbabwe's premier esports platform. Track elite players and follow the competitive scene.
          </p>

          <div className="flex flex-col w-full gap-3.5 mb-14 px-2">
            <button className="w-full relative group">
               <div className="absolute inset-0 bg-gradient-to-r from-[#172044] to-[#251b3a] rounded-[20px] transition group-hover:opacity-80"></div>
               <div className="relative flex items-center justify-center gap-2 w-full py-4 rounded-[20px] border border-white/10 font-medium text-[15px] transition group-hover:border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
                 View Rankings <ArrowRight className="w-4 h-4 ml-1" />
               </div>
            </button>
            <button className="w-full py-4 rounded-[20px] border border-white/5 bg-[#12141d]/50 backdrop-blur-sm font-medium text-[15px] hover:bg-white/5 transition">
              Explore Players
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 w-full mb-16 px-2">
            <div className="flex flex-col items-center justify-center py-7 rounded-[24px] border border-white/[0.03] bg-[#12141d]/40 space-y-1">
              <div className="text-3xl font-bold font-sans">25<span className="text-cyan-400 text-2xl leading-none inline-block align-top ml-0.5 mt-1">+</span></div>
              <div className="text-[11px] text-gray-500 font-medium">Players</div>
            </div>
            <div className="flex flex-col items-center justify-center py-7 rounded-[24px] border border-white/[0.03] bg-[#12141d]/40 space-y-1">
               <div className="text-3xl font-bold font-sans">6</div>
              <div className="text-[11px] text-gray-500 font-medium">Teams</div>
            </div>
            <div className="flex flex-col items-center justify-center py-7 rounded-[24px] border border-white/[0.03] bg-[#12141d]/40 space-y-1">
              <div className="text-3xl font-bold font-sans tracking-tight">$50K<span className="text-cyan-400 text-2xl leading-none inline-block align-top ml-0.5 mt-1">+</span></div>
              <div className="text-[11px] text-gray-500 font-medium">Prize Pool</div>
            </div>
            <div className="flex flex-col items-center justify-center py-7 rounded-[24px] border border-white/[0.03] bg-[#12141d]/40 space-y-1">
              <div className="text-3xl font-bold font-sans">500<span className="text-cyan-400 text-2xl leading-none inline-block align-top ml-0.5 mt-1">+</span></div>
              <div className="text-[11px] text-gray-500 font-medium">Matches</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 mb-20 text-gray-600/60 mt-4">
            <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </section>

        {/* Top Performers Section */}
        <section className="mb-24 mt-4">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1e3a51]"></div>
            <span className="text-[10px] text-cyan-500/80 uppercase tracking-widest font-semibold font-sans">Top Performers</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1e3a51]"></div>
          </div>
          <h2 className="text-[28px] font-bold text-center mb-3">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Elite Players</span>
          </h2>
          <p className="text-gray-400/80 text-center text-[13px] mb-10 max-w-[280px] mx-auto leading-relaxed">The best competitive FC players in Zimbabwe</p>

          {/* Cards Wrapper */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 items-stretch">
            
            {/* Featured Card 1 */}
            <div className="min-w-[280px] w-[280px] snap-center rounded-[32px] p-[1px] bg-gradient-to-b from-[#b18121] via-yellow-600/10 to-transparent relative shadow-2xl">
              <div className="bg-[#10121a] h-full w-full rounded-[31px] px-6 py-8 flex flex-col items-center relative overflow-hidden">
                {/* Gold corner accent */}
                <div className="absolute -top-1 -right-1 w-14 h-14 bg-gradient-to-bl from-yellow-500 to-yellow-600 rounded-bl-full rounded-tr-[31px]"></div>
                
                <div className="w-20 h-20 rounded-full border border-yellow-500/30 flex items-center justify-center mb-5 relative bg-yellow-500/5 text-yellow-500 text-2xl font-bold font-sans">
                  WI
                  {/* Subtle outer dashed glow */}
                  <div className="absolute -inset-1.5 rounded-full border-[0.5px] border-yellow-500/20 mix-blend-screen"></div>
                </div>
                
                <h3 className="text-xl font-bold tracking-wide mb-1 font-sans">WILFY-Z</h3>
                <p className="text-gray-500 text-[13px] mb-5">Wilfred Chigwende</p>
                <div className="px-3.5 py-1 mb-8 rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold tracking-wider uppercase">
                  Elite
                </div>

                <div className="w-full space-y-3.5 px-1 font-sans">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500">Points</span>
                    <span className="text-cyan-400 font-medium tracking-wide">3,120</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500">Win Rate</span>
                    <span className="text-white font-medium">90.3%</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500">Record</span>
                    <span className="text-emerald-400/90 font-medium">84W <span className="text-gray-600 font-normal">-</span> 9L</span>
                  </div>
                </div>

                <div className="w-full mt-8 px-1">
                  <span className="text-[11px] text-gray-500 block mb-3">Recent Form</span>
                  <div className="flex gap-2">
                    {['W','W','W','D','W'].map((r,i) => (
                      <div key={i} className={`flex-1 h-7 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        r === 'W' ? 'text-emerald-400 bg-emerald-400/15 border border-emerald-400/20' :
                        r === 'L' ? 'text-rose-400 bg-rose-400/15 border border-rose-400/20' :
                                    'text-slate-400 bg-slate-400/15 border border-slate-400/20'
                      }`}>
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ghost card for scroll hint */}
            <div className="min-w-[40px] w-[80px] snap-center rounded-[32px] p-[1px] bg-gradient-to-b from-white/[0.08] to-transparent">
              <div className="bg-[#10121a]/80 h-full w-full rounded-[31px]"></div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
              View all rankings <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section>
          <div className="text-center mb-8">
            <div className="text-[10px] text-cyan-500/80 uppercase tracking-widest font-semibold mb-3">World Rankings</div>
            <h2 className="text-[28px] font-bold mb-3">
              Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Leaderboard</span>
            </h2>
            <p className="text-gray-400/80 text-[13px] mx-auto max-w-[240px] leading-relaxed">Real-time competitive rankings updated after every match</p>
          </div>

          {/* Search/Filter UI */}
          <div className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search players..." 
                className="w-full bg-[#12141d]/60 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/40 transition-colors"
               />
            </div>
            <button className="p-3.5 bg-[#12141d]/60 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* List Wrapper */}
          <div className="flex flex-col gap-2 relative">
             {/* Small line to connect rows visually */}
             <div className="absolute top-4 bottom-4 left-[34px] w-[1px] bg-white/[0.03] -z-10 hidden sm:block"></div>
            
            {PLAYERS.map((p, index) => (
              <PlayerRow key={index} player={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const PlayerRow: React.FC<{ player: any }> = ({ player }) => {
  const getRankCol = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-black h-[28px] w-[28px] text-[13px] shadow-[0_0_12px_rgba(234,179,8,0.4)]';
    if (rank === 2) return 'bg-slate-300 text-black h-7 w-7 text-[12px] shadow-[0_0_12px_rgba(203,213,225,0.3)]';
    if (rank === 3) return 'bg-orange-500 text-black h-7 w-7 text-[12px] shadow-[0_0_12px_rgba(249,115,22,0.3)]';
    return 'bg-white/5 text-white h-7 w-7 text-[11px] border border-white/10';
  };

  const getTierBadge = (tier: string) => {
    if (tier === 'Elite') return 'text-yellow-500 border-yellow-500/40';
    if (tier === 'Pro') return 'text-cyan-400 border-cyan-400/40';
    return 'text-purple-400 border-purple-400/40';
  };

  return (
    <div className="flex gap-3.5 items-start p-4 bg-[#12141d]/40 rounded-[24px] hover:bg-[#12141d]/80 transition">
      
      {/* Rank Indicator */}
      <div className="flex gap-2.5 items-center w-12 shrink-0 pt-0.5">
        <div className={`rounded-full flex items-center justify-center font-bold font-sans tracking-tighter ${getRankCol(player.rank)}`}>
          {player.rank}
        </div>
        <div className={`text-[10px] font-bold ${player.change > 0 ? 'text-emerald-500' : player.change < 0 ? 'text-rose-500' : 'text-gray-600'} min-w-[12px]`}>
          {player.change !== 0 ? (player.change > 0 ? `+${player.change}` : player.change) : ''}
        </div>
      </div>

      {/* Main Info */}
      <div className="flex-1 flex flex-col gap-1 min-w-0 pb-1">
        
        {/* Name & Badge */}
        <div className="flex items-center gap-2 mt-[2px]">
          <span className="font-bold text-white text-[15px] tracking-wide truncate font-sans block">{player.name}</span>
          <span className={`text-[9px] px-1.5 py-[1px] rounded-[4px] uppercase font-bold tracking-widest shrink-0 border ${getTierBadge(player.tier)}`}>
            {player.tier}
          </span>
        </div>
        
        {/* Team */}
        <div className="text-[12px] text-gray-500 truncate mt-0.5 font-medium">{player.team}</div>
        
        {/* Stats Row */}
        <div className="flex items-center justify-between w-full mt-2">
          
          {/* PTS and WR */}
          <div className="flex items-center gap-3">
            <div className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5">
              PTS <span className="font-sans font-medium text-gray-300 text-[13px]">{player.points.toLocaleString()}</span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5">
              WR <span className="font-sans font-medium text-gray-300 text-[13px]">{player.winRate}</span>
            </div>
          </div>
          
          {/* Form */}
          <div className="flex gap-[3px] ml-auto">
            {player.form.map((r, i) => (
              <div key={i} className={`w-[18px] h-[18px] rounded flex items-center justify-center text-[9px] font-bold font-sans ${
                r === 'W' ? 'text-emerald-400 bg-emerald-400/15' :
                r === 'L' ? 'text-rose-400 bg-rose-400/15' :
                            'text-slate-400 bg-slate-400/15'
              }`}>
                {r}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

