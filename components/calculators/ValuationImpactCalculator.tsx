import React, { useState } from 'react';

const ValuationImpactCalculator: React.FC = () => {
    const [currentARR, setCurrentARR] = useState(1000000);
    const [currentGrowth, setCurrentGrowth] = useState(10);
    const [currentMargin, setCurrentMargin] = useState(60);
    const [improvedGrowth, setImprovedGrowth] = useState(20);
    const [improvedMargin, setImprovedMargin] = useState(75);

    const currentMultiple = (currentGrowth / 10) * (currentMargin / 50) * 5;
    const improvedMultiple = (improvedGrowth / 10) * (improvedMargin / 50) * 5;

    const currentValuation = currentARR * currentMultiple;
    const improvedValuation = currentARR * improvedMultiple;
    const valuationUplift = improvedValuation - currentValuation;
    const upliftPercent = ((valuationUplift / currentValuation) * 100).toFixed(1);

    return (
        <>
            {/* Main Content */}
            <section className="bg-white border border-black/10 rounded-sm p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Inputs */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">Inputs</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-muted mb-2">Annual Recurring Revenue</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={currentARR.toLocaleString()}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                            setCurrentARR(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-muted mb-2">Current Growth Rate (%)</label>
                                    <input
                                        type="text"
                                        value={currentGrowth}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 0;
                                            setCurrentGrowth(Math.min(100, Math.max(0, val)));
                                        }}
                                        className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-muted mb-2">Current Gross Margin (%)</label>
                                    <input
                                        type="text"
                                        value={currentMargin}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 0;
                                            setCurrentMargin(Math.min(100, Math.max(0, val)));
                                        }}
                                        className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-green-700 mb-2">Improved Growth Rate (%)</label>
                                    <input
                                        type="text"
                                        value={improvedGrowth}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 0;
                                            setImprovedGrowth(Math.min(100, Math.max(0, val)));
                                        }}
                                        className="w-full px-4 py-3 border border-green-200 rounded-sm text-green-700 focus:outline-none focus:border-green-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-green-700 mb-2">Improved Gross Margin (%)</label>
                                    <input
                                        type="text"
                                        value={improvedMargin}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 0;
                                            setImprovedMargin(Math.min(100, Math.max(0, val)));
                                        }}
                                        className="w-full px-4 py-3 border border-green-200 rounded-sm text-green-700 focus:outline-none focus:border-green-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">Results</h3>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-muted mb-1">Current Valuation</div>
                                    <div className="text-4xl font-serif text-ink">
                                        ${(currentValuation / 1000000).toFixed(1)}M
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted mb-1">Improved Valuation</div>
                                    <div className="text-4xl font-serif text-green-700">
                                        ${(improvedValuation / 1000000).toFixed(1)}M
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-sm p-6 mb-6">
                            <div className="text-sm font-semibold text-green-900 mb-2">Estimated Uplift</div>
                            <div className="text-5xl font-serif text-green-900 mb-1">
                                ${(valuationUplift / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xl text-green-700">+{upliftPercent}%</div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">How This Works:</div>
                            <p className="text-sm text-muted leading-relaxed">
                                Better metrics = higher valuation multiples. LedgersCFO helps you optimize growth efficiency,
                                margins, and unit economics—all of which directly impact how investors value your company.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="text-sm text-muted italic">
                This is a simplified model. Actual valuations depend on many factors including market conditions, competitive landscape, and team strength.
            </div>
        </>
    );
};

export default ValuationImpactCalculator;
