import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerLogos from './components/PartnerLogos';
import ProblemSection from './components/ProblemSection';
import WhyLedgersCFO from './components/WhyLedgersCFO';
import ServicesList from './components/ServicesList';
import Interactivity from './components/Interactivity';
import Calculators from './components/Calculators';
import ComplianceSection from './components/ComplianceSection';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-black selection:text-white">
      <Navbar />

      <main>
        <Hero />
        <PartnerLogos />
        <ProblemSection />
        <WhyLedgersCFO />
        <ServicesList />
        <Interactivity />
        <Calculators />
        <ComplianceSection />
        <PricingSection />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default App;
