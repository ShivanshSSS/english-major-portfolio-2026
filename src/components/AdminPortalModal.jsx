import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Sparkles,
  Type,
  ArrowUp,
  ArrowDown,
  Clock,
  Globe,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';
import { 
  compressImageFile, 
  getCloudConfig, 
  saveCloudConfig 
} from '../utils/cloudSync';

export default function AdminPortalModal() {
  const { 
    data, 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated,
    cloudSyncStatus,
    triggerManualCloudSync,
    addWork,
    updateWork,
    deleteWork,
    addBook,
    updateBook,
    deleteBook,
    updateProfile,
    updateSiteTexts,
    addAccolade,
    deleteAccolade,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    moveGalleryItem,
    updateGallerySettings,
    resetToDefault,
    importDataset
  } = usePortfolio();

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('texts'); // 'texts', 'works', 'bookshelf', 'gallery', 'profile', 'accolades', 'data'
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Site Texts Form State
  const [textsForm, setTextsForm] = useState(data.siteTexts || {});

  // Sync textsForm whenever data.siteTexts changes
  useEffect(() => {
    if (data.siteTexts) {
      setTextsForm(data.siteTexts);
    }
  }, [data.siteTexts]);

  // 2. Work Form States
  const [editingWorkId, setEditingWorkId] = useState(null);
  const [workForm, setWorkForm] = useState({
    title: '',
    category: 'Poetry',
    topicTag: 'Philosophy of Love',
    publication: 'Original Folio',
    date: '2026',
    excerpt: '',
    readTime: '3 min read',
    sentiment: 'Reflective',
    complexityScore: '100/100',
    featured: false,
    content: ''
  });

  // 3. Book Form State
  const [editingBookId, setEditingBookId] = useState(null);
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    coverColor: 'from-amber-900 to-stone-900',
    progress: 100,
    status: 'Finished',
    rating: 5,
    notes: ''
  });

  // 4. Profile Form State
  const [profileForm, setProfileForm] = useState(data.profile || {});
  useEffect(() => {
    if (data.profile) setProfileForm(data.profile);
  }, [data.profile]);

  // 5. Accolade Form State
  const [accForm, setAccForm] = useState({
    year: '2026',
    title: '',
    institution: '',
    description: ''
  });

  // 6. Gallery Form State
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    artist: '',
    year: '2026',
    movement: 'Visual Mood',
    imageUrl: '',
    description: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Gallery Timing State
  const [galleryTimingForm, setGalleryTimingForm] = useState(
    data.gallerySettings || { intervalSeconds: 5, autoPlay: true }
  );
  useEffect(() => {
    if (data.gallerySettings) setGalleryTimingForm(data.gallerySettings);
  }, [data.gallerySettings]);

  // Cloud Config State
  const [cloudConfigForm, setCloudConfigForm] = useState(() => getCloudConfig());

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAdminOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAdminOpen]);

  if (!isAdminOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin' || passcode === 'folio2026') {
      setIsAdminAuthenticated(true);
      setAuthError('');
      showToast('Welcome to the Content Editor Portal!');
    } else {
      setAuthError('Incorrect passcode. Use default: 1234 or admin');
    }
  };

  const showToast = (msg) => {
    playTypewriterSound();
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSaveSiteTexts = (e) => {
    e.preventDefault();
    updateSiteTexts(textsForm);
    showToast('Saved all website texts & headings!');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Saved author profile & socials!');
  };

  // Work Handlers
  const handleSaveWork = (e) => {
    e.preventDefault();
    if (editingWorkId) {
      updateWork(editingWorkId, workForm);
      showToast(`Updated "${workForm.title}"`);
    } else {
      addWork(workForm);
      showToast(`Published "${workForm.title}"`);
    }
    resetWorkForm();
  };

  const handleEditWorkClick = (work) => {
    setEditingWorkId(work.id);
    setWorkForm(work);
  };

  const resetWorkForm = () => {
    setEditingWorkId(null);
    setWorkForm({
      title: '',
      category: 'Poetry',
      topicTag: 'Philosophy of Love',
      publication: 'Original Folio',
      date: '2026',
      excerpt: '',
      readTime: '3 min read',
      sentiment: 'Reflective',
      complexityScore: '100/100',
      featured: false,
      content: ''
    });
  };

  // Bookshelf Handlers
  const handleSaveBook = (e) => {
    e.preventDefault();
    if (editingBookId && updateBook) {
      updateBook(editingBookId, bookForm);
      showToast(`Updated "${bookForm.title}"`);
    } else {
      addBook(bookForm);
      showToast(`Added "${bookForm.title}" to Bookshelf`);
    }
    setEditingBookId(null);
    setBookForm({
      title: '',
      author: '',
      year: '2026',
      genre: 'Classic',
      notes: '',
      coverColor: 'from-amber-900 to-stone-900',
      status: 'Finished'
    });
  };

  // Accolade Handler
  const handleAddAccolade = (e) => {
    e.preventDefault();
    addAccolade(accForm);
    showToast(`Added milestone "${accForm.title}"`);
    setAccForm({ year: '2026', title: '', institution: '', description: '' });
  };

  // Gallery Handlers
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const base64 = await compressImageFile(file, 1280, 0.85);
      setGalleryForm(prev => ({ ...prev, imageUrl: base64 }));
      showToast('Photo uploaded from device!');
    } catch (err) {
      alert('Failed to process image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveGallery = (e) => {
    e.preventDefault();
    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, galleryForm);
      showToast(`Updated gallery item "${galleryForm.title}"`);
    } else {
      addGalleryItem(galleryForm);
      showToast(`Added "${galleryForm.title}" to gallery`);
    }
    setEditingGalleryId(null);
    setGalleryForm({
      title: '',
      artist: '',
      year: '2026',
      movement: 'Visual Mood',
      imageUrl: '',
      description: ''
    });
  };

  const handleSaveGallerySettings = (e) => {
    e.preventDefault();
    updateGallerySettings(galleryTimingForm);
    showToast(`Slide timing set to ${galleryTimingForm.intervalSeconds}s!`);
  };

  const handleSaveCloudConfig = (e) => {
    e.preventDefault();
    saveCloudConfig(cloudConfigForm);
    showToast('Cloud sync settings saved!');
  };

  // Backup / Export Handler
  const handleExportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_backup_${new Date().toISOString().slice(0,10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported backup successfully!');
  };

  const handleExportCodeFile = () => {
    const code = `/**
 * Master Portfolio Dataset (Exported from Admin Portal)
 * Auto-generated on ${new Date().toISOString()}
 */

export const INITIAL_DATA = ${JSON.stringify(data, null, 2)};
`;
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'initialData.js';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded initialData.js code file!');
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importDataset(parsed);
        showToast('Imported dataset successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-modal-overlay" onClick={() => setIsAdminOpen(false)}>
      <div className="admin-modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-modal-header">
          <div className="admin-brand">
            <ShieldCheck size={20} className="text-gold" />
            <span>AUTHOR & CONTENT MANAGEMENT PORTAL</span>
          </div>
          <button className="close-btn" onClick={() => setIsAdminOpen(false)} title="Close Admin">
            <X size={18} />
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="admin-toast animate-fade-in">
            <CheckCircle size={16} /> {successMsg}
          </div>
        )}

        {/* Body */}
        {!isAdminAuthenticated ? (
          <div className="admin-auth-box">
            <div className="auth-icon-wrap">
              <Lock size={32} className="text-gold" />
            </div>
            <h3 className="auth-title font-display">Editor Authentication</h3>
            <p className="auth-desc">Enter editor passcode to modify website texts, manuscripts, and settings.</p>
            
            <form onSubmit={handleLogin} className="auth-form">
              <input
                type="password"
                placeholder="Enter passcode (default: 1234)"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="auth-input"
                autoFocus
              />
              {authError && <div className="auth-error-msg">{authError}</div>}
              <button type="submit" className="btn-primary w-full">
                Unlock Portal
              </button>
            </form>
          </div>
        ) : (
          <div className="admin-dashboard-layout">
            {/* Sidebar Tabs */}
            <div className="admin-tabs-nav">
              <button 
                className={`tab-btn ${activeTab === 'texts' ? 'active' : ''}`}
                onClick={() => setActiveTab('texts')}
              >
                <Type size={16} /> Site Texts & Headings
              </button>
              <button 
                className={`tab-btn ${activeTab === 'works' ? 'active' : ''}`}
                onClick={() => setActiveTab('works')}
              >
                <BookOpen size={16} /> Writings ({data.works?.length || 0})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                onClick={() => setActiveTab('gallery')}
              >
                <Sparkles size={16} /> Visual Gallery ({data.gothicGallery?.length || 0})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bookshelf' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookshelf')}
              >
                <Layers size={16} /> Bookshelf ({data.bookshelf?.length || 0})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'accolades' ? 'active' : ''}`}
                onClick={() => setActiveTab('accolades')}
              >
                <Award size={16} /> Milestones ({data.accolades?.length || 0})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} /> Profile & Socials
              </button>
              <button 
                className={`tab-btn ${activeTab === 'sync' ? 'active' : ''}`}
                onClick={() => setActiveTab('sync')}
              >
                <Globe size={16} /> Global Live Sync & Deploy
              </button>
              <button 
                className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                <Database size={16} /> Backup & Reset
              </button>
            </div>

            {/* TAB 1: ALL SITE TEXTS & HEADINGS */}
            {activeTab === 'texts' && (
              <div className="admin-tab-content">
                <form onSubmit={handleSaveSiteTexts} className="admin-form full-width">
                  <div className="form-section-header">
                    <h4>Edit All Website Headings, Titles & Descriptions</h4>
                    <button type="submit" className="btn-primary">
                      <Save size={16} /> Save All Website Texts
                    </button>
                  </div>

                  {/* 1. Hero Section Texts */}
                  <fieldset className="form-fieldset">
                    <legend className="font-mono text-gold">1. HERO BANNER & HEADER</legend>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Status Badge Text</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.statusBadge || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), statusBadge: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Subtitle / Sub-Header</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.subtitle || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), subtitle: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Title Main Word (e.g. SELECTED)</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.titleMain || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), titleMain: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Title Highlight Word (e.g. WRITINGS)</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.titleHighlight || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), titleHighlight: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Hero Tagline / Description</label>
                      <textarea 
                        rows={2}
                        value={textsForm.hero?.tagline || ''} 
                        onChange={e => setTextsForm({
                          ...textsForm,
                          hero: { ...(textsForm.hero || {}), tagline: e.target.value }
                        })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Primary Button Label</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.btnPrimary || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), btnPrimary: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Editor Button Label</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.btnAdmin || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), btnAdmin: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* 2. Hero Themes Pills */}
                  <fieldset className="form-fieldset">
                    <legend className="font-mono text-gold">2. HERO THEME PILLS & DEFINITIONS</legend>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Theme 1 Title</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme1Word || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme1Word: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Theme 1 Description</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme1Def || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme1Def: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Theme 2 Title</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme2Word || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme2Word: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Theme 2 Description</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme2Def || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme2Def: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Theme 3 Title</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme3Word || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme3Word: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Theme 3 Description</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme3Def || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme3Def: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Theme 4 Title</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme4Word || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme4Word: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Theme 4 Description</label>
                        <input 
                          type="text" 
                          value={textsForm.hero?.theme4Def || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            hero: { ...(textsForm.hero || {}), theme4Def: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* 3. Section Headings & Descriptions */}
                  <fieldset className="form-fieldset">
                    <legend className="font-mono text-gold">3. SECTION HEADINGS & DESCRIPTIONS</legend>
                    
                    {/* Works Section */}
                    <div className="form-sub-block">
                      <h5 className="font-mono text-sm">Writings Archive Section</h5>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kicker / Small Badge</label>
                          <input 
                            type="text" 
                            value={textsForm.works?.kicker || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              works: { ...(textsForm.works || {}), kicker: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Section Title</label>
                          <input 
                            type="text" 
                            value={textsForm.works?.title || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              works: { ...(textsForm.works || {}), title: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input 
                          type="text" 
                          value={textsForm.works?.description || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            works: { ...(textsForm.works || {}), description: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="form-sub-block mt-4">
                      <h5 className="font-mono text-sm">Visual Gallery Section</h5>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kicker / Small Badge</label>
                          <input 
                            type="text" 
                            value={textsForm.gallery?.kicker || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              gallery: { ...(textsForm.gallery || {}), kicker: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Section Title</label>
                          <input 
                            type="text" 
                            value={textsForm.gallery?.title || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              gallery: { ...(textsForm.gallery || {}), title: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input 
                          type="text" 
                          value={textsForm.gallery?.description || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            gallery: { ...(textsForm.gallery || {}), description: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    {/* Bookshelf Section */}
                    <div className="form-sub-block mt-4">
                      <h5 className="font-mono text-sm">Bookshelf Section</h5>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kicker / Small Badge</label>
                          <input 
                            type="text" 
                            value={textsForm.bookshelf?.kicker || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              bookshelf: { ...(textsForm.bookshelf || {}), kicker: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Section Title</label>
                          <input 
                            type="text" 
                            value={textsForm.bookshelf?.title || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              bookshelf: { ...(textsForm.bookshelf || {}), title: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input 
                          type="text" 
                          value={textsForm.bookshelf?.description || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            bookshelf: { ...(textsForm.bookshelf || {}), description: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    {/* Typewriter Desk Section */}
                    <div className="form-sub-block mt-4">
                      <h5 className="font-mono text-sm">Typewriter Desk Section</h5>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kicker / Small Badge</label>
                          <input 
                            type="text" 
                            value={textsForm.typewriter?.kicker || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              typewriter: { ...(textsForm.typewriter || {}), kicker: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Section Title</label>
                          <input 
                            type="text" 
                            value={textsForm.typewriter?.title || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              typewriter: { ...(textsForm.typewriter || {}), title: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input 
                          type="text" 
                          value={textsForm.typewriter?.description || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            typewriter: { ...(textsForm.typewriter || {}), description: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    {/* Milestones Section */}
                    <div className="form-sub-block mt-4">
                      <h5 className="font-mono text-sm">Milestones Section</h5>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kicker / Small Badge</label>
                          <input 
                            type="text" 
                            value={textsForm.timeline?.kicker || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              timeline: { ...(textsForm.timeline || {}), kicker: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Section Title</label>
                          <input 
                            type="text" 
                            value={textsForm.timeline?.title || ''} 
                            onChange={e => setTextsForm({
                              ...textsForm,
                              timeline: { ...(textsForm.timeline || {}), title: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input 
                          type="text" 
                          value={textsForm.timeline?.description || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            timeline: { ...(textsForm.timeline || {}), description: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* 4. Footer Texts */}
                  <fieldset className="form-fieldset">
                    <legend className="font-mono text-gold">4. FOOTER TEXTS & COPYRIGHT</legend>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Footer Brand Name</label>
                        <input 
                          type="text" 
                          value={textsForm.footer?.brandName || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            footer: { ...(textsForm.footer || {}), brandName: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Footer Subtitle</label>
                        <input 
                          type="text" 
                          value={textsForm.footer?.subtitle || ''} 
                          onChange={e => setTextsForm({
                            ...textsForm,
                            footer: { ...(textsForm.footer || {}), subtitle: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Copyright Line</label>
                      <input 
                        type="text" 
                        value={textsForm.footer?.copyright || ''} 
                        onChange={e => setTextsForm({
                          ...textsForm,
                          footer: { ...(textsForm.footer || {}), copyright: e.target.value }
                        })}
                      />
                    </div>
                  </fieldset>

                  <div className="form-actions sticky-save">
                    <button type="submit" className="btn-primary w-full">
                      <Save size={18} /> Save & Apply All Website Texts
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: WRITINGS MANAGER */}
            {activeTab === 'works' && (
              <div className="admin-tab-content">
                <div className="admin-split">
                  {/* Form */}
                  <form onSubmit={handleSaveWork} className="admin-form">
                    <h4>{editingWorkId ? 'Edit Writing' : 'Add New Writing / Story'}</h4>

                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        required 
                        value={workForm.title} 
                        onChange={e => setWorkForm({...workForm, title: e.target.value})}
                        placeholder="e.g. The Spoon"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Category</label>
                        <select 
                          value={workForm.category}
                          onChange={e => setWorkForm({...workForm, category: e.target.value})}
                        >
                          <option value="Poetry">Poetry</option>
                          <option value="Story">Story</option>
                          <option value="Memoir">Memoir</option>
                          <option value="Essay">Essay</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Topic Tag</label>
                        <input 
                          type="text"
                          value={workForm.topicTag}
                          onChange={e => setWorkForm({...workForm, topicTag: e.target.value})}
                          placeholder="e.g. Constellations & Family"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Date / Subtitle</label>
                        <input 
                          type="text" 
                          value={workForm.date}
                          onChange={e => setWorkForm({...workForm, date: e.target.value})}
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
                      <label>Excerpt / Short Summary</label>
                      <textarea 
                        rows={2}
                        value={workForm.excerpt}
                        onChange={e => setWorkForm({...workForm, excerpt: e.target.value})}
                        placeholder="Brief summary shown on the card..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Full Content (Poems preserve exact line breaks)</label>
                      <textarea 
                        rows={10}
                        required
                        value={workForm.content}
                        onChange={e => setWorkForm({...workForm, content: e.target.value})}
                        placeholder="Enter the complete text..."
                        className="font-serif"
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        <Save size={16} /> {editingWorkId ? 'Save Changes' : 'Publish Writing'}
                      </button>
                      {editingWorkId && (
                        <button type="button" className="btn-ghost" onClick={resetWorkForm}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* List */}
                  <div className="admin-list-pane">
                    <h4>All Published Writings ({data.works?.length || 0})</h4>
                    <div className="admin-cards-scroll">
                      {data.works?.map(w => (
                        <div key={w.id} className="admin-item-card">
                          <div>
                            <div className="admin-item-title font-serif">{w.title}</div>
                            <div className="admin-item-sub font-mono">{w.category} · {w.readTime}</div>
                          </div>
                          <div className="admin-item-actions">
                            <button onClick={() => handleEditWorkClick(w)} className="icon-action-btn" title="Edit">
                              <Edit3 size={15} />
                            </button>
                            <button onClick={() => deleteWork(w.id)} className="icon-action-btn text-red-400" title="Delete">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: VISUAL GALLERY */}
            {activeTab === 'gallery' && (
              <div className="admin-tab-content">
                {/* Carousel Animation Timing Setting */}
                <form onSubmit={handleSaveGallerySettings} className="admin-form mb-4 full-width">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h4 className="flex items-center gap-2 text-base">
                      <Clock size={16} /> Carousel Slide Timing & Autoplay
                    </h4>
                    <button type="submit" className="btn-secondary text-xs">
                      <Save size={14} /> Apply Slide Timing
                    </button>
                  </div>
                  <div className="form-row items-center">
                    <div className="form-group flex-1">
                      <label>Slide Duration ({galleryTimingForm.intervalSeconds || 5} seconds per slide)</label>
                      <input 
                        type="range" 
                        min={2} 
                        max={30} 
                        step={1}
                        value={galleryTimingForm.intervalSeconds || 5} 
                        onChange={e => setGalleryTimingForm({
                          ...galleryTimingForm, 
                          intervalSeconds: parseInt(e.target.value) || 5 
                        })}
                      />
                    </div>
                    <div className="form-group pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input 
                          type="checkbox" 
                          checked={galleryTimingForm.autoPlay !== false} 
                          onChange={e => setGalleryTimingForm({
                            ...galleryTimingForm, 
                            autoPlay: e.target.checked 
                          })}
                        />
                        <span>Enable Automatic Slide Advancement</span>
                      </label>
                    </div>
                  </div>
                </form>

                <div className="admin-split">
                  <form onSubmit={handleSaveGallery} className="admin-form">
                    <h4>{editingGalleryId ? 'Edit Artwork / Scene' : 'Add New Artwork / Scene'}</h4>
                    <div className="form-group">
                      <label>Scene Title</label>
                      <input 
                        type="text" 
                        required 
                        value={galleryForm.title} 
                        onChange={e => setGalleryForm({...galleryForm, title: e.target.value})}
                        placeholder="e.g. Moonlight Over Rooftops"
                      />
                    </div>

                    <div className="form-group">
                      <label>Artwork Image (Upload from Device or paste URL)</label>
                      <div className="flex gap-2 items-center mb-2">
                        <label className="btn-secondary cursor-pointer text-xs flex items-center gap-1">
                          <Upload size={14} /> {uploadingImage ? 'Optimizing...' : 'Upload Photo from Device'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            style={{ display: 'none' }} 
                            disabled={uploadingImage}
                          />
                        </label>
                        <span className="text-muted text-xs">or enter web URL</span>
                      </div>
                      <input 
                        type="text" 
                        required 
                        value={galleryForm.imageUrl} 
                        onChange={e => setGalleryForm({...galleryForm, imageUrl: e.target.value})}
                        placeholder="https://... or uploaded image data"
                      />
                      {galleryForm.imageUrl && (
                        <div className="mt-2 p-2 border border-border rounded bg-surface flex items-center gap-3">
                          <img src={galleryForm.imageUrl} alt="Preview" className="w-14 h-14 object-cover rounded" />
                          <span className="text-xs text-muted">Image ready</span>
                        </div>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Scene / Mood Tag</label>
                        <input 
                          type="text" 
                          value={galleryForm.movement} 
                          onChange={e => setGalleryForm({...galleryForm, movement: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Artist / Location (Optional)</label>
                        <input 
                          type="text" 
                          value={galleryForm.artist || ''} 
                          onChange={e => setGalleryForm({...galleryForm, artist: e.target.value})}
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description / Caption Quote</label>
                      <textarea 
                        rows={3}
                        value={galleryForm.description}
                        onChange={e => setGalleryForm({...galleryForm, description: e.target.value})}
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        <Save size={16} /> {editingGalleryId ? 'Update Item' : 'Add to Gallery'}
                      </button>
                      {editingGalleryId && (
                        <button type="button" className="btn-ghost" onClick={() => {
                          setEditingGalleryId(null);
                          setGalleryForm({ title: '', artist: '', year: '2026', movement: 'Visual Mood', imageUrl: '', description: '' });
                        }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="admin-list-pane">
                    <div className="flex justify-between items-center mb-2">
                      <h4>Curated Scenes ({data.gothicGallery?.length || 0})</h4>
                      <span className="text-xs text-muted">Use ↑ ↓ to rearrange order</span>
                    </div>
                    <div className="admin-cards-scroll">
                      {data.gothicGallery?.map((g, idx) => (
                        <div key={g.id || idx} className="admin-item-card">
                          <div className="flex items-center gap-3">
                            <img src={g.imageUrl} alt="" className="w-10 h-10 object-cover rounded" />
                            <div>
                              <div className="admin-item-title font-serif">{g.title}</div>
                              <div className="admin-item-sub font-mono">#{idx + 1} · {g.movement}</div>
                            </div>
                          </div>
                          <div className="admin-item-actions">
                            <button 
                              disabled={idx === 0} 
                              onClick={() => moveGalleryItem(idx, -1)} 
                              className="icon-action-btn"
                              title="Move Up"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button 
                              disabled={idx === (data.gothicGallery?.length || 0) - 1} 
                              onClick={() => moveGalleryItem(idx, 1)} 
                              className="icon-action-btn"
                              title="Move Down"
                            >
                              <ArrowDown size={14} />
                            </button>
                            <button onClick={() => { setEditingGalleryId(g.id); setGalleryForm(g); }} className="icon-action-btn" title="Edit">
                              <Edit3 size={15} />
                            </button>
                            <button onClick={() => deleteGalleryItem(g.id)} className="icon-action-btn text-red-400" title="Delete">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BOOKSHELF */}
            {activeTab === 'bookshelf' && (
              <div className="admin-tab-content">
                <div className="admin-split">
                  <form onSubmit={handleSaveBook} className="admin-form">
                    <h4>Add / Edit Book</h4>
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
                          <option value="Finished">Finished</option>
                          <option value="Currently Reading">Currently Reading</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Spine Gradient</label>
                        <select 
                          value={bookForm.coverColor} 
                          onChange={e => setBookForm({...bookForm, coverColor: e.target.value})}
                        >
                          <option value="from-amber-900 to-stone-900">Amber & Stone</option>
                          <option value="from-emerald-950 to-stone-900">Deep Emerald</option>
                          <option value="from-stone-800 to-stone-950">Midnight Slate</option>
                          <option value="from-red-950 to-stone-900">Crimson Velvet</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Reflection / Notes</label>
                      <textarea 
                        rows={3} 
                        value={bookForm.notes} 
                        onChange={e => setBookForm({...bookForm, notes: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="btn-primary">
                      <Save size={16} /> Save Book
                    </button>
                  </form>

                  <div className="admin-list-pane">
                    <h4>Bookshelf ({data.bookshelf?.length || 0})</h4>
                    <div className="admin-cards-scroll">
                      {data.bookshelf?.map(b => (
                        <div key={b.id} className="admin-item-card">
                          <div>
                            <div className="admin-item-title font-serif">{b.title}</div>
                            <div className="admin-item-sub font-mono">{b.author} · {b.status}</div>
                          </div>
                          <div className="admin-item-actions">
                            <button onClick={() => deleteBook(b.id)} className="icon-action-btn text-red-400">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: MILESTONES / TIMELINE */}
            {activeTab === 'accolades' && (
              <div className="admin-tab-content">
                <div className="admin-split">
                  <form onSubmit={handleAddAccolade} className="admin-form">
                    <h4>Add Writing Milestone</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Year / Date</label>
                        <input 
                          type="text" 
                          required 
                          value={accForm.year} 
                          onChange={e => setAccForm({...accForm, year: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Location / Context</label>
                        <input 
                          type="text" 
                          required 
                          value={accForm.institution} 
                          onChange={e => setAccForm({...accForm, institution: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Milestone Title</label>
                      <input 
                        type="text" 
                        required 
                        value={accForm.title} 
                        onChange={e => setAccForm({...accForm, title: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        rows={3} 
                        value={accForm.description} 
                        onChange={e => setAccForm({...accForm, description: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="btn-primary">
                      <Plus size={16} /> Add Milestone
                    </button>
                  </form>

                  <div className="admin-list-pane">
                    <h4>Timeline Milestones ({data.accolades?.length || 0})</h4>
                    <div className="admin-cards-scroll">
                      {data.accolades?.map(a => (
                        <div key={a.id} className="admin-item-card">
                          <div>
                            <div className="admin-item-title font-serif">{a.title} ({a.year})</div>
                            <div className="admin-item-sub font-mono">{a.institution}</div>
                          </div>
                          <button onClick={() => deleteAccolade(a.id)} className="icon-action-btn text-red-400">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: PROFILE & SOCIALS */}
            {activeTab === 'profile' && (
              <div className="admin-tab-content">
                <form onSubmit={handleSaveProfile} className="admin-form full-width">
                  <h4>Author Profile & Socials</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Author / Brand Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name || ''} 
                        onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Subtitle / Title</label>
                      <input 
                        type="text" 
                        value={profileForm.title || ''} 
                        onChange={e => setProfileForm({...profileForm, title: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Location / Cities</label>
                      <input 
                        type="text" 
                        value={profileForm.university || ''} 
                        onChange={e => setProfileForm({...profileForm, university: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Email</label>
                      <input 
                        type="email" 
                        value={profileForm.email || ''} 
                        onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Author Bio</label>
                    <textarea 
                      rows={3} 
                      value={profileForm.bio || ''} 
                      onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Substack URL</label>
                      <input 
                        type="url" 
                        value={profileForm.socials?.substack || ''} 
                        onChange={e => setProfileForm({
                          ...profileForm, 
                          socials: { ...(profileForm.socials || {}), substack: e.target.value }
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Twitter / X URL</label>
                      <input 
                        type="url" 
                        value={profileForm.socials?.twitter || ''} 
                        onChange={e => setProfileForm({
                          ...profileForm, 
                          socials: { ...(profileForm.socials || {}), twitter: e.target.value }
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label>GitHub URL</label>
                      <input 
                        type="url" 
                        value={profileForm.socials?.github || ''} 
                        onChange={e => setProfileForm({
                          ...profileForm, 
                          socials: { ...(profileForm.socials || {}), github: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary mt-4">
                    <Save size={16} /> Save Profile Settings
                  </button>
                </form>
              </div>
            )}

            {/* TAB 7: GLOBAL LIVE SYNC & DEPLOYMENT */}
            {activeTab === 'sync' && (
              <div className="admin-tab-content">
                <div className="data-management-grid">
                  <div className="data-card border-gold">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="flex items-center gap-2 text-gold">
                        <Globe size={18} /> Global Live Visitor Sync
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded font-mono ${cloudSyncStatus === 'success' ? 'bg-emerald-800 text-emerald-100' : 'bg-amber-900 text-amber-100'}`}>
                        {cloudSyncStatus === 'success' ? '● LIVE SYNCED' : '● READY TO SYNC'}
                      </span>
                    </div>
                    <p className="text-muted text-sm my-2">
                      Push your latest writings, gallery photos, and website texts so every visitor worldwide sees them instantly without needing to redeploy!
                    </p>
                    <button onClick={triggerManualCloudSync} className="btn-primary mt-3">
                      <Globe size={16} /> Push Live to All Global Visitors Now
                    </button>
                  </div>

                  <div className="data-card">
                    <h4>1-Click Static Repository Export (`initialData.js`)</h4>
                    <p className="text-muted text-sm my-2">
                      Want 100% static, permanent deployments on Vercel, Netlify, or GitHub Pages with zero external dependencies? Download your updated code file!
                    </p>
                    <button onClick={handleExportCodeFile} className="btn-secondary mt-2">
                      <Download size={16} /> Download `initialData.js` Code File
                    </button>
                  </div>

                  <div className="data-card">
                    <h4>Cloud Database Sync Configuration</h4>
                    <p className="text-muted text-sm my-2">
                      Connect your Google Firebase Firestore or custom cloud store for automatic real-time sync.
                    </p>
                    <form onSubmit={handleSaveCloudConfig} className="mt-3 flex flex-col gap-2">
                      <div className="form-group">
                        <label>Sync Mode</label>
                        <select 
                          value={cloudConfigForm.syncMode}
                          onChange={e => setCloudConfigForm({...cloudConfigForm, syncMode: e.target.value})}
                        >
                          <option value="cloud">Cloud JSON Store (JSONBin / REST)</option>
                          <option value="firebase">Google Firebase Firestore</option>
                        </select>
                      </div>
                      {cloudConfigForm.syncMode === 'firebase' ? (
                        <div className="form-group">
                          <label>Firebase Project ID</label>
                          <input 
                            type="text" 
                            value={cloudConfigForm.firebaseProjectId || ''} 
                            onChange={e => setCloudConfigForm({...cloudConfigForm, firebaseProjectId: e.target.value})}
                            placeholder="e.g. portfolio-2026-xyz"
                          />
                        </div>
                      ) : (
                        <div className="form-group">
                          <label>JSONBin Bin ID</label>
                          <input 
                            type="text" 
                            value={cloudConfigForm.binId || ''} 
                            onChange={e => setCloudConfigForm({...cloudConfigForm, binId: e.target.value})}
                            placeholder="e.g. 660f..."
                          />
                        </div>
                      )}
                      <button type="submit" className="btn-secondary text-xs mt-2">
                        <Save size={14} /> Save Cloud Config
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: BACKUP & DATA */}
            {activeTab === 'data' && (
              <div className="admin-tab-content">
                <div className="data-management-grid">
                  <div className="data-card">
                    <h4>Export Backup</h4>
                    <p className="text-muted text-sm my-2">Download a complete JSON copy of all website texts, works, books, and images.</p>
                    <button onClick={handleExportData} className="btn-secondary">
                      <Download size={16} /> Export JSON File
                    </button>
                  </div>

                  <div className="data-card">
                    <h4>Import Backup</h4>
                    <p className="text-muted text-sm my-2">Restore or load an entire dataset from an exported JSON file.</p>
                    <input type="file" accept=".json" onChange={handleImportFile} className="my-2 text-xs" />
                  </div>

                  <div className="data-card border-red-500">
                    <h4 className="text-red-400">Reset to Defaults</h4>
                    <p className="text-muted text-sm my-2">Reset all texts and works back to original initial values.</p>
                    <button 
                      onClick={() => {
                        if (confirm("Are you sure you want to reset all data back to original state?")) {
                          resetToDefault();
                          showToast("Reset to defaults successfully.");
                        }
                      }} 
                      className="btn-ghost text-red-400"
                    >
                      <RotateCcw size={16} /> Reset Everything
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
