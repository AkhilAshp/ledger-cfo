import React, { useState } from 'react';

const RevenueGrowthCalculator: React.FC = () => {
    const [currentRevenue, setCurrentRevenue] = useState(500000);
    const [previousRevenue, setPreviousRevenue] = useState(400000);
    const [period, setPeriod] = useState<'MoM' | 'YoY'>('MoM');

    const growthRate = previousRevenue > 0
        ? (((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
        : 'N/A';

    const rating = typeof growthRate === 'string' ? 'N/A' :
        parseFloat(growthRate) > 20 ? 'Excellent' :
            parseFloat(growthRate) > 10 ? 'Good' :
                parseFloat(growthRate) > 0 ? 'Moderate' : 'Declining';

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
                                <label className="block text-sm text-muted mb-2">Period</label>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setPeriod('MoM')}
                                        className={`flex-1 px-4 py-3 rounded-sm font-medium transition-colors ${period === 'MoM' ? 'bg-ink text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'
                                            }`}
                                    >
                                        Month-over-Month
                                    </button>
                                    <button
                                        onClick={() => setPeriod('YoY')}
                                        className={`flex-1 px-4 py-3 rounded-sm font-medium transition-colors ${period === 'YoY' ? 'bg-ink text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'
                                            }`}
                                    >
                                        Year-over-Year
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Current {period === 'MoM' ? 'Month' : 'Year'} Revenue
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={currentRevenue.toLocaleString()}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                            setCurrentRevenue(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Previous {period === 'MoM' ? 'Month' : 'Year'} Revenue
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={previousRevenue.toLocaleString()}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                            setPreviousRevenue(val);
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
                            <div className="text-sm text-muted uppercase tracking-wider mb-2">{period} Growth Rate</div>
                            <div className="text-6xl font-serif text-ink mb-2">{growthRate}%</div>
                            <div className="text-lg text-muted">Rating: {rating}</div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">Benchmark:</div>
                            <p className="text-sm text-muted leading-relaxed">
                                {period === 'MoM'
                                    ? 'Top SaaS companies grow 10-20% MoM in early stages.'
                                    : 'Healthy YoY growth for startups is 100%+, scale-ups aim for 50%+.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="text-sm text-muted italic">
                Growth rates should be evaluated in context of company stage, market size, and capital efficiency.
            </div>
        </>
    );
};

export default RevenueGrowthCalculator;
