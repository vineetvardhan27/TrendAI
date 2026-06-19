import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getImageUrl } from '../services/api';
import type { Product } from '../types';
import { Search, Loader2, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_COLORS: Record<string, string> = {
  'Sleep': '#8b5cf6',
  'Immunity': '#10b981',
  'Energy': '#f59e0b',
  'Digestive Health': '#3b82f6',
  'Beauty': '#ec4899',
  'Cognitive Health': '#6366f1',
  'Weight Management': '#ef4444',
};

const ProductExplorer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.brandName?.toLowerCase().includes(search.toLowerCase()) ||
                          p.productName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 space-y-6 min-h-full">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-primary">Product Explorer</h1>
        <p className="text-secondary text-sm mt-1">Search, filter, and drill into AI-processed market data.</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={16} />
          <input
            type="text"
            placeholder="Search brands or products..."
            className="input-dark pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative sm:w-52">
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={16} />
          <select
            className="input-dark pl-10 appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </motion.div>

      {/* Results count */}
      <div className="text-xs text-secondary font-medium">
        Showing <span className="text-accent font-bold">{filteredProducts.length}</span> of {products.length} products
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-accent" size={32} />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-widest">
                <th className="px-5 py-4 font-semibold text-secondary">Product</th>
                <th className="px-5 py-4 font-semibold text-secondary">Category</th>
                <th className="px-5 py-4 font-semibold text-secondary">Status</th>
                <th className="px-5 py-4 font-semibold text-secondary">Hero Ingredients</th>
                <th className="px-5 py-4 font-semibold text-secondary text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, i) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="border-b border-border/50 hover:bg-muted cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0 group-hover:border-accent/30 transition-colors">
                        <img
                          src={getImageUrl(product.imageUrl)}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                          onError={(e: any) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-primary text-sm">{product.productName}</div>
                        <div className="text-xs text-secondary">{product.brandName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{
                        color: CATEGORY_COLORS[product.category] || '#6366f1',
                        background: `${CATEGORY_COLORS[product.category] || '#6366f1'}18`,
                        border: `1px solid ${CATEGORY_COLORS[product.category] || '#6366f1'}35`,
                      }}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {product.aiInsights?.processingStatus === 'Completed' ? (
                      <span className="badge bg-success/10 text-success border border-success/20">
                        <CheckCircle2 size={11} className="mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="badge bg-warning/10 text-warning border border-warning/20">
                        <Loader2 size={11} className="mr-1 animate-spin" /> {product.aiInsights?.processingStatus || 'Pending'}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.aiInsights?.heroIngredients?.slice(0, 3).map((ing, idx) => (
                        <span key={idx} className="text-[10px] bg-muted border border-border text-secondary px-2 py-0.5 rounded font-medium">
                          {ing}
                        </span>
                      ))}
                      {(product.aiInsights?.heroIngredients?.length || 0) > 3 && (
                        <span className="text-[10px] bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded font-medium">
                          +{(product.aiInsights?.heroIngredients?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {product.revenue ? (
                      <span className="text-sm font-bold text-success">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(product.revenue)}
                      </span>
                    ) : (
                      <span className="text-xs text-secondary">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-16 text-center">
                    <p className="text-secondary text-sm">No products match your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ProductExplorer;
