import React, { useState } from 'react';

const CashConversionCalculator: React.FC = () => {
    const [dso, setDSO] = useState(45);
    const [dio, setDIO] = useState(30);
    const [dpo, setDPO] = useState(60);

    const ccc = dso + dio - dpo;
    const rating = ccc < 0 ? 'Excellent' : ccc < 30 ? 'Good' : ccc < 60 ? 'Fair' : 'Poor';

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
                                <label className="block text-sm text-muted mb-2">Days Sales Outstanding (DSO)</label>
                                <input
                                    type="text"
                                    value={dso}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        setDSO(val);
                                    }}
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">Days Inventory Outstanding (DIO)</label>
                                <input
                                    type="text"
                                    value={dio}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        setDIO(val);
                                    }}
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">Days Payable Outstanding (DPO)</label>
                                <input
                                    type="text"
                                    value={dpo}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        setDPO(val);
                                    }}
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">Results</h3>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm text-muted uppercase tracking-wider mb-2">Cash Conversion Cycle</div>
                            <div className="text-6xl font-serif text-ink mb-2">{ccc}</div>
                            <div className="text-lg text-muted">days</div>
                            <div className="text-sm text-muted mt-4">Rating: {rating}</div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">What This Means:</div>
                            <p className="text-sm text-muted leading-relaxed">
                                {ccc < 0
                                    ? 'Negative CCC means you get paid before you pay suppliers. This is ideal.'
                                    : `It takes ${ccc} days to convert investments back into cash. Lower is better.`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="text-sm text-muted italic">
                CCC = DSO + DIO - DPO. Negative values indicate strong working capital management.
            </div>
        </>
    );
};

export default CashConversionCalculator;
