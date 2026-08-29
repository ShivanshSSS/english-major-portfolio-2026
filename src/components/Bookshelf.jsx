import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Layers, Star, Clock } from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';

export default function Bookshelf() {
  const { data } = usePortfolio();
  const [filterStatus, setFilterStatus] = useState('Favourites');

  const bookshelfItems = data.bookshelf || [];

  const filteredBooks = bookshelfItems.filter(b => {
    if (filterStatus === 'Favourites') {
      return b.status === 'Favourites' || b.status === 'Finished';
    }
    return b.status === filterStatus;
  });

  const shelfTexts = data.siteTexts?.bookshelf || {};

  return (
    <section id="bookshelf" className="section-container border-t border-glass">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-kicker"><Layers size={16} /> {shelfTexts.kicker || "READING LIST"}</span>
          <h2 className="section-title">{shelfTexts.title || "THE BOOKSHELF"}</h2>
        </div>
        <p className="section-desc">
          {shelfTexts.description || "Favorite books, poetry volumes, and stories that have inspired and shaped these writings."}
        </p>
      </div>

      {/* Filter Bar - 'All' removed, 'Finished' replaced with 'Favourites' */}
      <div className="shelf-filter-bar">
        {['Favourites', 'Currently Reading'].map(status => (
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
        {filteredBooks.map((book) => {
          const isFavourite = book.status === 'Favourites' || book.status === 'Finished';
          return (
            <div key={book.id} className="book-spine-card">
              {/* Cover Spine Gradient */}
              <div className={`book-cover-gradient bg-gradient-to-br ${book.coverColor || 'from-indigo-900 to-slate-900'}`}>
                <div className="book-spine-title font-serif">{book.title}</div>
                <div className="book-spine-author font-mono">{book.author}</div>
              </div>

              {/* Book Info Panel */}
              <div className="book-details">
                <div className="book-status-header">
                  <span className={`status-pill ${isFavourite ? 'finished' : 'reading'}`}>
                    {isFavourite ? <Star size={12} className="fill-gold" /> : <Clock size={12} />}
                    {isFavourite ? 'Favourites' : book.status}
                  </span>

                  {book.rating && (
                    <div className="rating-wrap">
                      <Star size={14} className="fill-gold text-gold" />
                      <span>{book.rating}/5</span>
                    </div>
                  )}
                </div>

                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">{book.author}</p>

                {/* Progress Bar (if reading) */}
                {book.progress && book.progress < 100 && (
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
                )}

                {/* Marginalia / Notes */}
                {book.notes && (
                  <div className="book-notes">
                    <span className="notes-label">Curator's Note:</span>
                    <p>"{book.notes}"</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
