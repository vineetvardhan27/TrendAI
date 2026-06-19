import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProduct } from '../services/api';
import { UploadCloud, Terminal, CheckCircle2, Zap, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  "Initializing Groq Vision Agent...",
  "Running OCR on packaging label...",
  "Extracting hero ingredients...",
  "Parsing health & marketing claims...",
  "Invoking Market Matching Agent...",
  "Cross-referencing category taxonomy...",
  "Generating market positioning...",
  "Finalizing JSON payload...",
];

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [brandName, setBrandName] = useState('');
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  useEffect(() => {
    if (loading && stepIndex < STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex(i => i + 1), Math.random() * 1000 + 700);
      return () => clearTimeout(t);
    }
  }, [loading, stepIndex]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setStepIndex(0);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('brandName', brandName);
    formData.append('productName', productName);
    try {
      const response = await uploadProduct(formData);
      setTimeout(() => navigate(`/product/${response.productId}`), 1200);
    } catch {
      alert('Upload failed.');
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-full flex items-center justify-center">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Data Ingestion</h1>
          <p className="text-secondary mt-2 text-sm">Upload product packaging to trigger the Dual-Agent AI pipeline.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card p-7 relative overflow-hidden"
        >
          {/* AI Terminal Overlay */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-8 rounded-2xl"
              >
                <div className="w-full max-w-md">
                  <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
                    {/* Terminal Header */}
                    <div className="bg-surface border-b border-border px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                        </div>
                        <span className="text-[11px] font-mono text-secondary ml-2">groq-pipeline.sh</span>
                      </div>
                      <Terminal size={13} className="text-secondary" />
                    </div>
                    {/* Terminal Body */}
                    <div className="bg-[#050810] p-5 font-mono text-sm space-y-2.5 min-h-[200px]">
                      {STEPS.slice(0, stepIndex + 1).map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          className="flex items-center space-x-2.5">
                          {i === stepIndex
                            ? <Loader2 size={13} className="animate-spin text-accent flex-shrink-0" />
                            : <CheckCircle2 size={13} className="text-success flex-shrink-0" />}
                          <span className={i === stepIndex ? 'text-accent' : 'text-success/80'}>{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-xs text-secondary mt-4 animate-pulse">
                    Processing your product... this may take a moment.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {/* Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Brand Name</label>
                <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)}
                  className="input-dark" placeholder="e.g. OLLY" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Product Name</label>
                <input type="text" value={productName} onChange={e => setProductName(e.target.value)}
                  className="input-dark" placeholder="e.g. Sleep Gummies" />
              </div>
            </div>

            {/* Drop zone */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Packaging Image</label>
              <div
                onDragOver={e => e.preventDefault()} onDrop={handleDrop}
                className={`rounded-2xl border-2 border-dashed p-10 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer
                  ${file ? 'border-accent/50 bg-accent/5' : 'border-border hover:border-accent/40 hover:bg-muted/50'}`}
              >
                {file && preview ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center">
                    <div className="w-28 h-28 rounded-xl overflow-hidden mb-4 border border-border shadow-lg">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-semibold text-primary">{file.name}</p>
                    <p className="text-xs text-secondary mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button type="button" onClick={() => setFile(null)}
                      className="mt-4 text-xs text-danger/70 hover:text-danger font-semibold transition-colors px-3 py-1.5 rounded-lg bg-danger/10 border border-danger/20">
                      Remove
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <UploadCloud className="text-accent" size={28} />
                    </div>
                    <p className="font-semibold text-primary">Drag & Drop image here</p>
                    <p className="text-xs text-secondary mt-1.5 mb-5">JPG, PNG up to 5MB</p>
                    <label className="cursor-pointer text-sm font-semibold px-5 py-2.5 rounded-xl border border-border text-secondary hover:text-primary hover:border-accent/50 transition-all">
                      Browse Files
                      <input type="file" className="hidden" accept="image/*"
                        onChange={e => e.target.files && setFile(e.target.files[0])} />
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2 border-t border-border">
              <button type="submit" disabled={!file || loading} className="btn-primary flex items-center space-x-2 px-7 py-3">
                <Zap size={16} />
                <span>Run AI Analysis</span>
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Upload;
