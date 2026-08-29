import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorksSection from './components/WorksSection';
import Bookshelf from './components/Bookshelf';
import EtymologyMatrix from './components/EtymologyMatrix';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import ReaderModal from './components/ReaderModal';
import AdminPortalModal from './components/AdminPortalModal';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="portfolio-app">
        <Navbar />
        <main>
          <Hero />
          <WorksSection />
          <Bookshelf />
          <EtymologyMatrix />
          <Timeline />
        </main>
        <Footer />
        <ReaderModal />
        <AdminPortalModal />
      </div>
    </PortfolioProvider>
  );
}
