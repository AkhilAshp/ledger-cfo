import React, { useState } from 'react';

const LTVCACCalculator: React.FC = () => {
    const [arpu, setARPU] = useState(500);
    const [lifetime, setLifetime] = useState(36);
    const [grossMargin, setGrossMargin] = useState(75);
    const [cac, setCAC] = useState(5000);

    const ltv = arpu * lifetime * (grossMargin / 100);
    const ratioValue = cac > 0 ? ltv / cac : null;
    const ratio = ratioValue ? ratioValue.toFixed(2) : '—';

    let health: 'Healthy' | 'Acceptable' | 'Unhealthy' | 'N/A' = 'N/A';
    let insight =
        'Enter valid inputs to evaluate your unit economics and LTV to CAC efficiency.';

    if (ratioValue !== null) {
        if (ratioValue >= 3) {
            health = 'Healthy';
            insight =
                'Excellent unit economics. A 3:1 or higher LTV:CAC ratio indicates strong pricing power and efficient customer acquisition.';
        } else if (ratioValue >= 2) {
            health = 'Acceptable';
            insight =
                'Moderate efficiency. While viable, improving retention or reducing CAC will unlock healthier growth.';
        } else {
            health = 'Unhealthy';
            insight =
                'Warning sign. Customer acquisition costs are too high relative to lifetime value, which may limit scalability.';
        }
    }

    return (
        <>
            {/* Main Content */}
            <section className="bg-white border border-black/10 rounded-sm p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Inputs */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">
                            Inputs
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    ARPU (Monthly)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        value={arpu.toLocaleString()}
                                        onChange={(e) => {
                                            const val =
                                                parseInt(
                                                    e.target.value.replace(
                                                        /,/g,
                                                        ''
                                                    )
                                                ) || 0;
                                            setARPU(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Customer Lifetime (months)
                                </label>
                                <input
                                    type="number"
                                    value={lifetime}
                                    onChange={(e) =>
                                        setLifetime(Number(e.target.value) || 0)
                                    }
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
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

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    CAC
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
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">
                            Results
                        </h3>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm text-muted uppercase tracking-wider mb-2">
                                LTV:CAC Ratio
                            </div>

                            <div className="text-6xl font-serif text-ink mb-2">
                                {ratio}
                                {ratioValue !== null && ':1'}
                            </div>

                            <div className="text-lg text-muted">
                                Health: {health}
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
                LTV should always be calculated using gross margin, not revenue.
                A minimum 3:1 LTV:CAC ratio is recommended for sustainable SaaS
                growth.
            </div>
        </>
    );
};

export default LTVCACCalculator;
