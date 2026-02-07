import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    headline: "Your Finance Partner for US ↔ India Startups",
    subheadline: "Bookkeeping, Tax, CFO & Finance Ops for founders operating across the US–India corridor."
  },
  {
    headline: "Always Due-Diligence Ready",
    subheadline: "Clean books, timely filings, zero compliance stress — raise funds anytime, confidently."
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Fixed height container for the slider to prevent layout shift */}
          <div className="h-[280px] sm:h-[320px] relative mb-8 sm:mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full"
              >
                <h1 className="text-5xl sm:text-7xl font-serif text-ink mb-6 leading-[1.1] tracking-tight">
                  {slides[currentSlide].headline}
                </h1>

                <p className="text-xl sm:text-2xl text-muted max-w-3xl leading-relaxed">
                  {slides[currentSlide].subheadline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Static CTAs and Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a
                href="#book"
                className="bg-ink text-white font-medium px-8 py-4 rounded-sm hover:bg-black transition-all flex items-center gap-2 group text-lg"
              >
                Book a Free CFO Call
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="text-ink font-medium px-8 py-4 rounded-sm border border-black/10 hover:bg-black/5 transition-all text-lg"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-black/5">
              <p className="text-sm text-muted font-medium uppercase tracking-wider">
                Trusted by 100+ startups and businesses.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


