import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthModal } from './components/AuthModal';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { FullRankings } from './pages/FullRankings';
import { TournamentHub } from './pages/TournamentHub';
import { ActivePros } from './pages/ActivePros';
import { ProTeams } from './pages/ProTeams';
import { PrizePool } from './pages/PrizePool';
import { MatchesPlayed } from './pages/MatchesPlayed';

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <Navbar 
        user={user} 
        userData={userData} 
        onLoginClick={() => setIsAuthModalOpen(true)} 
        onSignOut={handleSignOut} 
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rankings" element={<FullRankings />} />
          <Route path="/hub" element={<TournamentHub />} />
          <Route path="/pros" element={<ActivePros />} />
          <Route path="/teams" element={<ProTeams />} />
          <Route path="/prize" element={<PrizePool />} />
          <Route path="/matches" element={<MatchesPlayed />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

