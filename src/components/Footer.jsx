import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Globe, BookOpen, Shield, Sparkles, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { data, setIsAdminOpen } = usePortfolio();

  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-brand">
          <h3 className="footer-title">{data.profile.name}</h3>
          <p className="footer-desc">{data.profile.title} — {data.profile.university}</p>
          <div className="footer-contact">
            <Mail size={14} /> <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <span className="group-title">Navigation</span>
            <a href="#works">Published Works</a>
            <a href="#bookshelf">Curator's Shelf</a>
            <a href="#matrix">Etymology Matrix</a>
            <a href="#accolades">Accolades</a>
          </div>

          <div className="link-group">
            <span className="group-title">Scholarship</span>
            <a href={data.profile.socials.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
            <a href={data.profile.socials.substack} target="_blank" rel="noreferrer">Substack Codex</a>
            <a href={data.profile.socials.github} target="_blank" rel="noreferrer">GitHub Repos</a>
            <a href={data.profile.socials.twitter} target="_blank" rel="noreferrer">Twitter / X</a>
          </div>
        </div>

        <div className="footer-admin-callout">
          <button 
            className="btn-admin-footer"
            onClick={() => setIsAdminOpen(true)}
          >
            <Shield size={16} /> Content Admin Portal
          </button>
          <p className="footer-tech-tag font-mono">
            BUILT WITH VITE + REACT // 2026 EDITORIAL ENGINE
          </p>
        </div>
      </div>

      <div className="footer-bottom font-mono">
        <span>© 2026 {data.profile.name}. All rights reserved across print & digital latent spaces.</span>
      </div>
    </footer>
  );
}
