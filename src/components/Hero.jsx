import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Feather, ArrowUpRight, Sparkles, BookOpen, Quote, Shield, Award } from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';

export default function Hero() {
  const { data, setActiveReaderWork, setIsAdminOpen } = usePortfolio();
  const [hoveredWord, setHoveredWord] = useState(null);

  const keywords = [
    { word: "HAUNTOLOGY", def: "The repetition of past cultural specters in digital space." },
    { word: "SYNTACTIC MANIFOLD", def: "High-dimensional vector representation of prose rhythm." },
    { word: "ALGORITHMIC HERMENEUTICS", def: "Critical interpretation of machine-generated literary corpora." },
    { word: "POST-HUMAN POETICS", def: "Literature created at the boundary of human consciousness & AI." }
  ];

  const featuredWork = data.works.find(w => w.featured) || data.works[0];

  return (
    <header className="hero-section">
      <div className="hero-background-grid"></div>

      <div className="hero-wrapper">
        {/* Status Badge */}
        <div className="hero-badge">
          <span className="badge-ring"></span>
          <span className="badge-text">{data.profile.statusBadge}</span>
        </div>

        {/* Big Editorial Title */}
        <h1 className="hero-title">
          THE LEXICON <span className="text-gradient">2026</span>
          <br />
          <span className="hero-title-sub">AUTONOMOUS PROSE & CRITICAL THEORY</span>
        </h1>

        {/* Sub-tagline */}
        <p className="hero-tagline">
          {data.profile.tagline}
        </p>

        {/* Etymology Matrix Nodes */}
        <div className="etymology-pills">
          <span className="pill-title"><Sparkles size={14} /> Core Inquiry Nodes:</span>
          {keywords.map((k, idx) => (
            <div 
              key={idx} 
              className="etymology-pill-item"
              onMouseEnter={() => {
                setHoveredWord(k);
                playTypewriterSound();
              }}
              onMouseLeave={() => setHoveredWord(null)}
            >
              {k.word}
            </div>
          ))}
        </div>

        {/* Hover Definition Drawer */}
        {hoveredWord && (
          <div className="etymology-drawer animate-fade-in">
            <span className="drawer-label">GLOSSARY ENTRY // {hoveredWord.word}:</span>
            <p className="drawer-def">"{hoveredWord.def}"</p>
          </div>
        )}

        {/* CTA Actions */}
        <div className="hero-actions">
          <a href="#works" className="btn-primary">
            <BookOpen size={18} /> Explore Published Works
          </a>

          {featuredWork && (
            <button 
              className="btn-secondary"
              onClick={() => {
                playTypewriterSound();
                setActiveReaderWork(featuredWork);
              }}
            >
              <Feather size={18} /> Featured Reader Mode <ArrowUpRight size={16} />
            </button>
          )}

          <button 
            className="btn-ghost"
            onClick={() => setIsAdminOpen(true)}
          >
            <Shield size={16} /> Admin Portal
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <span className="stat-num">{data.profile.stats.publishedEssays}</span>
            <span className="stat-label">Published Essays & Critiques</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{data.profile.stats.citations}</span>
            <span className="stat-label">Academic Citations</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{data.profile.stats.booksRead2026}</span>
            <span className="stat-label">Curated Books Read in 2026</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{data.profile.stats.wordCountDrafted}</span>
            <span className="stat-label">Words Drafted</span>
          </div>
        </div>
      </div>
    </header>
  );
}
