import React from 'react';

const PartnerLogos: React.FC = () => {
  const partners = [
    "Y Combinator",
    "Together Fund",
    "WestBridge Capital",
    "Forum Ventures",
    "Unusual Ventures"
  ];

  return (
    <section className="py-16 bg-paper border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-muted uppercase mb-8">
          Trusted by founders backed by
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <span key={partner} className="text-xl font-serif font-bold text-ink items-center flex">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
