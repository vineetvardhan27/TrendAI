import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Compass, UploadCloud, MessageSquare, Zap, Sparkles } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Products', path: '/explorer', icon: <Compass size={18} /> },
    { name: 'Ingest Data', path: '/upload', icon: <UploadCloud size={18} /> },
    { name: 'AI Chat', path: '/chat', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
        />
      </div>

      {/* Sidebar */}
      <div className="relative w-60 flex-shrink-0 bg-surface border-r border-border flex flex-col z-20">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-primary tracking-tight">Trend AI</h1>
              <p className="text-[10px] text-secondary">Market Intelligence</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 pt-4">
          <p className="text-[10px] font-semibold text-secondary uppercase tracking-widest px-3 mb-3">Workspace</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/explorer' && location.pathname.startsWith('/product'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <span className={isActive ? 'text-accent' : ''}>{item.icon}</span>
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Status Indicator */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-muted border border-border">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles size={16} className="text-accent" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full border border-surface" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-primary">Groq AI</p>
              <p className="text-[10px] text-secondary">Pipeline Active</p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center space-x-3 px-2 py-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
              PM
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">Prod. Manager</p>
              <p className="text-[10px] text-secondary">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
