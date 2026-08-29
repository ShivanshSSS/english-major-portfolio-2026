import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Feather, Award, Landmark, ExternalLink } from 'lucide-react';

export default function Timeline() {
  const { data } = usePortfolio();

  const timeTexts = data.siteTexts?.timeline || {};

  return (
    <section id="accolades" className="section-container border-t border-glass">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-kicker"><Award size={16} /> {timeTexts.kicker || "MILESTONES"}</span>
          <h2 className="section-title">{timeTexts.title || "WRITING JOURNEY & RECOGNITION"}</h2>
        </div>
        <p className="section-desc">
          {timeTexts.description || "Key writing milestones, publications, and moments across recent years."}
        </p>
      </div>

      <div className="timeline-wrap">
        {data.accolades.map((acc, idx) => (
          <div key={acc.id || idx} className="timeline-item">
            <div className="timeline-left font-mono">
              <span className="timeline-year">{acc.year}</span>
              <span className="timeline-dot"></span>
            </div>

            <div className="timeline-content">
              <div className="timeline-inst">
                <Landmark size={14} /> {acc.institution}
              </div>
              <h3 className="timeline-title">{acc.title}</h3>
              <p className="timeline-desc">{acc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
