import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Interactivity: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

    return (
        <section className="py-24 bg-subtle overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-ink mb-8">The difference is control.</h2>

                    <div className="inline-flex bg-white p-1 rounded-lg border border-black/5 shadow-sm">
                        <button
                            onClick={() => setActiveTab('before')}
                            className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${activeTab === 'before' ? 'bg-ink text-white shadow-md' : 'text-muted hover:text-ink'
                                }`}
                        >
                            Before LedgersCFO
                        </button>
                        <button
                            onClick={() => setActiveTab('after')}
                            className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${activeTab === 'after' ? 'bg-ink text-white shadow-md' : 'text-muted hover:text-ink'
                                }`}
                        >
                            After LedgersCFO
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-8 sm:p-12 rounded-xl shadow-xl border border-black/5"
                        >
                            {activeTab === 'before' ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-red-500 font-medium bg-red-50 p-4 rounded-lg">
                                        <span className="text-xl">⚠️</span>
                                        "Wait, why is our burn 2x higher this month?"
                                    </div>
                                    <div className="flex items-center gap-4 text-orange-600 font-medium bg-orange-50 p-4 rounded-lg">
                                        <span className="text-xl">📉</span>
                                        Three different spreadsheets for reliable runway. All different.
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-500 font-medium bg-gray-50 p-4 rounded-lg grayscale">
                                        <span className="text-xl">📧</span>
                                        "Can you send the P&L? Investors are asking." (Sent 3 days late)
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-emerald-700 font-medium bg-emerald-50 p-4 rounded-lg">
                                        <span className="text-xl">✅</span>
                                        "Burn is stable. We have 14 months runway at current pace."
                                    </div>
                                    <div className="flex items-center gap-4 text-emerald-700 font-medium bg-emerald-50 p-4 rounded-lg">
                                        <span className="text-xl">📊</span>
                                        One dashboard. Real-time bank feeds. zero manual entry.
                                    </div>
                                    <div className="flex items-center gap-4 text-emerald-700 font-medium bg-emerald-50 p-4 rounded-lg">
                                        <span className="text-xl">⚡</span>
                                        Investor update sent automatically. Board deck ready on Day 3.
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Interactivity;
