import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Clock, Target, Database, Brain,
  Search, ShieldCheck, FileText, CheckCircle2, TrendingUp,
  Zap, Users, Handshake, MessageCircle, BarChart3
} from 'lucide-react';

/* ── animation helpers ── */
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (d: number) => ({ x: d < 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
};
const transition: any = { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] };

const stagger: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp: any = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ── reusable bits ── */
const SectionTag = ({ children }: { children: string }) => (
  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-400 mb-4">{children}</p>
);
const SlideTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">{children}</motion.h2>
);

/* ═══════════════════════════════════════════════════════
   SLIDES
   ═══════════════════════════════════════════════════════ */

const Slide1 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center justify-center h-full text-center">
    <motion.div variants={fadeUp} className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-8">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse" />
      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.25em]">Executive Proposal · Confidential</span>
    </motion.div>
    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
      Turn Your AI<br />into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">ROI</span>
    </motion.h1>
    <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mt-8 font-medium">
      Market Intelligence Transformation — transitioning from static analysis to automated, AI-driven strategic advantage.
    </motion.p>
    <motion.div variants={fadeUp} className="mt-12 flex items-center space-x-6 text-white/30 text-xs font-medium">
      <span>Health & Wellness Supplements</span>
      <span className="w-1 h-1 rounded-full bg-white/20" />
      <span>Phase 1 Proposal</span>
      <span className="w-1 h-1 rounded-full bg-white/20" />
      <span>2026</span>
    </motion.div>
  </motion.div>
);

