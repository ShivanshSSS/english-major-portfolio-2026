import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Shield } from 'lucide-react';

export default function Footer() {
  const { data, setIsAdminOpen } = usePortfolio();

  const footerTexts = data.siteTexts?.footer || {};

  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-brand">
          <h3 className="footer-title">{footerTexts.brandName || data.profile.name}</h3>
          <p className="footer-desc">{footerTexts.subtitle || `${data.profile.title} — ${data.profile.university}`}</p>
          <div className="footer-contact">
            <Mail size={14} /> <a href={`mailto:${footerTexts.contactEmail || data.profile.email}`}>{footerTexts.contactEmail || data.profile.email}</a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <span className="group-title">Navigation</span>
            <a href="#works">All Writings</a>
            <a href="#gallery">Visual Moods</a>
            <a href="#bookshelf">Bookshelf</a>
            <a href="#studio">Writing Studio</a>
          </div>

          <div className="link-group">
            <span className="group-title">Connect</span>
            <a href={data.profile.socials.substack} target="_blank" rel="noreferrer">Substack</a>
            <a href={data.profile.socials.twitter} target="_blank" rel="noreferrer">Twitter / X</a>
            <a href={data.profile.socials.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <div className="footer-admin-callout">
          <button 
            className="btn-admin-footer"
            onClick={() => setIsAdminOpen(true)}
          >
            <Shield size={16} /> Archive Editor
          </button>
          <p className="footer-tech-tag font-mono">
            COLLECTED WRITINGS ARCHIVE
          </p>
        </div>
      </div>

      <div className="footer-bottom font-mono">
        <span>{footerTexts.copyright || `© 2026 ${data.profile.name}. All original writings and poems.`}</span>
      </div>
    </footer>
  );
}
