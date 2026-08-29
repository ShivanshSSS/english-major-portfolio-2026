import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GothicMarqueeRibbon from './components/GothicMarqueeRibbon';
import GothicArtGallery from './components/GothicArtGallery';
import VictorianScrollGallery from './components/VictorianScrollGallery';
import WorksSection from './components/WorksSection';
import Bookshelf from './components/Bookshelf';
import TypewriterStudio from './components/TypewriterStudio';
import EtymologyMatrix from './components/EtymologyMatrix';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import ReaderModal from './components/ReaderModal';
import AdminPortalModal from './components/AdminPortalModal';
import WaxSealStamper from './components/WaxSealStamper';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="portfolio-app">
        <Navbar />
        <main>
          <Hero />
          <GothicMarqueeRibbon />
          <GothicArtGallery />
          <VictorianScrollGallery />
          <WorksSection />
          <Bookshelf />
          <TypewriterStudio />
          <EtymologyMatrix />
          <Timeline />
        </main>
        <Footer />
        <ReaderModal />
        <AdminPortalModal />
        <WaxSealStamper />
      </div>
    </PortfolioProvider>
  );
}
