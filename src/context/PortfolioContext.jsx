import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('AURORA_PORTFOLIO_DATA_2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_DATA,
          ...parsed,
          profile: { ...INITIAL_DATA.profile, ...(parsed.profile || {}) },
          gothicGallery: (parsed.gothicGallery && parsed.gothicGallery.length > 0) ? parsed.gothicGallery : INITIAL_DATA.gothicGallery,
          gallerySettings: parsed.gallerySettings || INITIAL_DATA.gallerySettings
        };
      }
    } catch (e) {
      console.error('Failed to load saved state', e);
    }
    return INITIAL_DATA;
  });

  const [activeTheme, setActiveTheme] = useState('creamy-victorian'); // 'creamy-victorian', 'parchment-punk', 'midnight-ink', 'monastic-gold', 'cyber-gothic'
  const [activeReaderWork, setActiveReaderWork] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAudioMode, setActiveAudioMode] = useState('none'); // 'none', 'rain', 'focus'

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('AURORA_PORTFOLIO_DATA_2026', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Sync theme class to root body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  // Actions for Admin Portal
  const addWork = (newWork) => {
    const workWithId = {
      ...newWork,
      id: 'work-' + Date.now(),
      date: newWork.date || '2026',
      annotations: newWork.annotations || []
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

  const updateProfile = (newProfile) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...newProfile }
    }));
  };

  const addAccolade = (newAccolade) => {
    const accWithId = {
      ...newAccolade,
      id: 'acc-' + Date.now()
    };
    setData(prev => ({
      ...prev,
      accolades: [accWithId, ...prev.accolades]
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
      id: 'art-' + Date.now()
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

  const updateGallerySettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      gallerySettings: { ...(prev.gallerySettings || { intervalSeconds: 5, autoPlay: true }), ...newSettings }
    }));
  };

  const resetToDefault = () => {
    setData(INITIAL_DATA);
    localStorage.removeItem('AURORA_PORTFOLIO_DATA_2026');
  };

  const importDataset = (importedJsonData) => {
    if (importedJsonData && importedJsonData.profile && importedJsonData.works) {
      setData(importedJsonData);
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
        addWork,
        updateWork,
        deleteWork,
        addBook,
        updateBook,
        deleteBook,
        updateProfile,
        addAccolade,
        deleteAccolade,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
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
