import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-subtle border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-ink mb-16 text-center">Founders talk. <span className="italic text-muted">Marketing doesn't.</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-paper p-10 border border-black/5">
            <p className="text-xl text-ink leading-relaxed font-serif italic mb-8">
              "This is exactly the bookkeeper we needed. LedgersCFO is basically like getting a part time CFO and I always have the reports my VCs need ready to go."
            </p>
            <div>
              <p className="font-bold text-ink">Mike Bell</p>
              <p className="text-muted text-sm uppercase tracking-wide">CTO, Scheduler AI</p>
            </div>
          </div>

          <div className="bg-paper p-10 border border-black/5">
            <p className="text-xl text-ink leading-relaxed font-serif italic mb-8">
              "We helped them to spot burn trends early and course-correct fast, helped them extend their runway by 6 months."
            </p>
            <div>
              <p className="font-bold text-ink">Sarah Jenkins</p>
              <p className="text-muted text-sm uppercase tracking-wide">Founder, Hazy Retails</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
