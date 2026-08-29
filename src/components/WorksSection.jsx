import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BookOpen, Search, Tag, ArrowRight, Feather, Filter, Sparkles } from 'lucide-react';
import { playPageFlipSound, playTypewriterSound } from '../utils/audioSynth';

export default function WorksSection() {
  const { data, setActiveReaderWork } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const categories = ['All', 'Poetry', 'Memoir', 'Story', 'Essay'];
  const topics = ['All', 'Constellations & Family', 'Hometown & Belonging', 'Philosophy of Love', 'Grief & Farewell', 'Nocturne & Inner Turmoil', 'Melancholy & Paradox'];

  const filteredWorks = data.works.filter(work => {
    const matchesSearch = 
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || work.category === selectedCategory;
    const matchesTopic = selectedTopic === 'All' || work.topicTag === selectedTopic;

    return matchesSearch && matchesCategory && matchesTopic;
  });

  const worksTexts = data.siteTexts?.works || {};

  return (
    <section id="works" className="section-container">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-kicker"><BookOpen size={16} /> {worksTexts.kicker || "ALL WRITINGS"}</span>
          <h2 className="section-title">{worksTexts.title || "STORIES, POEMS & ESSAYS"}</h2>
        </div>
        <p className="section-desc">
          {worksTexts.description || "Browse through all 17 personal writings. Filter by category, topic, or search for any line or phrase."}
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="toolbar-wrap">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, phrase, or theme (e.g. Spoon, Love, Sundar Nagar, Moon)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>Clear</button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="filter-group">
          <span className="filter-label"><Filter size={14} /> Format:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                playTypewriterSound();
                setSelectedCategory(cat);
              }}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Topic Filter Pills */}
        <div className="filter-group">
          <span className="filter-label"><Tag size={14} /> Topic:</span>
          {topics.map(top => (
            <button
              key={top}
              onClick={() => {
                playTypewriterSound();
                setSelectedTopic(top);
              }}
              className={`filter-chip ${selectedTopic === top ? 'active' : ''}`}
            >
              {top}
            </button>
          ))}
        </div>
      </div>

      {/* Works Grid */}
      <div className="works-grid">
        {filteredWorks.map((work) => (
          <article 
            key={work.id} 
            className={`work-card ${work.featured ? 'featured' : ''}`}
            onClick={() => {
              playPageFlipSound();
              setActiveReaderWork(work);
            }}
          >
            {work.featured && (
              <div className="featured-ribbon">
                <Sparkles size={12} /> FEATURED CODEX
              </div>
            )}

            <div className="card-top-meta">
              <span className="cat-badge">{work.category}</span>
              <span className="topic-badge">{work.topicTag}</span>
              <span className="time-badge">{work.readTime}</span>
            </div>

            <h3 className="card-title">{work.title}</h3>

            <p className="card-excerpt">{work.excerpt}</p>

            <div className="card-footer font-mono">
              <span className="pub-name">{work.publication} ({work.date})</span>
              <span className="read-cta">
                Launch Reader <ArrowRight size={14} />
              </span>
            </div>
          </article>
        ))}

        {filteredWorks.length === 0 && (
          <div className="empty-state">
            <p>No literary works found matching your filter query.</p>
            <button 
              className="btn-secondary" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTopic('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
