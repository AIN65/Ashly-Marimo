import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Gamepad2, Trophy, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center pt-20 pb-32 px-4 overflow-hidden bg-[#02040a]">
      {/* Cinematic Broadcast Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep Blue Base Glow */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[1200px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        
        {/* Animated Cyan RGB Strips */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[-10%] w-[40%] h-full bg-cyan-500/5 blur-[120px] skew-x-[-20deg]"
        ></motion.div>
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-0 right-[-10%] w-[40%] h-full bg-blue-500/5 blur-[120px] skew-x-[20deg]"
        ></motion.div>

        {/* Global Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/50 to-[#02040a]"></div>
        
        {/* High-Fidelity Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></div>
          <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase">Broadcast Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-sans font-[900] tracking-tighter mb-8 text-white uppercase leading-[0.9] max-w-5xl"
        >
          THE ELITE STAGE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">OF STAR STRICK</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto font-sans font-medium px-4"
        >
          The official global ranking platform. Track the rising stars, follow the competitive circuit, and witness the battle for supremacy.
        </motion.p>

        {/* Sub-Menu Vertical Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col w-full max-w-sm gap-3 mb-24"
        >
          <Link to="/rankings" className="group flex items-center justify-between px-6 py-5 rounded-sm border border-white/5 bg-[#0A0D14]/40 hover:bg-[#0A0D14]/60 backdrop-blur-xl transition-all hover:border-white/20">
            <span className="text-sm font-black tracking-widest text-white uppercase">Full Rankings</span>
            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
          <Link to="/hub" className="group flex items-center justify-between px-6 py-5 rounded-sm border border-white/5 bg-[#0A0D14]/40 hover:bg-[#0A0D14]/60 backdrop-blur-xl transition-all hover:border-white/20">
            <span className="text-sm font-black tracking-widest text-white uppercase">Tournament Hub</span>
            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        {/* Cinematic Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 w-full max-w-5xl gap-4 md:gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden"
        >
          {[
            { label: 'Active Pros', value: '25+', icon: Users, color: 'text-cyan-400', path: '/pros' },
            { label: 'Pro Teams', value: '6', icon: Shield, color: 'text-blue-400', path: '/teams' },
            { label: 'Prize Pool', value: '$50K', icon: Trophy, color: 'text-yellow-400', path: '/prize' },
            { label: 'Matches Played', value: '5K+', icon: Gamepad2, color: 'text-emerald-400', path: '/matches' }
          ].map((stat, i) => (
            <Link 
              to={stat.path} 
              key={i} 
              className="flex flex-col items-center justify-center py-10 px-6 bg-[#05060f]/60 hover:bg-white/[0.03] transition-colors group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <stat.icon className={`w-5 h-5 mb-4 ${stat.color} opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all`} strokeWidth={1.5} />
              <div className="text-4xl font-sans font-black tracking-tight text-white mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-white transition-colors">{stat.label}</div>
            </Link>
          ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-700"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-black">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" strokeWidth={3} />
      </motion.div>
    </section>
  );
};
