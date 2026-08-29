import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  BookOpen, 
  Layers, 
  User, 
  Award, 
  Database,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';

export default function AdminPortalModal() {
  const { 
    data, 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated,
    addWork,
    updateWork,
    deleteWork,
    addBook,
    updateBook,
    deleteBook,
    updateProfile,
    addAccolade,
    deleteAccolade,
    resetToDefault,
    importDataset
  } = usePortfolio();

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('works'); // 'works', 'bookshelf', 'profile', 'accolades', 'data'
  const [successMsg, setSuccessMsg] = useState('');

  // Form states for adding work
  const [editingWorkId, setEditingWorkId] = useState(null);
  const [workForm, setWorkForm] = useState({
    title: '',
    category: 'Essay',
    topicTag: 'Digital Humanities',
    publication: 'Self-Published / Codex',
    date: '2026',
    excerpt: '',
    readTime: '5 min read',
    sentiment: 'Analytical',
    complexityScore: '85/100',
    featured: false,
    content: '',
    annotations: []
  });

  // Anno temporary inputs
  const [annoPhrase, setAnnoPhrase] = useState('');
  const [annoNote, setAnnoNote] = useState('');

  // Form states for adding book
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    coverColor: 'from-purple-800 to-indigo-950',
    progress: 50,
    status: 'Currently Reading',
    rating: 5,
    notes: ''
  });

  // Profile Form state
  const [profileForm, setProfileForm] = useState(data.profile);

  // Accolade Form state
  const [accForm, setAccForm] = useState({
    year: '2026',
    title: '',
    institution: '',
    description: ''
  });

  if (!isAdminOpen) return null;

  const showToast = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin2026' || passcode === 'admin' || passcode === 'admin123') {
      setIsAdminAuthenticated(true);
      setAuthError('');
      showToast('Authenticated as Administrator!');
    } else {
      setAuthError('Invalid passcode. Try "admin2026"');
    }
  };

  // Submit Work
  const handleSaveWork = (e) => {
    e.preventDefault();
    if (!workForm.title || !workForm.content) return;

    if (editingWorkId) {
      updateWork(editingWorkId, workForm);
      showToast('Work updated successfully!');
      setEditingWorkId(null);
    } else {
      addWork(workForm);
      showToast('New literary work published to live portfolio!');
    }

    setWorkForm({
      title: '',
      category: 'Essay',
      topicTag: 'Digital Humanities',
      publication: 'Self-Published / Codex',
      date: '2026',
      excerpt: '',
      readTime: '5 min read',
      sentiment: 'Analytical',
      complexityScore: '85/100',
      featured: false,
      content: '',
      annotations: []
    });
  };

  const handleEditWorkClick = (work) => {
    setEditingWorkId(work.id);
    setWorkForm(work);
  };

  const handleAddAnnotation = () => {
    if (!annoPhrase || !annoNote) return;
    setWorkForm(prev => ({
      ...prev,
      annotations: [...(prev.annotations || []), { phrase: annoPhrase, note: annoNote }]
    }));
    setAnnoPhrase('');
    setAnnoNote('');
  };

  const handleRemoveAnnotation = (idx) => {
    setWorkForm(prev => ({
      ...prev,
      annotations: prev.annotations.filter((_, i) => i !== idx)
    }));
  };

  // Submit Book
  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.author) return;
    addBook(bookForm);
    showToast('Book added to Curator Shelf!');
    setBookForm({
      title: '',
      author: '',
      coverColor: 'from-purple-800 to-indigo-950',
      progress: 50,
      status: 'Currently Reading',
      rating: 5,
      notes: ''
    });
  };

  // Submit Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Author Profile & Stats saved!');
  };

  // Submit Accolade
  const handleSaveAccolade = (e) => {
    e.preventDefault();
    if (!accForm.title || !accForm.institution) return;
    addAccolade(accForm);
    showToast('Accolade added to Academic Record!');
    setAccForm({
      year: '2026',
      title: '',
      institution: '',
      description: ''
    });
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aurora_portfolio_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Portfolio JSON exported!');
  };

  // Import JSON
  const handleImportJson = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          importDataset(parsed);
          showToast('Imported database successfully!');
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-card">
        {/* Header */}
        <div className="admin-modal-header">
          <div className="admin-brand">
            <ShieldCheck className="text-gold" size={20} />
            <span>ADMINISTRATIVE PORTAL // CONTENT MATRIX</span>
          </div>
          <button className="close-btn" onClick={() => setIsAdminOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Auth Check Screen */}
        {!isAdminAuthenticated ? (
          <div className="admin-auth-box">
            <div className="auth-icon-wrap">
              <Lock size={36} className="text-gold" />
            </div>
            <h3>Authenticate Access</h3>
            <p>Enter administrative passcode to unlock content editing, bookshelf management, and database export tools.</p>
            
            <form onSubmit={handleLogin} className="auth-form">
              <input
                type="password"
                placeholder="Enter Passcode (default: admin2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="auth-input"
              />
              <button type="submit" className="btn-primary full-width">
                Unlock Portal
              </button>
              <button 
                type="button" 
                className="btn-ghost full-width text-xs mt-2"
                onClick={() => {
                  setPasscode('admin2026');
                  setIsAdminAuthenticated(true);
                  showToast('Quick unlocked with default passcode!');
                }}
              >
                Instant Quick-Unlock (Demo Mode)
              </button>
            </form>

            {authError && <div className="auth-error-msg"><AlertCircle size={14} /> {authError}</div>}
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="admin-dashboard-body">
            {/* Success Toast */}
            {successMsg && (
              <div className="admin-toast animate-fade-in">
                <CheckCircle size={16} /> {successMsg}
              </div>
            )}

            {/* Admin Tabs */}
            <div className="admin-tabs">
              <button 
                className={`tab-btn ${activeTab === 'works' ? 'active' : ''}`}
                onClick={() => setActiveTab('works')}
              >
                <BookOpen size={16} /> Manage Works ({data.works.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bookshelf' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookshelf')}
              >
                <Layers size={16} /> Bookshelf ({data.bookshelf.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} /> Profile & Bio
              </button>
              <button 
                className={`tab-btn ${activeTab === 'accolades' ? 'active' : ''}`}
                onClick={() => setActiveTab('accolades')}
              >
                <Award size={16} /> Accolades ({data.accolades.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                <Database size={16} /> Backup & Reset
              </button>
            </div>

            {/* Tab 1: Works Manager */}
            {activeTab === 'works' && (
              <div className="admin-tab-content">
                <div className="admin-split">
                  {/* Form */}
                  <form onSubmit={handleSaveWork} className="admin-form">
                    <h4>{editingWorkId ? 'Edit Work' : 'Add New Literary Work'}</h4>

                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        required 
                        value={workForm.title} 
                        onChange={e => setWorkForm({...workForm, title: e.target.value})}
                        placeholder="e.g. Algorithmic Hauntology in Synthetic Poetry"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Category</label>
                        <select 
                          value={workForm.category}
                          onChange={e => setWorkForm({...workForm, category: e.target.value})}
                        >
                          <option value="Essay">Essay</option>
                          <option value="Critical Review">Critical Review</option>
                          <option value="Poetry">Poetry</option>
                          <option value="Short Story">Short Story</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Topic Tag</label>
                        <select 
                          value={workForm.topicTag}
                          onChange={e => setWorkForm({...workForm, topicTag: e.target.value})}
                        >
                          <option value="Digital Humanities">Digital Humanities</option>
                          <option value="Comparative Lit">Comparative Lit</option>
                          <option value="Modern Poetics">Modern Poetics</option>
                          <option value="Victorian & Modernism">Victorian & Modernism</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Publication Venue</label>
                        <input 
                          type="text" 
                          value={workForm.publication}
                          onChange={e => setWorkForm({...workForm, publication: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Read Time</label>
                        <input 
                          type="text" 
                          value={workForm.readTime}
                          onChange={e => setWorkForm({...workForm, readTime: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Excerpt / Abstract</label>
                      <textarea 
                        rows={2} 
                        value={workForm.excerpt}
                        onChange={e => setWorkForm({...workForm, excerpt: e.target.value})}
                        placeholder="Brief summary displayed on work cards..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Full Content (Markdown Format)</label>
                      <textarea 
                        rows={6} 
                        required 
                        value={workForm.content}
                        onChange={e => setWorkForm({...workForm, content: e.target.value})}
                        placeholder="Write full text, headings (###), quotes (>)..."
                      />
                    </div>

                    {/* Annotation Note Builder */}
                    <div className="annotation-builder-box">
                      <label className="text-xs font-mono font-bold text-gold">Add Interactive Margin Annotation</label>
                      <div className="form-row mt-1">
                        <input 
                          type="text" 
                          placeholder="Phrase to highlight (exact text)"
                          value={annoPhrase}
                          onChange={e => setAnnoPhrase(e.target.value)}
                        />
                        <input 
                          type="text" 
                          placeholder="Margin note explanation"
                          value={annoNote}
                          onChange={e => setAnnoNote(e.target.value)}
                        />
                        <button type="button" onClick={handleAddAnnotation} className="btn-secondary">
                          <Plus size={14} /> Add
                        </button>
                      </div>

                      {workForm.annotations && workForm.annotations.length > 0 && (
                        <ul className="anno-list mt-2">
                          {workForm.annotations.map((a, i) => (
                            <li key={i} className="anno-list-item">
                              <span><strong>"{a.phrase}"</strong>: {a.note}</span>
                              <button type="button" onClick={() => handleRemoveAnnotation(i)} className="text-red-400">
                                <Trash2 size={12} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="form-checkbox">
                      <input 
                        type="checkbox" 
                        id="featuredCheck"
                        checked={workForm.featured}
                        onChange={e => setWorkForm({...workForm, featured: e.target.checked})}
                      />
                      <label htmlFor="featuredCheck">Feature this work in Hero Reader Mode</label>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        <Save size={16} /> {editingWorkId ? 'Update Work' : 'Publish Work'}
                      </button>
                      {editingWorkId && (
                        <button 
                          type="button" 
                          className="btn-ghost" 
                          onClick={() => {
                            setEditingWorkId(null);
                            setWorkForm({
                              title: '', category: 'Essay', topicTag: 'Digital Humanities', publication: '', date: '2026', excerpt: '', readTime: '5 min read', sentiment: 'Analytical', complexityScore: '85/100', featured: false, content: '', annotations: []
                            });
                          }}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  {/* List of existing works */}
                  <div className="admin-list">
                    <h4>Published Works ({data.works.length})</h4>
                    <div className="list-items">
                      {data.works.map(w => (
                        <div key={w.id} className="admin-item-card">
                          <div className="item-info">
                            <strong>{w.title}</strong>
                            <span className="item-meta">{w.category} • {w.publication}</span>
                          </div>
                          <div className="item-controls">
                            <button onClick={() => handleEditWorkClick(w)} className="btn-icon">
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => {
                              if (confirm(`Delete "${w.title}"?`)) deleteWork(w.id);
                            }} className="btn-icon text-red-400">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Bookshelf Manager */}
            {activeTab === 'bookshelf' && (
              <div className="admin-tab-content">
                <div className="admin-split">
                  <form onSubmit={handleSaveBook} className="admin-form">
                    <h4>Add Book to Reading Matrix</h4>
                    
                    <div className="form-group">
                      <label>Book Title</label>
                      <input 
                        type="text" 
                        required 
                        value={bookForm.title}
                        onChange={e => setBookForm({...bookForm, title: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>Author</label>
                      <input 
                        type="text" 
                        required 
                        value={bookForm.author}
                        onChange={e => setBookForm({...bookForm, author: e.target.value})}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Status</label>
                        <select 
                          value={bookForm.status}
                          onChange={e => setBookForm({...bookForm, status: e.target.value})}
                        >
                          <option value="Currently Reading">Currently Reading</option>
                          <option value="Finished">Finished</option>
                          <option value="Plan to Read">Plan to Read</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Progress (%)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="100" 
                          value={bookForm.progress}
                          onChange={e => setBookForm({...bookForm, progress: parseInt(e.target.value) || 0})}
                        />
                      </div>

                      <div className="form-group">
                        <label>Rating (1-5)</label>
                        <input 
                          type="number" 
                          step="0.5" 
                          min="1" 
                          max="5" 
                          value={bookForm.rating}
                          onChange={e => setBookForm({...bookForm, rating: parseFloat(e.target.value) || 5})}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Curator Note / Review</label>
                      <textarea 
                        rows={3}
                        value={bookForm.notes}
                        onChange={e => setBookForm({...bookForm, notes: e.target.value})}
                        placeholder="Key insights and critical reflections..."
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      <Plus size={16} /> Add to Bookshelf
                    </button>
                  </form>

                  <div className="admin-list">
                    <h4>Bookshelf Items ({data.bookshelf.length})</h4>
                    <div className="list-items">
                      {data.bookshelf.map(b => (
                        <div key={b.id} className="admin-item-card">
                          <div className="item-info">
                            <strong>{b.title}</strong>
                            <span className="item-meta">by {b.author} • {b.progress}% ({b.status})</span>
                          </div>
                          <button onClick={() => deleteBook(b.id)} className="btn-icon text-red-400">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Profile Editor */}
            {activeTab === 'profile' && (
              <div className="admin-tab-content">
                <form onSubmit={handleSaveProfile} className="admin-form max-w-2xl">
                  <h4>Edit Author Profile & Metadata</h4>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name}
                        onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>University / Affiliation</label>
                      <input 
                        type="text" 
                        value={profileForm.university}
                        onChange={e => setProfileForm({...profileForm, university: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Academic Title</label>
                    <input 
                      type="text" 
                      value={profileForm.title}
                      onChange={e => setProfileForm({...profileForm, title: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Status Badge Text</label>
                    <input 
                      type="text" 
                      value={profileForm.statusBadge}
                      onChange={e => setProfileForm({...profileForm, statusBadge: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Hero Tagline</label>
                    <textarea 
                      rows={2}
                      value={profileForm.tagline}
                      onChange={e => setProfileForm({...profileForm, tagline: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Full Biography</label>
                    <textarea 
                      rows={4}
                      value={profileForm.bio}
                      onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    <Save size={16} /> Save Profile Settings
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Accolades Manager */}
            {activeTab === 'accolades' && (
              <div className="admin-tab-content">
                <div className="admin-split">
                  <form onSubmit={handleSaveAccolade} className="admin-form">
                    <h4>Add Accolade or Publication</h4>
                    
                    <div className="form-group">
                      <label>Year</label>
                      <input 
                        type="text" 
                        value={accForm.year}
                        onChange={e => setAccForm({...accForm, year: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>Honor Title</label>
                      <input 
                        type="text" 
                        required
                        value={accForm.title}
                        onChange={e => setAccForm({...accForm, title: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>Institution / Publisher</label>
                      <input 
                        type="text" 
                        required
                        value={accForm.institution}
                        onChange={e => setAccForm({...accForm, institution: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        rows={2}
                        value={accForm.description}
                        onChange={e => setAccForm({...accForm, description: e.target.value})}
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      <Plus size={16} /> Add Accolade
                    </button>
                  </form>

                  <div className="admin-list">
                    <h4>Academic Honors ({data.accolades.length})</h4>
                    <div className="list-items">
                      {data.accolades.map(acc => (
                        <div key={acc.id} className="admin-item-card">
                          <div className="item-info">
                            <strong>{acc.title}</strong>
                            <span className="item-meta">{acc.year} • {acc.institution}</span>
                          </div>
                          <button onClick={() => deleteAccolade(acc.id)} className="btn-icon text-red-400">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Data & Backup */}
            {activeTab === 'data' && (
              <div className="admin-tab-content">
                <div className="backup-controls-grid">
                  <div className="backup-card">
                    <h4>Export Portfolio Backup</h4>
                    <p>Download the complete live dataset (works, annotations, bookshelf, bio, accolades) as a clean `.json` file.</p>
                    <button onClick={handleExportJson} className="btn-primary">
                      <Download size={16} /> Export JSON Data
                    </button>
                  </div>

                  <div className="backup-card">
                    <h4>Import Dataset</h4>
                    <p>Upload a previously exported `.json` portfolio file to restore your customized state.</p>
                    <label className="btn-secondary cursor-pointer">
                      <Upload size={16} /> Choose File & Import
                      <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                    </label>
                  </div>

                  <div className="backup-card border-red-900/40">
                    <h4 className="text-red-400">Reset to Default Data</h4>
                    <p>Wipe local modifications and reload the original 2026 Harvard Comparative Lit sample portfolio.</p>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all portfolio data to default?')) {
                          resetToDefault();
                          showToast('Reset to original default portfolio state.');
                        }
                      }} 
                      className="btn-danger"
                    >
                      <RotateCcw size={16} /> Reset Default State
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
