import React from 'react';
import { Check } from 'lucide-react';

const PricingSection: React.FC = () => {
    return (
        <section id="pricing" className="py-24 bg-paper border-t border-black/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-serif text-ink mb-6">Simple pricing.</h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-ink" size={20} />
                                <span className="text-ink">No hourly billing surprises</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Check className="text-ink" size={20} />
                                <span className="text-ink">Scale up or down as needed</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Check className="text-ink" size={20} />
                                <span className="text-ink">Easy to understand plans</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Check className="text-ink" size={20} />
                                <span className="text-ink">Clear scope with predictable costs</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-sm border border-black/10 shadow-sm relative">
                        <div className="absolute top-0 right-0 bg-ink text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
                            Most Popular
                        </div>

                        <h3 className="text-2xl font-bold text-ink mb-2">Early-Stage Plan</h3>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-sm text-muted font-medium">Starts at</span>
                            <span className="text-5xl font-serif text-ink">$2,000</span>
                            <span className="text-muted">/ year</span>
                        </div>

                        <p className="text-muted mb-8 leading-relaxed">
                            Perfect for pre-revenue to Series A startups.
                        </p>

                        <a
                            href="https://cal.com/ayush-garg-ledger/discovery-call"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-ink text-white font-medium py-4 hover:bg-black transition-colors"
                        >
                            Get a Custom Quote
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
