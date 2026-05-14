import React from 'react';
import { HeroSection } from '../components/sections/Hero';
import { FeaturedPlayers } from '../components/sections/FeaturedPlayers';
import { BroadcastLeaderboard } from '../components/sections/BroadcastLeaderboard';
import { PLAYERS } from '../data/players';

export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPlayers players={PLAYERS} />
      <BroadcastLeaderboard />
    </>
  );
}
