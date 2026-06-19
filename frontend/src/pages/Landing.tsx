import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, TrendingUp, ShieldCheck, ArrowRight, Sparkles, Database, BarChart3, Layers, Target, Activity, Presentation } from 'lucide-react';
import PresentationViewer from '../components/PresentationViewer';

const Landing: React.FC = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <div className="min-h-[200vh] bg-background flex flex-col relative overflow-x-hidden font-sans scroll-smooth">
      
      {/* Animated Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.13, 0.08], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[40%] right-[20%] w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
        />
      </div>

      {/* ─── Navbar ─── */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/5"
      >
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow-accent relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] transition-transform duration-500 group-hover:scale-110" />
              <Zap size={20} className="text-white relative z-10" />
            </div>
            <h1 className="text-lg font-bold text-primary tracking-tight">Trend AI</h1>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-secondary hover:text-primary transition-colors hidden sm:block">Features</a>
            <a href="#stats" className="text-sm font-medium text-secondary hover:text-primary transition-colors hidden sm:block">Stats</a>
            <Link to="/dashboard" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Sign In</Link>
            <Link to="/dashboard" className="relative inline-flex h-10 overflow-hidden rounded-xl p-[1px] group">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#080b14_0%,#6366f1_50%,#080b14_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-surface px-5 py-1 text-sm font-semibold text-primary backdrop-blur-3xl border border-border group-hover:border-transparent transition-all">
                Launch App
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 px-6 text-center pt-20 md:pt-32 pb-16">
        <motion.div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-accent animate-pulse" />
            <span className="text-xs font-semibold text-accent/90 tracking-wide uppercase">Dual-Agent AI Pipeline</span>
          </motion.div>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-primary"
          >
            Decode the market with<br/>
            <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Autonomous AI
            </span>
          </motion.h2>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-secondary md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Upload any product packaging. Our dual-agent pipeline extracts hero ingredients, categorizes claims, and generates real-time market positioning.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button onClick={() => setIsViewerOpen(true)} className="group relative px-8 py-4 bg-accent text-white rounded-xl font-bold text-base shadow-glow-accent hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all duration-300 w-full sm:w-auto overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative flex items-center justify-center space-x-2">
                <Presentation size={18} />
                <span>View Executive Proposal</span>
              </span>
            </button>
            <Link to="/dashboard" className="px-8 py-4 text-base font-semibold text-secondary hover:text-primary glass-card border border-border hover:border-accent/30 transition-all rounded-xl w-full sm:w-auto hover:bg-surface flex items-center justify-center space-x-2">
              <span>Enter Dashboard MVP</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Floating UI Elements ─── */}
      <section className="relative w-full max-w-6xl mx-auto h-[420px] hidden md:block mb-8">

        {/* Card 1 — Processed Items (top-left) */}
        <motion.div 
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[5%] top-[15%] z-20"
        >
          <div className="glass-card p-4 rounded-2xl flex items-center space-x-4 border border-white/5 shadow-2xl backdrop-blur-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 cursor-default">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Database size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Processed</p>
              <p className="text-xl font-bold text-primary">12,492</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 — Vision Agent Terminal (top-right) */}
        <motion.div 
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[3%] top-[5%] z-10"
        >
          <div className="glass-card p-5 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[230px] cursor-default">
            <div className="flex items-center space-x-2 mb-3">
              <Brain size={16} className="text-accent" />
              <p className="text-[10px] uppercase font-bold text-secondary tracking-wider">Vision Agent</p>
            </div>
            <div className="text-xs text-primary leading-relaxed font-mono bg-[#050810] p-3 rounded-xl border border-border space-y-1">
              <p className="text-secondary">&gt; Extracting claims...</p>
              <p className="text-success">✓ Immunity Support</p>
              <p className="text-success">✓ Melatonin 5mg</p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 — Category Match (mid-left) */}
        <motion.div 
          animate={{ y: [0, 14, 0], x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute left-[18%] bottom-[10%] z-20"
        >
          <div className="glass-card p-4 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 cursor-default">
            <div className="flex items-center space-x-2 mb-2">
              <Target size={14} className="text-amber-400" />
              <p className="text-[10px] uppercase font-bold text-secondary tracking-wider">Category Match</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-primary px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/25 text-purple-400">Sleep</span>
              <span className="text-[10px] text-success font-bold">98.2%</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4 — Revenue metric (mid-right) */}
        <motion.div 
          animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute right-[12%] bottom-[15%] z-20"
        >
          <div className="glass-card p-4 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-default">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 size={14} className="text-emerald-400" />
              <p className="text-[10px] uppercase font-bold text-secondary tracking-wider">Market Value</p>
            </div>
            <p className="text-2xl font-extrabold text-primary">$247M</p>
            <p className="text-[10px] text-success font-semibold mt-0.5">↑ 24.5% YoY</p>
          </div>
        </motion.div>

        {/* Card 5 — Ingredient Chip Cloud (center-top) */}
        <motion.div 
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute left-[38%] top-[2%] z-10"
        >
          <div className="glass-card p-3 rounded-xl border border-white/5 shadow-xl backdrop-blur-xl transform rotate-1 hover:rotate-0 transition-transform duration-500 cursor-default">
            <div className="flex items-center space-x-1.5 mb-2">
              <Layers size={12} className="text-indigo-400" />
              <p className="text-[9px] uppercase font-bold text-secondary tracking-wider">Top Ingredients</p>
            </div>
            <div className="flex flex-wrap gap-1.5 max-w-[180px]">
              {['Ashwagandha', 'Melatonin', 'Zinc', 'Elderberry', 'Biotin'].map(ing => (
                <span key={ing} className="text-[9px] font-semibold text-primary/70 px-2 py-0.5 rounded bg-muted border border-border">{ing}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 6 — Live Pipeline Status (bottom-center) */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute left-[42%] bottom-[0%] z-30"
        >
          <div className="glass-card px-5 py-3 rounded-full border border-white/5 shadow-xl backdrop-blur-xl cursor-default flex items-center space-x-3">
            <Activity size={14} className="text-accent" />
            <span className="text-[11px] font-semibold text-primary">Pipeline Processing</span>
            <span className="flex space-x-0.5">
              {[0, 1, 2].map(i => (
                <motion.span 
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
              ))}
            </span>
          </div>
        </motion.div>

        {/* Center glowing orb */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-500/15 to-purple-500/15 blur-2xl z-0"
        />
      </section>

      {/* ─── Stats Bar ─── */}
      <section id="stats" className="relative z-20 max-w-5xl mx-auto w-full px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="glass-card p-1 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: '12,492', label: 'Products Analyzed' },
              { value: '7', label: 'Market Segments' },
              { value: '$247M', label: 'Market Tracked' },
              { value: '0.8s', label: 'Avg Processing' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-6 px-6 text-center"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-xs text-secondary mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="relative z-30 max-w-6xl mx-auto px-6 pb-28">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Core Capabilities</p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary">How it works</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Brain size={24} className="text-indigo-400" />, title: 'Groq Vision Agent', desc: 'Instantly processes packaging OCR to extract hidden claims and key ingredients at lightning speed.', step: '01' },
            { icon: <TrendingUp size={24} className="text-emerald-400" />, title: 'Market Matching', desc: 'Categorizes products against the latest industry taxonomy autonomously without human input.', step: '02' },
            { icon: <ShieldCheck size={24} className="text-amber-400" />, title: 'Insight Engine', desc: 'Aggregates trends across your entire product database — growth vectors, emerging ingredients, gaps.', step: '03' }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 text-left border border-white/5 hover:border-accent/30 transition-all duration-300 group relative overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  {feature.icon}
                </div>
                <span className="text-3xl font-black text-border group-hover:text-accent/20 transition-colors">{feature.step}</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{feature.title}</h3>
              <p className="text-sm text-secondary leading-relaxed relative z-10">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass-card p-12 md:p-16 rounded-3xl border border-accent/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 relative z-10">Ready to see it in action?</h3>
          <p className="text-secondary text-lg mb-8 max-w-lg mx-auto relative z-10">
            Upload a product image and watch the AI pipeline extract actionable market intelligence in seconds.
          </p>
          <Link to="/dashboard" className="group relative inline-flex px-10 py-4 bg-accent text-white rounded-xl font-bold text-lg shadow-glow-accent hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.6)] transition-all duration-300 overflow-hidden z-10">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 py-8 text-center text-secondary border-t border-border bg-surface/50">
        <p className="text-xs font-medium">© 2026 Trend AI Intelligence — Investor Demo Platform</p>
      </footer>
      
      {/* Presentation Viewer Overlay */}
      <AnimatePresence>
        {isViewerOpen && <PresentationViewer onClose={() => setIsViewerOpen(false)} />}
      </AnimatePresence>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
