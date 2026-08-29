import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Feather, ArrowUpRight, Sparkles, BookOpen, Shield } from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';

export default function Hero() {
  const { data, setActiveReaderWork, setIsAdminOpen } = usePortfolio();
  const [hoveredWord, setHoveredWord] = useState(null);

  const heroTexts = data.siteTexts?.hero || {};

  const keywords = [
    { 
      word: heroTexts.theme1Word || "THE SPOON & NIGHT SKY", 
      def: heroTexts.theme1Def || "Looking up at the Big Dipper on the roof in Sundar Nagar with family." 
    },
    { 
      word: heroTexts.theme2Word || "SEASONS OF LOVE", 
      def: heroTexts.theme2Def || "How love makes you hopeful like a summer morning, then breaks you apart like winter." 
    },
    { 
      word: heroTexts.theme3Word || "ROOTS & MEMORIES", 
      def: heroTexts.theme3Def || "'Ghar haaya tithe ta mera; ghara chalira haun.' Missing the home you once wished to leave." 
    },
    { 
      word: heroTexts.theme4Word || "DISTANCE & THE MOON", 
      def: heroTexts.theme4Def || "Looking at the same Moon across different cities — the quiet connection between two people." 
    }
  ];

  const featuredWork = (data.works && data.works.length > 0) ? (data.works.find(w => w.featured) || data.works[0]) : null;

  return (
    <header className="hero-section">
      <div className="hero-background-grid"></div>

      <div className="hero-wrapper">
        {/* Status Badge */}
        <div className="hero-badge">
          <span className="badge-ring"></span>
          <span className="badge-text">{heroTexts.statusBadge || data.profile?.statusBadge || "Original Writings"}</span>
        </div>

        {/* Big Editorial Title */}
        <h1 className="hero-title">
          {heroTexts.titleMain || "SELECTED"} <span className="text-gradient">{heroTexts.titleHighlight || "WRITINGS"}</span>
          <br />
          <span className="hero-title-sub">{heroTexts.subtitle || "POETRY, STORIES & MEMOIRS"}</span>
        </h1>

        {/* Sub-tagline */}
        <p className="hero-tagline">
          {heroTexts.tagline || data.profile?.tagline || "A personal collection about love, distance, grief, and memories of home."}
        </p>

        {/* Themes Pills */}
        <div className="etymology-pills">
          <span className="pill-title"><Sparkles size={14} /> {heroTexts.themesTitle || "Recurring Themes"}:</span>
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
            <span className="drawer-label">{hoveredWord.word}:</span>
            <p className="drawer-def">"{hoveredWord.def}"</p>
          </div>
        )}

        {/* CTA Actions */}
        <div className="hero-actions">
          <a href="#works" className="btn-primary">
            <BookOpen size={18} /> {heroTexts.btnPrimary || "Browse All Writings"}
          </a>

          {featuredWork && (
            <button 
              className="btn-secondary"
              onClick={() => {
                playTypewriterSound();
                setActiveReaderWork(featuredWork);
              }}
            >
              <Feather size={18} /> {heroTexts.btnSecondary || "Read"}: {featuredWork.title} <ArrowUpRight size={16} />
            </button>
          )}

          <button 
            className="btn-ghost"
            onClick={() => setIsAdminOpen(true)}
          >
            <Shield size={16} /> {heroTexts.btnAdmin || "Archive Editor"}
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <span className="stat-num">{heroTexts.stat1Num || data.works?.length || "18"}</span>
            <span className="stat-label">{heroTexts.stat1Label || "Total Pieces"}</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{heroTexts.stat2Num || "9"}</span>
            <span className="stat-label">{heroTexts.stat2Label || "Poems"}</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{heroTexts.stat3Num || "5"}</span>
            <span className="stat-label">{heroTexts.stat3Label || "Stories"}</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{heroTexts.stat4Num || "4"}</span>
            <span className="stat-label">{heroTexts.stat4Label || "Memoirs & Essays"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
