import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-paper pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Final CTA */}
        <div id="book" className="max-w-3xl mb-32">
          <h2 className="text-5xl sm:text-7xl font-serif text-white mb-8 leading-none">
            If finance feels heavy, <br />
            <span className="italic opacity-50">it’s probably broken.</span>
          </h2>
          <div className="flex flex-col items-start gap-4">
            <a href="mailto:hello@ledgerscfo.com" className="bg-white text-ink font-medium px-8 py-4 rounded-sm hover:bg-gray-100 transition-all text-lg inline-block">
              Book a Free CFO Consultation
            </a>
            <p className="text-white/40 text-sm">
              We’ll tell you if we can help. If not, we’ll say so.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          <div className="col-span-1 md:col-span-1">
            <span className="font-serif text-2xl font-bold text-white tracking-tight block mb-6">LedgersCFO</span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              San Francisco • Bengaluru
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xs font-bold tracking-widest text-white/30 uppercase mb-6">Services</h5>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Bookkeeping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Taxes & R&D</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CFO Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payroll</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold tracking-widest text-white/30 uppercase mb-6">Company</h5>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold tracking-widest text-white/30 uppercase mb-6">Connect</h5>
              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Mail size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/20 font-medium uppercase tracking-widest">
          <p>© 2026 LedgersCFO. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/40">Privacy</a>
            <a href="#" className="hover:text-white/40">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
