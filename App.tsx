import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import WhyLedgersCFO from './components/WhyLedgersCFO';
import ServicesList from './components/ServicesList';
import Calculators from './components/Calculators';
import ComplianceSection from './components/ComplianceSection';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
// import BlogList from './components/blog/BlogList';
// import BlogPost from './components/blog/BlogPost';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

import CalculatorsPage from './components/pages/CalculatorsPage';
import ScrollToTop from './components/ScrollToTop';
import HashScrollHandler from './components/HashScrollHandler';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ProblemSection />
      <WhyLedgersCFO />
      <ServicesList />
      <ComplianceSection />
      <Calculators />
      <PricingSection />
      <Testimonials />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScrollHandler />
      <div className="min-h-screen bg-paper font-sans text-ink selection:bg-black selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources/calculators" element={<CalculatorsPage />} />
            <Route path="/resources/calculators/:calculatorId" element={<CalculatorsPage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
