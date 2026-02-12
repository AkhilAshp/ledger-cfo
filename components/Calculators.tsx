import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Calculators: React.FC = () => {
    const [monthlySpend, setMonthlySpend] = useState(50000);
    const [cashBalance, setCashBalance] = useState(1000000);

    const runway = Math.floor(cashBalance / monthlySpend);

    return (
        <section className="py-24 bg-paper">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-4xl font-serif text-ink mb-12">Runway Calculator</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Monthly Burn ($)</label>
                            <input
                                type="range"
                                min="10000"
                                max="500000"
                                step="5000"
                                value={monthlySpend}
                                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ink"
                            />
                            <div className="mt-2 text-2xl font-mono text-ink">${monthlySpend.toLocaleString()}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Cash Balance ($)</label>
                            <input
                                type="range"
                                min="100000"
                                max="5000000"
                                step="50000"
                                value={cashBalance}
                                onChange={(e) => setCashBalance(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ink"
                            />
                            <div className="mt-2 text-2xl font-mono text-ink">${cashBalance.toLocaleString()}</div>
                        </div>

                        <p className="text-sm text-muted italic">This is a simplified tool. Real runway involves hiring plans, revenue growth, and one-off expenses.</p>
                    </div>

                    <div className="bg-white p-8 border border-black/5 rounded-xl flex flex-col justify-center items-center text-center">
                        <h3 className="text-muted uppercase tracking-wider text-sm font-semibold mb-2">Estimated Runway</h3>
                        <div className="text-8xl font-serif text-ink mb-4">{runway} <span className="text-3xl font-sans text-muted">months</span></div>

                        <div className="mt-6 p-4 bg-bg-secondary w-full text-left rounded-lg">
                            <span className="block font-bold text-ink mb-1">CFO Insight:</span>
                            <p className="text-muted text-sm leading-relaxed">
                                {runway < 6
                                    ? "You are in the danger zone. You need to fundraise immediately or cut aggressive burn."
                                    : runway < 12
                                        ? "Start planning your next round now. It takes 6-9 months to close a good Series A."
                                        : "You have a healthy runway. Focus on efficient growth and unit economics."
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/resources/calculators"
                        className="inline-block bg-ink text-white px-8 py-3 rounded-sm font-medium hover:bg-black transition-colors"
                    >
                        More Calculators →
                    </Link>
                    <p className="text-sm text-muted mt-3">
                        Explore 9 more financial calculators for startups
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Calculators;
