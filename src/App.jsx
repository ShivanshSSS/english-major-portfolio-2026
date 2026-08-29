import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollStoryDeck from './components/ScrollStoryDeck';
import AnimatedCreamBackground from './components/AnimatedCreamBackground';
import GothicMarqueeRibbon from './components/GothicMarqueeRibbon';
import GothicArtGallery from './components/GothicArtGallery';
import WorksSection from './components/WorksSection';
import Bookshelf from './components/Bookshelf';
import TypewriterStudio from './components/TypewriterStudio';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import ReaderModal from './components/ReaderModal';
import AdminPortalModal from './components/AdminPortalModal';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="portfolio-app">
        <AnimatedCreamBackground />
        <Navbar />
        <main>
          <Hero />
          {/* ScrollStoryDeck preserved in codebase for future use */}
          {/* <ScrollStoryDeck /> */}
          <GothicMarqueeRibbon />
          <GothicArtGallery />
          <WorksSection />
          <Bookshelf />
          <TypewriterStudio />
        </main>
        <Footer />
        <ReaderModal />
        <AdminPortalModal />
      </div>
    </PortfolioProvider>
  );
}
