import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  BookOpen, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Lock, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Feather, 
  Terminal, 
  Layers 
} from 'lucide-react';
import { startAmbientSoundscape, stopAmbientSoundscape } from '../utils/audioSynth';

export default function Navbar() {
  const { 
    data, 
    activeTheme, 
    setActiveTheme, 
    setIsAdminOpen, 
    isAdminAuthenticated,
    activeAudioMode,
    setActiveAudioMode 
  } = usePortfolio();

  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }) + ' EST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    if (activeAudioMode === 'none') {
      setActiveAudioMode('rain');
      startAmbientSoundscape('rain');
    } else if (activeAudioMode === 'rain') {
      setActiveAudioMode('focus');
      startAmbientSoundscape('focus');
    } else {
      setActiveAudioMode('none');
      stopAmbientSoundscape();
    }
  };

  const themeOptions = [
    { id: 'midnight-ink', label: 'Obsidian Ink', icon: Moon },
    { id: 'parchment-punk', label: 'Parchment', icon: Feather },
    { id: 'cyber-gothic', label: 'Cyber Gothic', icon: Terminal },
    { id: 'monastic-gold', label: 'Liquid Gold', icon: Sparkles }
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Brand */}
        <a href="#" className="navbar-brand">
          <div className="brand-badge">2026</div>
          <span className="brand-title">{data.profile.name}</span>
          <span className="brand-subtitle">// DIGITAL CODEX</span>
        </a>

        {/* Center Nav Links */}
        <div className="nav-links">
          <a href="#works" className="nav-item">
            <BookOpen className="nav-icon" /> Works
          </a>
          <a href="#bookshelf" className="nav-item">
            <Layers className="nav-icon" /> Curator's Shelf
          </a>
          <a href="#matrix" className="nav-item">
            <Sparkles className="nav-icon" /> Etymology Matrix
          </a>
          <a href="#accolades" className="nav-item">
            <Feather className="nav-icon" /> Accolades
          </a>
        </div>

        {/* Right Controls */}
        <div className="nav-controls">
          {/* Live Clock */}
          <div className="clock-chip">
            <span className="pulse-dot"></span>
            {timeString || 'CAMBRIDGE, MA'}
          </div>

          {/* Soundscape Control */}
          <button 
            className={`sound-btn ${activeAudioMode !== 'none' ? 'active' : ''}`}
            onClick={handleAudioToggle}
            title={`Soundscape: ${activeAudioMode.toUpperCase()}`}
          >
            {activeAudioMode === 'none' ? <VolumeX size={16} /> : <Volume2 size={16} className="animate-bounce" />}
            <span className="sound-label">{activeAudioMode === 'none' ? 'Sound' : activeAudioMode}</span>
          </button>

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
