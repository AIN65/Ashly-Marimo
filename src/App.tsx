import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/AuthModal';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { PLAYERS } from './data/players';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/Hero';
import { FeaturedPlayers } from './components/sections/FeaturedPlayers';
import { BroadcastLeaderboard } from './components/sections/BroadcastLeaderboard';
import { Footer } from './components/layout/Footer';

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
        <HeroSection />
        <FeaturedPlayers players={PLAYERS} />
        <BroadcastLeaderboard />
      </main>

      <Footer />
    </div>
  );
}

