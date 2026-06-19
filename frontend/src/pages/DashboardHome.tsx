import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import type { Product } from '../types';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';
import { DollarSign, Database, Layers, TrendingUp, ArrowUpRight } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#3b82f6'];

const CATEGORY_COLORS: Record<string, string> = {
  'Sleep': '#8b5cf6',
  'Immunity': '#10b981',
  'Energy': '#f59e0b',
  'Digestive Health': '#3b82f6',
  'Beauty': '#ec4899',
  'Cognitive Health': '#6366f1',
  'Weight Management': '#ef4444',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } })
};

const DashboardHome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const completed = products.filter(p => p.aiInsights?.processingStatus === 'Completed');

  const totalRevenue = completed.reduce((sum, p) => sum + (p.revenue || 0), 0);
  const fmtRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(totalRevenue);

  const catMap: Record<string, number> = {};
  const revMap: Record<string, number> = {};
  completed.forEach(p => {
    catMap[p.category] = (catMap[p.category] || 0) + 1;
    revMap[p.category] = (revMap[p.category] || 0) + (p.revenue || 0);
  });

  const categoryData = Object.entries(catMap).map(([name, value]) => ({ name, value })).sort((a,b)=>b.value-a.value);
  const revenueData = Object.entries(revMap).map(([name, value]) => ({ name, value })).sort((a,b)=>b.value-a.value);
  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()).slice(0, 5);

  const stats = [
    { label: 'Total Market Size', value: loading ? '...' : fmtRevenue, icon: <DollarSign size={20}/>, color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
    { label: 'Products Analyzed', value: loading ? '...' : completed.length, icon: <Database size={20}/>, color: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
    { label: 'Market Segments', value: loading ? '...' : Object.keys(catMap).length, icon: <Layers size={20}/>, color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
    { label: 'YoY Growth', value: '+24.5%', icon: <TrendingUp size={20}/>, color: '#ec4899', glow: 'rgba(236,72,153,0.3)' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-xl px-4 py-3 text-sm shadow-xl">
          <p className="text-secondary font-medium mb-1">{label}</p>
          <p className="text-primary font-bold">
            {typeof payload[0].value === 'number' && payload[0].value > 1000
              ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(payload[0].value)
              : payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 space-y-8 min-h-full">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-secondary text-sm font-medium mb-1">Good afternoon 👋</p>
            <h1 className="text-3xl font-bold text-primary">Market Overview</h1>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 glass-card text-sm">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-secondary font-medium">AI Pipeline Active</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} custom={i} variants={fadeUp} initial="hidden" animate="show">
            <div className="glass-card p-5 group hover:border-white/10 transition-all duration-300 cursor-default relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top left, ${s.glow} 0%, transparent 70%)` }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl" style={{ background: `${s.glow}` }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-secondary mt-1 font-medium">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Revenue by Category - wider */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-3 glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-primary">Revenue by Category</h2>
              <p className="text-xs text-secondary mt-0.5">Estimated market value (USD)</p>
            </div>
          </div>
          <div className="flex-1 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#1e2a3a" />
                <XAxis
                  type="number"
                  tickFormatter={val => `$${(val / 1000000).toFixed(1)}M`}
                  stroke="#334155"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#334155"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={110}
                />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={20}>
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut chart */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="font-bold text-primary">Category Split</h2>
            <p className="text-xs text-secondary mt-0.5">Product count distribution</p>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {categoryData.slice(0, 6).map((c, i) => (
              <div key={c.name} className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CATEGORY_COLORS[c.name] || COLORS[i % COLORS.length] }} />
                <span className="text-[10px] text-secondary truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Products */}
      <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-primary">Recently Processed</h2>
            <p className="text-xs text-secondary mt-0.5">Latest products through the AI pipeline</p>
          </div>
        </div>
        <div className="space-y-2">
          {recentProducts.map((p, i) => (
            <div key={p._id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${COLORS[i % COLORS.length]}, ${COLORS[(i + 1) % COLORS.length]})` }}>
                  {(p.brandName || p.productName || '?')[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">{p.productName}</p>
                  <p className="text-xs text-secondary">{p.brandName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                  style={{
                    color: CATEGORY_COLORS[p.category] || '#6366f1',
                    borderColor: `${CATEGORY_COLORS[p.category] || '#6366f1'}40`,
                    background: `${CATEGORY_COLORS[p.category] || '#6366f1'}15`,
                  }}>
                  {p.category}
                </span>
                <span className={`text-[10px] font-semibold badge ${
                  p.aiInsights?.processingStatus === 'Completed'
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-warning/10 text-warning border border-warning/20'
                }`}>
                  {p.aiInsights?.processingStatus || 'Pending'}
                </span>
              </div>
            </div>
          ))}
          {recentProducts.length === 0 && (
            <p className="text-center text-secondary text-sm py-8">No products yet. Upload your first product!</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
