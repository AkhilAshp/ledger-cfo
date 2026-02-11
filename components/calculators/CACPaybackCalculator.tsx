import React, { useState } from 'react';

const CACPaybackCalculator: React.FC = () => {
    const [cac, setCAC] = useState(5000);
    const [mrr, setMRR] = useState(500);
    const [grossMargin, setGrossMargin] = useState(75);

    const effectiveMRR = mrr * (grossMargin / 100);

    const paybackMonths =
        effectiveMRR > 0 ? +(cac / effectiveMRR).toFixed(1) : null;

    let rating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'N/A' = 'N/A';
    let insight = 'Enter valid inputs to calculate CAC payback period.';

    if (paybackMonths !== null) {
        if (paybackMonths < 12) {
            rating = 'Excellent';
            insight =
                'Outstanding efficiency. Recovering CAC in under 12 months is best-in-class for SaaS businesses.';
        } else if (paybackMonths < 18) {
            rating = 'Good';
            insight =
                'Healthy payback period. Continue optimizing acquisition channels and sales efficiency.';
        } else if (paybackMonths < 24) {
            rating = 'Fair';
            insight =
                'Payback is slower than ideal. Focus on reducing CAC or improving monetization.';
        } else {
            rating = 'Poor';
            insight =
                'Critical concern. Long payback periods can strain cash flow and limit scalability.';
        }
    }

    return (
        <>
            {/* Main Content */}
            <section className="bg-white border border-black/5 rounded-sm p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Inputs */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">
                            Inputs
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Customer Acquisition Cost (CAC)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        value={cac.toLocaleString()}
                                        onChange={(e) => {
                                            const val =
                                                parseInt(
                                                    e.target.value.replace(
                                                        /,/g,
                                                        ''
                                                    )
                                                ) || 0;
                                            setCAC(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    MRR per Customer
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        value={mrr.toLocaleString()}
                                        onChange={(e) => {
                                            const val =
                                                parseInt(
                                                    e.target.value.replace(
                                                        /,/g,
                                                        ''
                                                    )
                                                ) || 0;
                                            setMRR(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Gross Margin (%)
                                </label>
                                <input
                                    type="number"
                                    value={grossMargin}
                                    onChange={(e) =>
                                        setGrossMargin(
                                            Math.min(
                                                100,
                                                Math.max(
                                                    0,
                                                    Number(e.target.value)
                                                )
                                            )
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">
                            Results
                        </h3>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm text-muted uppercase tracking-wider mb-2">
                                CAC Payback Period
                            </div>

                            <div className="text-6xl font-serif text-ink mb-2">
                                {paybackMonths ?? '—'}
                            </div>

                            <div className="text-lg text-muted">
                                {paybackMonths ? 'months' : ''}
                            </div>

                            <div className="text-sm text-muted mt-4">
                                Rating: {rating}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">
                                CFO Insight:
                            </div>
                            <p className="text-sm text-muted leading-relaxed">
                                {insight}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <div className="mt-6 text-sm text-muted italic">
                Best-in-class SaaS companies typically recover CAC within 12
                months. Payback periods exceeding 18 months may signal cash flow
                risk.
            </div>
        </>
    );
};

export default CACPaybackCalculator;
