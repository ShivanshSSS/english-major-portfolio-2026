import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import { 
  fetchRemotePortfolioData, 
  pushRemotePortfolioData, 
  getCloudConfig 
} from '../utils/cloudSync';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('MANUSCRIPTS_PORTFOLIO_DATA_V2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_DATA,
          ...parsed,
          profile: { ...INITIAL_DATA.profile, ...(parsed.profile || {}) },
          siteTexts: { ...INITIAL_DATA.siteTexts, ...(parsed.siteTexts || {}) },
          works: (parsed.works && parsed.works.length > 0) ? parsed.works : INITIAL_DATA.works,
          gothicGallery: (parsed.gothicGallery && parsed.gothicGallery.length > 0) ? parsed.gothicGallery : INITIAL_DATA.gothicGallery,
          gallerySettings: parsed.gallerySettings || INITIAL_DATA.gallerySettings
        };
      }
    } catch (e) {
      console.error('Failed to load saved state', e);
    }
    return INITIAL_DATA;
  });

  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('AURORA_THEME_2026');
      if (savedTheme) return savedTheme;
    } catch (e) {}
    return 'creamy-victorian';
  });
  const [activeReaderWork, setActiveReaderWork] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAudioMode, setActiveAudioMode] = useState('none'); // 'none', 'rain', 'focus'
  const [cloudSyncStatus, setCloudSyncStatus] = useState('idle'); // 'idle', 'syncing', 'success', 'error'

  // Fetch remote cloud data on startup so all visitors across devices see latest admin published changes
  useEffect(() => {
    async function loadCloudData() {
      try {
        const remoteData = await fetchRemotePortfolioData();
        if (remoteData && (remoteData.siteTexts || remoteData.works || remoteData.gothicGallery)) {
          setData(prev => ({
            ...prev,
            ...remoteData,
            profile: { ...prev.profile, ...(remoteData.profile || {}) },
            siteTexts: { ...prev.siteTexts, ...(remoteData.siteTexts || {}) },
            works: (remoteData.works && remoteData.works.length > 0) ? remoteData.works : prev.works,
            gothicGallery: (remoteData.gothicGallery && remoteData.gothicGallery.length > 0) ? remoteData.gothicGallery : prev.gothicGallery,
            gallerySettings: remoteData.gallerySettings || prev.gallerySettings
          }));
          setCloudSyncStatus('success');
        }
      } catch (e) {
        console.warn('Cloud sync on load failed:', e);
      }
    }
    loadCloudData();
  }, []);

  // Persist to localStorage & push to Cloud if admin updated
  useEffect(() => {
    try {
      localStorage.setItem('MANUSCRIPTS_PORTFOLIO_DATA_V2', JSON.stringify(data));
      
      const config = getCloudConfig();
      if (config.autoSyncOnSave && (config.binId || config.firebaseProjectId)) {
        setCloudSyncStatus('syncing');
        pushRemotePortfolioData(data).then(ok => {
          setCloudSyncStatus(ok ? 'success' : 'error');
        });
      }
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Sync theme class to root body and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    try {
      localStorage.setItem('AURORA_THEME_2026', activeTheme);
    } catch (e) {}
  }, [activeTheme]);

  // Actions for Admin Portal
  const addWork = (newWork) => {
    const workWithId = {
      ...newWork,
      id: 'work-' + Date.now(),
      date: newWork.date || '2026',
      annotations: []
    };
    setData(prev => ({
      ...prev,
      works: [workWithId, ...prev.works]
    }));
  };

  const updateWork = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      works: prev.works.map(w => w.id === id ? { ...w, ...updatedFields } : w)
    }));
  };

  const deleteWork = (id) => {
    setData(prev => ({
      ...prev,
      works: prev.works.filter(w => w.id !== id)
    }));
  };

  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: 'book-' + Date.now()
    };
    setData(prev => ({
      ...prev,
      bookshelf: [bookWithId, ...prev.bookshelf]
    }));
  };

  const updateBook = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      bookshelf: prev.bookshelf.map(b => b.id === id ? { ...b, ...updatedFields } : b)
    }));
  };

  const deleteBook = (id) => {
    setData(prev => ({
      ...prev,
      bookshelf: prev.bookshelf.filter(b => b.id !== id)
    }));
  };

  const updateProfile = (updatedProfileFields) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfileFields }
    }));
  };

  const updateSiteTexts = (updatedTexts) => {
    setData(prev => ({
      ...prev,
      siteTexts: {
        ...prev.siteTexts,
        ...updatedTexts,
        hero: { ...(prev.siteTexts?.hero || {}), ...(updatedTexts.hero || {}) },
        works: { ...(prev.siteTexts?.works || {}), ...(updatedTexts.works || {}) },
        gallery: { ...(prev.siteTexts?.gallery || {}), ...(updatedTexts.gallery || {}) },
        bookshelf: { ...(prev.siteTexts?.bookshelf || {}), ...(updatedTexts.bookshelf || {}) },
        typewriter: { ...(prev.siteTexts?.typewriter || {}), ...(updatedTexts.typewriter || {}) },
        timeline: { ...(prev.siteTexts?.timeline || {}), ...(updatedTexts.timeline || {}) },
        footer: { ...(prev.siteTexts?.footer || {}), ...(updatedTexts.footer || {}) }
      }
    }));
  };

  const addAccolade = (newAccolade) => {
    const accoladeWithId = {
      ...newAccolade,
      id: 'acc-' + Date.now()
    };
    setData(prev => ({
      ...prev,
      accolades: [accoladeWithId, ...(prev.accolades || [])]
    }));
  };

  const deleteAccolade = (id) => {
    setData(prev => ({
      ...prev,
      accolades: prev.accolades.filter(a => a.id !== id)
    }));
  };

  // Gothic Gallery Actions
  const addGalleryItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: 'art-' + Date.now(),
      year: newItem.year || '2026',
      movement: newItem.movement || 'Visual Mood'
    };
    setData(prev => ({
      ...prev,
      gothicGallery: [...(prev.gothicGallery || []), itemWithId]
    }));
  };

  const updateGalleryItem = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      gothicGallery: (prev.gothicGallery || []).map(g => g.id === id ? { ...g, ...updatedFields } : g)
    }));
  };

  const deleteGalleryItem = (id) => {
    setData(prev => ({
      ...prev,
      gothicGallery: (prev.gothicGallery || []).filter(g => g.id !== id)
    }));
  };

  const moveGalleryItem = (index, direction) => {
    setData(prev => {
      const items = [...(prev.gothicGallery || [])];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;
      
      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;
      
      return {
        ...prev,
        gothicGallery: items
      };
    });
  };

  const updateGallerySettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      gallerySettings: { ...(prev.gallerySettings || { intervalSeconds: 5, autoPlay: true }), ...newSettings }
    }));
  };

  const triggerManualCloudSync = async () => {
    setCloudSyncStatus('syncing');
    const ok = await pushRemotePortfolioData(data);
    setCloudSyncStatus(ok ? 'success' : 'error');
    return ok;
  };

  const resetToDefault = () => {
    setData(INITIAL_DATA);
    localStorage.removeItem('MANUSCRIPTS_PORTFOLIO_DATA_V2');
  };

  const importDataset = (importedJsonData) => {
    if (importedJsonData && (importedJsonData.profile || importedJsonData.works || importedJsonData.siteTexts)) {
      setData({
        ...INITIAL_DATA,
        ...importedJsonData
      });
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        activeTheme,
        setActiveTheme,
        activeReaderWork,
        setActiveReaderWork,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        activeAudioMode,
        setActiveAudioMode,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