const Slide2 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center">
    <SectionTag>Overview</SectionTag>
    <SlideTitle>Executive Summary</SlideTitle>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Challenge */}
      <motion.div variants={fadeUp} className="glass-card p-7 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500/80 via-red-400/40 to-transparent" />
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
          <Clock size={18} className="text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">The Challenge</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5">
          Highly manual, fragmented workflow consuming senior bandwidth on data aggregation.
        </p>
        <div className="pt-4 border-t border-white/5">
          <p className="text-3xl font-black text-red-400 tabular-nums">1,000 hrs</p>
          <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold mt-1">Lost Annually</p>
        </div>
      </motion.div>

      {/* Solution */}
      <motion.div variants={fadeUp} className="glass-card p-7 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400/80 via-cyan-400/40 to-transparent" />
        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-5">
          <Brain size={18} className="text-cyan-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">The Solution</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5">
          An AI Market Trend Assistant using dual-agent architecture to extract, categorize, and synthesize product data.
        </p>
        <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
          {['Vision AI', 'Market Match', 'Insight Engine'].map(t => (
            <span key={t} className="text-[9px] font-bold text-cyan-400/70 px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/15 uppercase tracking-wider">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Outcomes */}
      <motion.div variants={fadeUp} className="glass-card p-7 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-400/80 via-emerald-400/40 to-transparent" />
        <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-5">
          <TrendingUp size={18} className="text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Key Outcomes</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5">
          Near-instantaneous analysis, live queryable market intelligence, and expert time reclaimed.
        </p>
        <div className="pt-4 border-t border-white/5 space-y-2">
          {['100% aggregation eliminated', 'Live dashboard access', 'Full audit trail'].map(o => (
            <div key={o} className="flex items-center space-x-2">
              <CheckCircle2 size={12} className="text-emerald-400/70 flex-shrink-0" />
              <span className="text-xs text-white/50">{o}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const Slide3 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center items-center text-center">
    <SectionTag>Problem</SectionTag>
    <SlideTitle>The Cost of Manual Intelligence</SlideTitle>
    <motion.div variants={fadeUp} className="flex items-center space-x-10 md:space-x-16 mb-14">
      <div>
        <p className="text-6xl md:text-7xl font-black text-red-400 tabular-nums">200</p>
        <p className="text-xs uppercase tracking-[0.15em] text-white/40 font-semibold mt-2">Hours / Analysis</p>
      </div>
      <div className="w-px h-20 bg-white/10" />
      <div>
        <p className="text-6xl md:text-7xl font-black text-red-400 tabular-nums">1,000</p>
        <p className="text-xs uppercase tracking-[0.15em] text-white/40 font-semibold mt-2">Hours Lost / Year</p>
      </div>
    </motion.div>
    <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full text-left">
      {[
        { icon: <Clock size={20} />, title: 'Operational Bottlenecks', desc: 'Data decays faster than it can be compiled, leading to outdated insights.' },
        { icon: <Target size={20} />, title: 'Missed Opportunities', desc: 'Inability to track niche or emerging players due to bandwidth constraints.' },
        { icon: <Brain size={20} />, title: 'Misallocated Expertise', desc: 'Senior experts forced into data entry rather than strategic interpretation.' },
      ].map(c => (
        <div key={c.title} className="glass-card p-5">
          <div className="text-red-400/70 mb-3">{c.icon}</div>
          <h4 className="font-bold text-white text-sm mb-1.5">{c.title}</h4>
          <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </motion.div>
  </motion.div>
);

const Slide4 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center">
    <SectionTag>Opportunity</SectionTag>
    <SlideTitle>Strategic Transformation</SlideTitle>
    <motion.div variants={fadeUp} className="space-y-5 max-w-4xl mx-auto w-full">
      {[
        { from: 'Static Spreadsheets', to: 'Live Intelligence Dashboard', icon: <Database size={18} className="text-cyan-400" /> },
        { from: 'Fragmented Sources', to: 'Centralized Knowledge Graph', icon: <Search size={18} className="text-cyan-400" /> },
        { from: 'High-Revenue Focus Only', to: 'Comprehensive Market Coverage', icon: <BarChart3 size={18} className="text-cyan-400" /> },
      ].map((item, i) => (
        <div key={i} className="flex items-center glass-card p-5">
          <div className="flex-1 text-right pr-6">
            <p className="text-base font-medium text-white/30 line-through">{item.from}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
          <div className="flex-1 text-left pl-6">
            <p className="text-base font-bold text-white">{item.to}</p>
          </div>
        </div>
      ))}
    </motion.div>
  </motion.div>
);

const Slide5 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center">
    <SectionTag>Vision</SectionTag>
    <SlideTitle>Future State</SlideTitle>
    <div className="flex flex-col md:flex-row gap-8 items-stretch">
      <motion.div variants={fadeUp} className="flex-1 space-y-4">
        {[
          { t: 'Centralized Intelligence', d: 'Single source of truth for all market data across segments.' },
          { t: 'Conversational Querying', d: 'Ask natural language questions to uncover trends instantly.' },
          { t: 'Dynamic Refresh', d: 'Continuous data ingestion to prevent analytical decay.' },
          { t: 'Traceability & Trust', d: 'Direct links from every AI insight back to the source packaging.' },
        ].map(c => (
          <div key={c.t} className="glass-card p-4 border-l-2 border-l-cyan-400/60">
            <h4 className="font-bold text-white text-sm">{c.t}</h4>
            <p className="text-xs text-white/50 mt-1 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </motion.div>
      <motion.div variants={fadeUp} className="flex-1 relative min-h-[280px]">
        <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#070b14] overflow-hidden shadow-2xl">
          <div className="p-4 space-y-3 h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="w-20 h-3 bg-white/5 rounded" />
            </div>
            <div className="flex-1 relative rounded-lg overflow-hidden border border-white/5 bg-background">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-40 pointer-events-none" />
              <iframe 
                src="/dashboard" 
                className="absolute top-0 left-0 border-none pointer-events-none origin-top-left"
                style={{ width: '200%', height: '200%', transform: 'scale(0.5)' }}
                title="Dashboard Preview"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-60" />
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const Slide6 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center text-center">
    <SectionTag>Approach</SectionTag>
    <SlideTitle>Phased Delivery</SlideTitle>
    <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-stretch justify-center gap-3 max-w-5xl mx-auto w-full">
      {[
        { phase: 'Phase 1', title: 'Replication', desc: 'Automate the current manual workflow precisely to establish a validated baseline.', accent: 'text-white/40', bar: 'from-transparent via-white/20 to-transparent' },
        { phase: 'Phase 2', title: 'Validation', desc: 'Rigorous human-in-the-loop prototype testing to tune the AI weighting logic.', accent: 'text-cyan-400', bar: 'from-transparent via-cyan-400/60 to-transparent' },
        { phase: 'Phase 3', title: 'Integration', desc: 'Deploy interactive dashboards and dynamic insight engines to the team.', accent: 'text-indigo-400', bar: 'from-transparent via-indigo-400/60 to-transparent' },
      ].map((p, i) => (
        <React.Fragment key={p.phase}>
          {i > 0 && <div className="hidden md:flex items-center text-white/15"><ChevronRight size={20} /></div>}
          <div className="flex-1 glass-card p-7 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${p.bar}`} />
            <p className={`text-[10px] uppercase tracking-[0.2em] ${p.accent} font-bold mb-3`}>{p.phase}</p>
            <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
            <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
          </div>
        </React.Fragment>
      ))}
    </motion.div>
  </motion.div>
);

const Slide7 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center items-center">
    <SectionTag>Architecture</SectionTag>
    <SlideTitle>Modular Agent System</SlideTitle>
    <motion.div variants={fadeUp} className="max-w-4xl w-full">
      <div className="glass-card p-5 border border-cyan-400/20 bg-cyan-400/5 text-center mb-6">
        <Brain className="mx-auto text-cyan-400 mb-2" size={28} />
        <h3 className="text-lg font-bold text-white">Orchestrator Agent</h3>
        <p className="text-xs text-white/50 mt-1">Interprets prompts and coordinates downstream agents</p>
      </div>
      {/* Connector lines */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-[calc(25%-24px)]">
          {[0,1,2,3].map(i => <div key={i} className="w-px h-6 bg-white/10" />)}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <FileText size={20} />, title: 'Product Claims', sub: 'OCR & Vision Extraction' },
          { icon: <CheckCircle2 size={20} />, title: 'Hero Ingredient', sub: 'Active Compound ID' },
          { icon: <TrendingUp size={20} />, title: 'Revenue Attrib.', sub: 'Financial Allocation' },
          { icon: <Target size={20} />, title: 'Market Matching', sub: 'Benefit Categorization' },
        ].map(a => (
          <div key={a.title} className="glass-card p-5 text-center">
            <div className="text-cyan-400/70 mx-auto mb-2 flex justify-center">{a.icon}</div>
            <h4 className="font-bold text-xs text-white">{a.title}</h4>
            <p className="text-[10px] text-white/40 mt-1">{a.sub}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Slide8 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center items-center text-center">
    <SectionTag>Impact</SectionTag>
    <SlideTitle>Value & ROI</SlideTitle>
    <motion.div variants={fadeUp} className="glass-card p-10 border border-emerald-400/20 bg-emerald-400/5 rounded-2xl mb-12 max-w-2xl w-full">
      <p className="text-sm text-white/40 font-medium mb-3 uppercase tracking-wider">Targeted Outcome</p>
      <h3 className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight">100% Elimination</h3>
      <p className="text-base text-white/70 mt-3 font-medium">of manual data aggregation tasks.</p>
    </motion.div>
    <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-left">
      {[
        { n: '01', title: 'Time Reclaimed', desc: '~1,000 hours shifted from data entry to strategic interpretation.' },
        { n: '02', title: 'Market Agility', desc: 'Faster identification of emerging trends and opportunity gaps.' },
        { n: '03', title: 'Total Visibility', desc: 'Comprehensive coverage extending beyond high-revenue products.' },
      ].map(c => (
        <div key={c.n}>
          <span className="text-xs font-mono font-bold text-cyan-400/60">{c.n}</span>
          <h4 className="font-bold text-white text-sm mt-1 mb-1.5">{c.title}</h4>
          <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </motion.div>
  </motion.div>
);

const Slide9 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center">
    <SectionTag>Timeline</SectionTag>
    <SlideTitle>Project Roadmap</SlideTitle>
    <motion.div variants={fadeUp} className="max-w-5xl mx-auto w-full relative">
      {/* Timeline line */}
      <div className="absolute top-5 left-0 right-0 h-px bg-white/10 hidden md:block" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { time: 'Weeks 0–2', title: 'Discovery', desc: 'Data access, taxonomy mapping, pipeline definition and scoping.', active: false },
          { time: 'Weeks 3–5', title: 'Build', desc: 'Agent construction, prompt engineering, and MVP dashboard UI.', active: true },
          { time: 'Weeks 6–7', title: 'Integrate', desc: 'Validation testing, UI refinement, human-in-the-loop tuning.', active: false },
          { time: 'Week 8', title: 'Go-Live', desc: 'Final delivery, team training, and operational hand-off.', active: false },
        ].map((p, i) => (
          <div key={i} className="relative">
            <div className={`w-3 h-3 rounded-full absolute -top-[1px] left-6 md:left-1/2 md:-translate-x-1/2 hidden md:block border-2 border-[#03050a] ${p.active ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]' : 'bg-white/20'}`} />
            <div className="glass-card p-5 mt-6">
              <p className={`text-[10px] uppercase font-bold tracking-[0.15em] mb-1.5 ${p.active ? 'text-cyan-400' : 'text-white/30'}`}>{p.time}</p>
              <h4 className="text-base font-bold text-white mb-1.5">{p.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Slide10 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center items-center text-center">
    <SectionTag>Trust</SectionTag>
    <SlideTitle>Governance Framework</SlideTitle>
    <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
      {[
        { icon: <ShieldCheck size={28} />, title: 'Manual Category Control', desc: 'Top-level benefit categories remain strictly under manual governance by your domain experts.' },
        { icon: <Database size={28} />, title: 'Complete Auditability', desc: 'Every AI categorization maintains a direct traceable link back to the source packaging data.' },
        { icon: <CheckCircle2 size={28} />, title: 'Expert Overrides', desc: 'Built-in human-in-the-loop interfaces to correct, validate, or tune agent outputs at any time.' },
      ].map(c => (
        <div key={c.title} className="glass-card p-7 text-center">
          <div className="text-cyan-400/70 mx-auto mb-4 flex justify-center">{c.icon}</div>
          <h4 className="font-bold text-white text-base mb-2">{c.title}</h4>
          <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </motion.div>
  </motion.div>
);

const Slide11 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center">
    <SectionTag>Team</SectionTag>
    <SlideTitle>Delivery Team</SlideTitle>
    <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto w-full">
      {[
        { icon: <Handshake size={22} />, role: 'Engagement Partner', desc: 'Strategic alignment and delivery oversight across workstreams.' },
        { icon: <Database size={22} />, role: 'Data Engineer', desc: 'Web scraping, database schema design, and infrastructure.' },
        { icon: <Brain size={22} />, role: 'AI/ML Architect', desc: 'Agent orchestration, prompt engineering, and model tuning.' },
        { icon: <Users size={22} />, role: 'Product Manager', desc: 'UI/UX design, stakeholder coordination, and QA.' },
      ].map(m => (
        <div key={m.role} className="glass-card p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 mx-auto mb-4 flex items-center justify-center text-cyan-400/60">
            {m.icon}
          </div>
          <h4 className="font-bold text-white text-sm mb-1.5">{m.role}</h4>
          <p className="text-[10px] text-white/40 leading-relaxed">{m.desc}</p>
        </div>
      ))}
    </motion.div>
  </motion.div>
);

const Slide12 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col justify-center items-center text-center">
    <SectionTag>Investment</SectionTag>
    <SlideTitle>Engagement Model</SlideTitle>
    <motion.div variants={fadeUp} className="glass-card p-10 border border-white/10 max-w-2xl w-full bg-gradient-to-b from-white/[0.02] to-transparent mb-10">
      <h3 className="text-xl font-bold text-white mb-1">Phase 1 · Fixed-Fee Delivery</h3>
      <p className="text-sm text-white/40 mb-6">Discovery through Go-Live (8 weeks)</p>
      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        Custom Quote
      </div>
    </motion.div>
    <motion.div variants={fadeUp}>
      <p className="text-xs text-white/30 uppercase tracking-[0.15em] font-bold mb-4">Engagement Checkpoints</p>
      <div className="flex flex-wrap justify-center gap-3">
        {['Data Access Clearance', 'Resource Allocation', 'Project Kickoff'].map((c, i) => (
          <span key={c} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 font-medium">
            {i + 1}. {c}
          </span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Slide13 = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center justify-center h-full text-center">
    <motion.div variants={fadeUp}>
      <MessageCircle size={40} className="text-cyan-400/40 mx-auto mb-6" />
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Questions?</motion.h2>
    <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-xl leading-relaxed">
      A <strong className="text-cyan-400 font-semibold">Human-AI Partnership</strong> for Market Leadership.
    </motion.p>
    <motion.div variants={fadeUp} className="mt-12 flex items-center space-x-6 text-white/20 text-xs font-medium">
      <span>Confidential</span>
      <span className="w-1 h-1 rounded-full bg-white/15" />
      <span>AI Market Trend Assistant</span>
      <span className="w-1 h-1 rounded-full bg-white/15" />
      <span>2026</span>
    </motion.div>
  </motion.div>
);

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13];
const SLIDE_LABELS = ['Title','Summary','Problem','Opportunity','Vision','Approach','Architecture','ROI','Roadmap','Governance','Team','Investment','Q&A'];

/* ═══════════════════════════════════════════════════════
   VIEWER
   ═══════════════════════════════════════════════════════ */

interface Props { onClose: () => void; }

const PresentationViewer: React.FC<Props> = ({ onClose }) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((d: number) => {
    setPage(prev => {
      const next = prev + d;
      if (next < 0 || next >= SLIDES.length) return prev;
      setDirection(d);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); paginate(1); }
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paginate, onClose]);

  const CurrentSlide = SLIDES[page];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-[#03050a] text-white flex flex-col font-sans select-none"
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 relative z-10 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Zap size={16} className="text-cyan-400" />
          <span className="text-xs font-bold tracking-tight text-white/70">Executive Proposal</span>
        </div>
        <div className="flex items-center space-x-5">
          <span className="text-[11px] font-mono text-white/30 tabular-nums">{String(page + 1).padStart(2, '0')} / {SLIDES.length}</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── Slide Area ── */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 p-8 md:px-20 md:py-12"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom Controls ── */}
      <div className="flex-shrink-0 border-t border-white/5 px-6 py-3 flex items-center justify-between relative z-10">
        {/* Dot nav */}
        <div className="flex items-center space-x-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
              title={SLIDE_LABELS[i]}
              className={`transition-all duration-300 rounded-full ${i === page ? 'w-6 h-1.5 bg-cyan-400' : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'}`}
            />
          ))}
        </div>

        {/* Slide label */}
        <span className="text-[10px] text-white/25 uppercase tracking-[0.15em] font-bold hidden md:block">{SLIDE_LABELS[page]}</span>

        {/* Arrows */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className="p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={page === SLIDES.length - 1}
            className="p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="h-[2px] bg-white/5 w-full flex-shrink-0">
        <motion.div
          className="h-full bg-cyan-400/60"
          animate={{ width: `${((page + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

export default PresentationViewer;
