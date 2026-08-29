import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  BookOpen, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  Moon, 
  Feather, 
  Terminal, 
  Layers 
} from 'lucide-react';

export default function Navbar() {
  const { 
    data, 
    activeTheme, 
    setActiveTheme, 
    setIsAdminOpen, 
    isAdminAuthenticated
  } = usePortfolio();

  const themeOptions = [
    { id: 'creamy-victorian', label: 'Velvet Cream', icon: Feather },
    { id: 'parchment-punk', label: 'Parchment', icon: BookOpen },
    { id: 'monastic-gold', label: 'Liquid Gold', icon: Sparkles },
    { id: 'midnight-ink', label: 'Obsidian Ink', icon: Moon },
    { id: 'cyber-gothic', label: 'Cyber Gothic', icon: Terminal }
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-content">

        {/* Center Nav Links */}
        <div className="nav-links">
          <a href="#works" className="nav-item">
            <BookOpen className="nav-icon" /> All Writings
          </a>
          <a href="#gallery" className="nav-item">
            <Sparkles className="nav-icon" /> Gallery
          </a>
          <a href="#bookshelf" className="nav-item">
            <Layers className="nav-icon" /> Bookshelf
          </a>
          <a href="#studio" className="nav-item">
            <Feather className="nav-icon" /> Writing Desk
          </a>
        </div>

        {/* Right Controls */}
        <div className="nav-controls">
          {/* Theme Dropdown / Buttons */}
          <div className="theme-switcher">
            {themeOptions.map((t) => {
              const IconComp = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id)}
                  className={`theme-chip ${activeTheme === t.id ? 'active' : ''}`}
                  title={t.label}
                >
                  <IconComp size={14} />
                </button>
              );
            })}
          </div>

          {/* Admin Portal Modal Trigger */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className={`admin-portal-trigger ${isAdminAuthenticated ? 'authenticated' : ''}`}
          >
            {isAdminAuthenticated ? <ShieldCheck size={16} /> : <Lock size={16} />}
            <span>{isAdminAuthenticated ? 'Admin Active' : 'Admin Portal'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
