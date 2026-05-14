import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Gamepad2, Trophy, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center pt-20 pb-10 px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
        {/* Subtle grid pattern over bg */}
        <div className="absolute inset-0 bg-grid-white opacity-20"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050A]/0 via-[#05050A]/50 to-[#05050A]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#0A0D14]/80 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></div>
        <span className="text-xs font-bold tracking-[0.1em] text-cyan-50 uppercase font-sans">Season 4 World Circuit Live</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 leading-[1.05] max-w-4xl"
      >
        THE ELITE STAGE OF <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-400">STAR STRICK</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-sans"
      >
        The official global ranking platform. Track the rising stars, follow the competitive circuit, and witness the battle for supremacy.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="flex flex-col sm:flex-row w-full max-w-md gap-4 mb-16 px-4 sm:px-0"
      >
        <Link to="/rankings" className="flex-1 relative group overflow-hidden rounded-xl bg-white text-black font-bold font-sans text-[15px] py-4 transition-all hover:scale-[1.02] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative flex items-center justify-center gap-2 group-hover:text-white">
            Full Rankings <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <Link to="/hub" className="flex-1 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md font-bold text-[15px] hover:bg-white/10 transition-all font-sans text-white hover:scale-[1.02] flex items-center justify-center">
          Tournament Hub
        </Link>
      </motion.div>

      {/* Cinematic Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl gap-4 md:gap-6 px-4"
      >
        {[
          { label: 'Active Pros', value: '25+', icon: Users, color: 'text-cyan-400', path: '/pros' },
          { label: 'Pro Teams', value: '6', icon: Shield, color: 'text-purple-400', path: '/teams' },
          { label: 'Prize Pool', value: '$50K', icon: Trophy, color: 'text-yellow-400', path: '/prize' },
          { label: 'Matches Played', value: '5K+', icon: Gamepad2, color: 'text-emerald-400', path: '/matches' }
        ].map((stat, i) => (
          <Link to={stat.path} key={i} className="flex flex-col items-center justify-center py-8 rounded-2xl glass-panel relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className={`absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${stat.color.split('-')[1]}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <stat.icon className={`w-6 h-6 mb-3 ${stat.color} opacity-80`} strokeWidth={1.5} />
            <div className="text-3xl font-display font-black tracking-tight text-white">{stat.value}</div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-bold mt-1 group-hover:text-white transition-colors">{stat.label}</div>
          </Link>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};
