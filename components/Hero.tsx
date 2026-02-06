import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl sm:text-8xl font-serif text-ink mb-8 leading-[0.95] tracking-tight">
            Your Finance Stack. <br />
            <span className="italic opacity-80">Handled.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted max-w-2xl mb-12 leading-relaxed">
            From bookkeeping to boardrooms — we run your finance like a CFO, not an accountant.
          </p>

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
              Used by founders who want clarity without micromanaging finance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
