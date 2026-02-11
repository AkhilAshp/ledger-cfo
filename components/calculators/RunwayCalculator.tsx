import React, { useState } from 'react';

const RunwayCalculator: React.FC = () => {
    const [cashBalance, setCashBalance] = useState(1000000);
    const [monthlyBurn, setMonthlyBurn] = useState(50000);

    const runway = Math.floor(cashBalance / monthlyBurn);
    const zeroCashDate = new Date();
    zeroCashDate.setMonth(zeroCashDate.getMonth() + runway);

    return (
        <>
            {/* Main Content */}
            <section className="bg-white border border-black/5 rounded-sm p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Inputs */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">Inputs</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-muted mb-2">Current Cash</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={cashBalance.toLocaleString()}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                            setCashBalance(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">Monthly Burn Rate</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={monthlyBurn.toLocaleString()}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                            setMonthlyBurn(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">Results</h3>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm text-muted uppercase tracking-wider mb-2">Estimated Runway</div>
                            <div className="text-6xl font-serif text-ink mb-2">{runway}</div>
                            <div className="text-lg text-muted">months</div>
                            <div className="text-sm text-muted mt-4">
                                Zero cash date: {zeroCashDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">CFO Insight:</div>
                            <p className="text-sm text-muted leading-relaxed">
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
            </section>

            {/* Disclaimer */}
            <div className="text-sm text-muted italic">
                This is a simplified tool. Real runway involves hiring plans, revenue growth, and one-off expenses.
            </div>
        </>
    );
};

export default RunwayCalculator;
