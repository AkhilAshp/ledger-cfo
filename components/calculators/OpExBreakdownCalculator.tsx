import React, { useState } from 'react';

const OpExBreakdownCalculator: React.FC = () => {
    const [revenue, setRevenue] = useState(1_000_000);
    const [cogsPercent, setCogsPercent] = useState(25);
    const [smPercent, setSmPercent] = useState(40);
    const [rdPercent, setRdPercent] = useState(25);
    const [gaPercent, setGaPercent] = useState(10);

    const cogs = (revenue * cogsPercent) / 100;
    const sm = (revenue * smPercent) / 100;
    const rd = (revenue * rdPercent) / 100;
    const ga = (revenue * gaPercent) / 100;

    const total = cogsPercent + smPercent + rdPercent + gaPercent;

    let health: 'Healthy' | 'Aggressive' | 'Risky' | 'N/A' = 'N/A';
    let insight =
        'Enter valid inputs to analyze your operating expense structure against SaaS benchmarks.';

    if (revenue > 0) {
        if (total < 70) {
            health = 'Healthy';
            insight =
                'Lean cost structure. You are operating efficiently, but ensure under-investment is not slowing growth.';
        } else if (total <= 100) {
            health = 'Aggressive';
            insight =
                'Growth-oriented spend profile. This is common for scaling SaaS companies, but efficiency must improve as revenue grows.';
        } else {
            health = 'Risky';
            insight =
                'Unsustainable cost structure. Operating expenses exceed revenue, which may create long-term cash flow pressure.';
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
                                    Annual Revenue
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        value={revenue.toLocaleString()}
                                        onChange={(e) => {
                                            const val =
                                                parseInt(
                                                    e.target.value.replace(
                                                        /,/g,
                                                        ''
                                                    )
                                                ) || 0;
                                            setRevenue(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-muted mb-2">
                                        COGS (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={cogsPercent}
                                        onChange={(e) =>
                                            setCogsPercent(
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
                                        S&M (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={smPercent}
                                        onChange={(e) =>
                                            setSmPercent(
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
                                        R&D (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={rdPercent}
                                        onChange={(e) =>
                                            setRdPercent(
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
                                        G&A (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={gaPercent}
                                        onChange={(e) =>
                                            setGaPercent(
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
                    </div>

                    {/* Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">
                            Results
                        </h3>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm text-muted uppercase tracking-wider mb-4">
                                Spend Breakdown
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">COGS</span>
                                    <span className="text-ink font-mono">
                                        ${cogs.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">
                                        Sales & Marketing
                                    </span>
                                    <span className="text-ink font-mono">
                                        ${sm.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">R&D</span>
                                    <span className="text-ink font-mono">
                                        ${rd.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">G&A</span>
                                    <span className="text-ink font-mono">
                                        ${ga.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-black/10">
                                    <span className="text-ink font-semibold">
                                        Total OpEx
                                    </span>
                                    <span className="text-ink font-mono font-semibold">
                                        {total}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">
                                CFO Insight:
                            </div>
                            <p className="text-sm text-muted leading-relaxed">
                                {insight}
                            </p>
                            <div className="text-sm text-muted mt-3">
                                Health: {health}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <div className="mt-6 text-sm text-muted italic">
                Typical SaaS benchmarks: COGS 20–30%, Sales & Marketing 40–50%,
                R&D 20–30%, G&A 10–15%. Benchmarks vary by stage and business
                model.
            </div>
        </>
    );
};

export default OpExBreakdownCalculator;
