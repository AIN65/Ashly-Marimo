import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Shield, Target, Activity } from 'lucide-react';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [realName, setRealName] = useState('');
  const [clubName, setClubName] = useState('');
  const [position, setPosition] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        // Register flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          userId: user.uid,
          gamertag,
          email,
          realName: realName ? realName : null,
          clubName: clubName ? clubName : null,
          position: position ? position : null,
          region: region ? region : null,
          globalPoints: 0,
          winRate: 0,
          matchesPlayed: 0,
          seed: 'Contender',
          form: [],
          joinDate: Date.now()
        });

        // Trigger welcome email (fire-and-forget, or wait for it)
        fetch('/api/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, gamertag })
        }).catch(err => console.error("Email send trigger failed", err));

        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#0a0c14] border border-cyan-500/20 rounded-[28px] p-6 z-[101] shadow-[0_0_40px_rgba(34,211,238,0.1)] max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 bg-white/5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-2 font-sans tracking-tight text-white">
              {isLogin ? 'Welcome Back' : 'Join Star Strick'}
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              {isLogin 
                ? 'Sign in to update your stats and track the leaderboard.'
                : 'Create an account to join the competitive scene.'}
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {!isLogin && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-widest text-cyan-500/80 font-bold ml-1">Gamertag *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" required value={gamertag} onChange={e => setGamertag(e.target.value)}
                        className="w-full bg-[#12141d]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="e.g. WILFY-Z"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold ml-1 flex items-center justify-between">
                      Club/Team Name 
                      <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">Optional</span>
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" value={clubName} onChange={e => setClubName(e.target.value)}
                        className="w-full bg-[#12141d]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="e.g. Harare Thunder"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold ml-1 flex items-center justify-between">
                        Region 
                        <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">Optional</span>
                      </label>
                      <div className="relative">
                        <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" value={region} onChange={e => setRegion(e.target.value)}
                          className="w-full bg-[#12141d]/80 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="e.g. Zimbabwe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold ml-1 flex items-center justify-between">
                        Position 
                        <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">Optional</span>
                      </label>
                      <div className="relative">
                        <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <select 
                          value={position} onChange={e => setPosition(e.target.value)}
                          className="w-full bg-[#12141d]/80 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none"
                        >
                          <option value="">Any</option>
                          <option value="Striker">Striker</option>
                          <option value="Midfielder">Midfielder</option>
                          <option value="Defender">Defender</option>
                          <option value="Goalkeeper">Goalkeeper</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-widest text-cyan-500/80 font-bold ml-1">Email address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#12141d]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-widest text-cyan-500/80 font-bold ml-1">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#12141d]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="Min 8 characters"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-[15px] hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Register Now'}
              </button>

            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already registered? "}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
