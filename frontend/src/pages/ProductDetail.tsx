import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getImageUrl, deleteProduct } from '../services/api';
import type { Product } from '../types';
import { Loader2, ArrowLeft, CheckCircle2, Tag, Target, ShieldCheck, Brain, Percent, Trash2 } from 'lucide-react';
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

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const fetchDetail = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
        if (data.aiInsights?.processingStatus !== 'Pending' && data.aiInsights?.processingStatus !== 'Processing') {
          clearInterval(interval);
          setLoading(false);
        }
      } catch {
        clearInterval(interval);
        setLoading(false);
      }
    };
    fetchDetail();
    interval = setInterval(fetchDetail, 1500);
    return () => clearInterval(interval);
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");
    if (confirmDelete) {
      try {
        setIsDeleting(true);
        await deleteProduct(id);
        navigate('/explorer');
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product. Please try again.");
        setIsDeleting(false);
      }
    }
  };

  if (!product && loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={36} />
      </div>
    );
  }
  if (!product) return <div className="p-8 text-center text-danger/80">Product not found</div>;

  const isProcessing = product.aiInsights?.processingStatus === 'Pending' || product.aiInsights?.processingStatus === 'Processing';
  const catColor = CATEGORY_COLORS[product.category] || '#6366f1';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-7xl mx-auto space-y-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/explorer"
            className="flex items-center space-x-1.5 text-secondary hover:text-primary text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> <span>Back</span>
          </Link>
          <div className="w-px h-5 bg-border" />
          <div>
            <h1 className="text-2xl font-bold text-primary">{product.productName}</h1>
            <p className="text-secondary text-sm mt-0.5">{product.brandName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isProcessing ? (
            <span className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-warning/10 text-warning border border-warning/20">
              <Loader2 className="animate-spin" size={13} />
              <span>Analyzing...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-success/10 text-success border border-success/20">
              <CheckCircle2 size={13} />
              <span>Analysis Complete</span>
            </span>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-danger/10 text-danger border border-danger/20 hover:bg-danger hover:text-white transition-colors disabled:opacity-50"
            title="Delete Product"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={13} /> : <Trash2 size={13} />}
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Image */}
        <div className="glass-card overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-border flex items-center space-x-2">
            <ShieldCheck size={16} className="text-accent" />
            <div>
              <p className="text-sm font-semibold text-primary">Ground Truth Source</p>
              <p className="text-xs text-secondary">Raw image fed to Vision Agent</p>
            </div>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center bg-gradient-to-b from-background to-surface min-h-[380px]">
            <img
              src={getImageUrl(product.imageUrl)}
              alt="Packaging"
              className="max-w-full max-h-[380px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Right: AI Insights */}
        <div className="flex flex-col space-y-4">

          {/* Category & Score */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary mb-2">Market Category</p>
              <p className="text-xl font-bold" style={{ color: catColor }}>{product.category}</p>
              {product.aiInsights?.classificationConfidence && (
                <p className="text-xs text-secondary mt-1">Confidence: {product.aiInsights.classificationConfidence}</p>
              )}
            </div>
            <div className="glass-card p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary mb-2">Vision Score</p>
              <div className="flex items-end space-x-1">
                <p className="text-3xl font-bold text-primary">{product.aiInsights?.confidenceScore ?? '—'}</p>
                <p className="text-secondary text-sm mb-0.5">/100</p>
              </div>
            </div>
          </div>

          {/* Classification Reasoning */}
          {product.aiInsights?.classificationReasoning && (
            <div className="glass-card p-5">
              <div className="flex items-center space-x-2 mb-3">
                <Brain size={15} className="text-accent" />
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Agent Reasoning</p>
              </div>
              <p className="text-sm text-primary/80 leading-relaxed">
                {product.aiInsights.classificationReasoning}
              </p>
            </div>
          )}

          {/* Positioning */}
          {product.aiInsights?.positioning && (
            <div className="glass-card p-5">
              <div className="flex items-center space-x-2 mb-3">
                <Target size={15} className="text-accent" />
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Market Positioning</p>
              </div>
              <p className="text-sm font-semibold text-primary italic border-l-2 pl-3" style={{ borderColor: catColor }}>
                "{product.aiInsights.positioning}"
              </p>
            </div>
          )}

          {/* Ingredients */}
          {product.aiInsights?.heroIngredients && product.aiInsights.heroIngredients.length > 0 && (
            <div className="glass-card p-5">
              <div className="flex items-center space-x-2 mb-3">
                <Tag size={15} className="text-accent" />
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Hero Ingredients</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.aiInsights.heroIngredients.map((ing, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted border border-border text-primary">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Claims */}
          {product.aiInsights?.claims && product.aiInsights.claims.length > 0 && (
            <div className="glass-card p-5">
              <div className="flex items-center space-x-2 mb-3">
                <Percent size={15} className="text-success" />
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Extracted Claims</p>
              </div>
              <ul className="space-y-2">
                {product.aiInsights.claims.map((claim, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm text-primary/80">
                    <CheckCircle2 size={14} className="text-success flex-shrink-0 mt-0.5" />
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isProcessing && (
            <div className="glass-card p-8 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-accent mb-3" size={32} />
              <p className="font-semibold text-primary">AI is analyzing this product...</p>
              <p className="text-sm text-secondary mt-1">This page will update automatically.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
