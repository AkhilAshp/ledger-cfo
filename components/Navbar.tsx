import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] bg-paper/90 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl font-medium text-ink tracking-wider">
                LedgersCFO
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#problem" className="text-sm font-medium text-muted hover:text-ink transition-colors">Problem</Link>
            <Link to="/#services" className="text-sm font-medium text-muted hover:text-ink transition-colors">Services</Link>
            <Link to="/#pricing" className="text-sm font-medium text-muted hover:text-ink transition-colors">Pricing</Link>
            <Link to="/resources/calculators" className="text-sm font-medium text-muted hover:text-ink transition-colors">Resources</Link>
            <Link to="/blog" className="text-sm font-medium text-muted hover:text-ink transition-colors">Blog</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://cal.com/ayush-garg-ledger/discovery-call" target="_blank" rel="noopener noreferrer" className="bg-ink text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-black transition-all">
              Book a Free CFO Call
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-ink hover:text-muted transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-paper overflow-hidden border-b border-black/5"
          >
            <div className="px-6 pt-4 pb-8 space-y-4">
              <Link to="/#problem" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-ink">Problem</Link>
              <Link to="/#services" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-ink">Services</Link>
              <Link to="/#pricing" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-ink">Pricing</Link>
              <Link to="/resources/calculators" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-ink">Resources</Link>
              <Link to="/blog" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-ink">Blog</Link>
              <div className="pt-4">
                <a href="https://cal.com/ayush-garg-ledger/discovery-call" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block w-full text-center bg-ink text-white px-5 py-3 rounded-sm font-medium">
                  Book a Free CFO Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
