import React, { useState } from 'react';

const BurnMultipleCalculator: React.FC = () => {
    const [netBurn, setNetBurn] = useState(100000);
    const [netNewARR, setNetNewARR] = useState(50000);

    const burnMultiple = netNewARR > 0 ? (netBurn / netNewARR).toFixed(2) : 'N/A';
    const rating = typeof burnMultiple === 'string' ? 'N/A' :
        parseFloat(burnMultiple) < 1 ? 'Excellent' :
            parseFloat(burnMultiple) < 1.5 ? 'Good' :
                parseFloat(burnMultiple) < 2 ? 'Fair' : 'Poor';

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
                                <label className="block text-sm text-muted mb-2">Net Burn (Monthly)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={netBurn.toLocaleString()}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                            setNetBurn(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">Net New ARR (Monthly)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={netNewARR.toLocaleString()}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                            setNetNewARR(val);
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
                            <div className="text-sm text-muted uppercase tracking-wider mb-2">Burn Multiple</div>
                            <div className="text-6xl font-serif text-ink mb-2">{burnMultiple}</div>
                            <div className="text-lg text-muted">Efficiency: {rating}</div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">CFO Insight:</div>
                            <p className="text-sm text-muted leading-relaxed">
                                You're spending ${burnMultiple} for every $1 of new ARR.
                                {rating === 'Excellent' && ' This is world-class capital efficiency.'}
                                {rating === "Good" && " You're doing well, but there's room to optimize."}
                                {rating === 'Fair' && ' Consider improving sales efficiency or reducing burn.'}
                                {rating === 'Poor' && ' Your burn is too high relative to growth. Act now.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="text-sm text-muted italic">
                Burn multiple is a key metric for SaaS companies. Best-in-class companies maintain a burn multiple under 1.5x.
            </div>
        </>
    );
};

export default BurnMultipleCalculator;
