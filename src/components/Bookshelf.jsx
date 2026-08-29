import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Layers, Star, CheckCircle, BookOpen, Clock } from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';

export default function Bookshelf() {
  const { data } = usePortfolio();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredBooks = data.bookshelf.filter(b => {
    if (filterStatus === 'All') return true;
    return b.status === filterStatus;
  });

  return (
    <section id="bookshelf" className="section-container border-t border-glass">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-kicker"><Layers size={16} /> LITERARY ARCHIVE</span>
          <h2 className="section-title">THE CURATOR'S SHELF</h2>
        </div>
        <p className="section-desc">
          Current reads, theoretical touchstones, and essential bibliography shaping 2026 research priorities.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="shelf-filter-bar">
        {['All', 'Currently Reading', 'Finished'].map(status => (
          <button
            key={status}
            onClick={() => {
              playTypewriterSound();
              setFilterStatus(status);
            }}
            className={`shelf-chip ${filterStatus === status ? 'active' : ''}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookshelf Grid */}
      <div className="shelf-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-spine-card">
            {/* Cover Spine Gradient */}
            <div className={`book-cover-gradient bg-gradient-to-br ${book.coverColor || 'from-indigo-900 to-slate-900'}`}>
              <div className="book-spine-title font-serif">{book.title}</div>
              <div className="book-spine-author font-mono">{book.author}</div>
            </div>

            {/* Book Info Panel */}
            <div className="book-details">
              <div className="book-status-header">
                <span className={`status-pill ${book.status === 'Finished' ? 'finished' : 'reading'}`}>
                  {book.status === 'Finished' ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {book.status}
                </span>

                <div className="rating-wrap">
                  <Star size={14} className="fill-gold text-gold" />
                  <span>{book.rating}/5</span>
                </div>
              </div>

              <h4 className="book-title">{book.title}</h4>
              <p className="book-author">by {book.author}</p>

              {/* Progress Bar */}
              <div className="progress-wrap">
                <div className="progress-header font-mono">
                  <span>Reading Progress</span>
                  <span>{book.progress}%</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Marginalia / Notes */}
              {book.notes && (
                <div className="book-notes">
                  <span className="notes-label">Curator's Note:</span>
                  <p>"{book.notes}"</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
