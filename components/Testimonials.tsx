import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-subtle border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-ink mb-16 text-center">Founders talk. <span className="italic text-muted">Marketing doesn't.</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-paper p-10 border border-black/5">
            <p className="text-xl text-ink leading-relaxed font-serif italic mb-8">
              “Exactly the team we needed. All the US and India finance stuff is sorted now.”
            </p>
            <div>
              <p className="font-bold text-ink">Chaitanya</p>
              <p className="text-muted text-sm uppercase tracking-wide">Founder, Waytocloud</p>
            </div>
          </div>

          <div className="bg-paper p-10 border border-black/5">
            <p className="text-xl text-ink leading-relaxed font-serif italic mb-8">
              “With LedgerCFO, US compliance is no longer a concern. Everything is tracked, filed, and handled proactively.”
            </p>
            <div>
              <p className="font-bold text-ink">Piyush</p>
              <p className="text-muted text-sm uppercase tracking-wide">Finance Controller, E42 AI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
