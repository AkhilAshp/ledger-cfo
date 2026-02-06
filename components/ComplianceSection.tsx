import React from 'react';
import { ShieldAlert } from 'lucide-react';

const ComplianceSection: React.FC = () => {
    return (
        <section className="py-24 bg-ink text-paper">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6 text-white/50">
                            <ShieldAlert size={24} />
                            <span className="uppercase tracking-widest text-sm font-medium">Risk Management</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6 leading-tight">
                            The team that keeps you out of trouble <br />
                            <span className="italic opacity-60">before trouble starts.</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-lg leading-relaxed">
                            We handle the ugly stuff so you don't face penalties. $10k–$25k fines are common for missed international filings. We prevent them.
                        </p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 gap-6 w-full">
                        <div className="border border-white/10 p-6 rounded-lg bg-white/5">
                            <h3 className="text-lg font-bold text-white mb-2">Form 5471 & 5472</h3>
                            <p className="text-white/60 text-sm">Mandatory for foreign-owned US corps or US corps with foreign subs. Penalty starts at $25,000.</p>
                        </div>
                        <div className="border border-white/10 p-6 rounded-lg bg-white/5">
                            <h3 className="text-lg font-bold text-white mb-2">FinCEN 114 (FBAR)</h3>
                            <p className="text-white/60 text-sm">Any foreign bank account with &gt;$10k balance must be reported. We track this daily.</p>
                        </div>
                        <div className="border border-white/10 p-6 rounded-lg bg-white/5">
                            <h3 className="text-lg font-bold text-white mb-2">Section 174 (R&D)</h3>
                            <p className="text-white/60 text-sm">New capitalization rules for software development. We categorize expenses correctly preventing huge tax bills.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplianceSection;
