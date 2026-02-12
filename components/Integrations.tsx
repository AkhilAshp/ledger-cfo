
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Integrations: React.FC = () => {
  const [activeCat, setActiveCat] = useState('accounting');

  const categories = [
    { id: 'accounting', label: 'Accounting & ERP' },
    { id: 'banking', label: 'Banking & Payments' },
    { id: 'payroll', label: 'Payroll & Equity' },
  ];

  const tools = [
    { name: 'QuickBooks', img: 'https://framerusercontent.com/images/mApbxURz5eHKc6pvnF5fjB3tSI0.jpg' },
    { name: 'NetSuite', img: 'https://framerusercontent.com/images/QOVnxeibvWtw7gNKK1mCJU22BE.svg' },
    { name: 'Puzzle', img: 'https://framerusercontent.com/images/XAxiHdUNeXO0xj9Ud8QM8zy5BM.jpg' },
    { name: 'Campfire', img: 'https://framerusercontent.com/images/5EVVRtix2jZj98O5UlryaVwwRw.svg' },
    { name: 'Rillet', img: 'https://framerusercontent.com/images/XV9lKmFFVngEPzCCPK0mYeU2Dk.svg' },
    { name: 'Blackline', img: 'https://framerusercontent.com/images/VH80XzjMusg2g71StCcgJJmFHow.svg' },
    { name: 'Sage Intacct', img: 'https://framerusercontent.com/images/G461dTKqUxOyvlHBfjgNTBCOo.svg' },
    { name: 'Xero', img: 'https://framerusercontent.com/images/7LIOSXyY01thzGcCjmllKV2QiRc.svg' },
  ];

  return (
    <div className="py-24" id="integration-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-4xl sm:text-5xl font-serif-accent leading-tight">
              Plug into your stack.
            </h3>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              Zinance integrates with over 50 tools from banks to billing platforms—keeping everything in sync without changing a thing in your workflow. Real-time, accurate, effortless.
            </p>
          </div>

          <div className="space-y-4">
            {['Setup in minutes, not days', '50+ prebuilt integrations', 'Live sync across your stack', 'Enterprise-grade API security'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white/80">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <a
            href="https://cal.com/ayush-garg-ledger/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all shadow-xl mt-8"
          >
            Get Started
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-10">
          <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`pb-4 px-6 text-sm font-bold transition-all relative ${activeCat === cat.id ? 'text-white' : 'text-white/40'
                  }`}
              >
                {cat.label}
                {activeCat === cat.id && (
                  <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-4 aspect-square rounded-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg"
              >
                <img src={tool.img} alt={tool.name} className="w-full h-full object-contain" />
              </motion.div>
            ))}
            <div className="bg-white/10 p-4 aspect-square rounded-2xl flex items-center justify-center text-center leading-tight">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/60">
                50+ more <br /> Integrations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
