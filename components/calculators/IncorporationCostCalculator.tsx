import React, { useState } from 'react';

const IncorporationCostCalculator: React.FC = () => {
    const [entityType, setEntityType] = useState('LLC');
    const [state, setState] = useState('DE');
    const [agentFee, setAgentFee] = useState(200);
    const [legalFee, setLegalFee] = useState(500);
    const [addOns, setAddOns] = useState({
        ein: true,
        agreement: false,
        expedited: false
    });

    // Mock State Filing Fees
    const stateFees: Record<string, Record<string, number>> = {
        'DE': { 'LLC': 90, 'C-Corp': 89, 'S-Corp': 89 },
        'CA': { 'LLC': 70, 'C-Corp': 100, 'S-Corp': 100 },
        'NY': { 'LLC': 200, 'C-Corp': 125, 'S-Corp': 125 },
        'TX': { 'LLC': 300, 'C-Corp': 300, 'S-Corp': 300 },
        'FL': { 'LLC': 125, 'C-Corp': 70, 'S-Corp': 70 },
        'WY': { 'LLC': 100, 'C-Corp': 100, 'S-Corp': 100 },
        'NV': { 'LLC': 75, 'C-Corp': 75, 'S-Corp': 75 }
    };

    const getFilingFee = () => {
        return stateFees[state]?.[entityType] || 100; // Fallback
    };

    // Add-on Costs
    const einCost = 50; // Service fee (EIN is free from IRS but services charge)
    const agreementCost = 150; // Operating Agreement / Bylaws
    const expeditedCost = 100;

    // Calculation
    const filingFee = getFilingFee();
    let oneTimeTotal = filingFee + legalFee;

    if (addOns.ein) oneTimeTotal += einCost;
    if (addOns.agreement) oneTimeTotal += agreementCost;
    if (addOns.expedited) oneTimeTotal += expeditedCost;

    // First Year Total (One-time + Recurring Agent Fee)
    const firstYearTotal = oneTimeTotal + agentFee;

    const toggleAddOn = (key: keyof typeof addOns) => {
        setAddOns(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <section className="bg-white border border-black/5 rounded-sm p-8">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Inputs */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Formation Details</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-muted mb-2">Entity Type</label>
                                <select
                                    value={entityType}
                                    onChange={(e) => setEntityType(e.target.value)}
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink bg-white"
                                >
                                    <option value="LLC">LLC</option>
                                    <option value="C-Corp">C-Corporation</option>
                                    <option value="S-Corp">S-Corporation</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-muted mb-2">State</label>
                                <select
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink bg-white"
                                >
                                    <option value="DE">Delaware</option>
                                    <option value="WY">Wyoming</option>
                                    <option value="NV">Nevada</option>
                                    <option value="CA">California</option>
                                    <option value="NY">New York</option>
                                    <option value="TX">Texas</option>
                                    <option value="FL">Florida</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">Legal / Service Fee</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="number"
                                    value={legalFee}
                                    onChange={(e) => setLegalFee(parseInt(e.target.value) || 0)}
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>
                            <p className="text-xs text-muted mt-1">Fee charged by formation service or lawyer</p>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">Registered Agent Fee (Annual)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="number"
                                    value={agentFee}
                                    onChange={(e) => setAgentFee(parseInt(e.target.value) || 0)}
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-3">Optional Add-ons</label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={addOns.ein}
                                        onChange={() => toggleAddOn('ein')}
                                        className="w-5 h-5 text-ink border-black/20 rounded focus:ring-ink"
                                    />
                                    <span className="text-ink">EIN Filing Service (+${einCost})</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={addOns.agreement}
                                        onChange={() => toggleAddOn('agreement')}
                                        className="w-5 h-5 text-ink border-black/20 rounded focus:ring-ink"
                                    />
                                    <span className="text-ink">Operating Agreement / Bylaws (+${agreementCost})</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={addOns.expedited}
                                        onChange={() => toggleAddOn('expedited')}
                                        className="w-5 h-5 text-ink border-black/20 rounded focus:ring-ink"
                                    />
                                    <span className="text-ink">Expedited State Filing (+${expeditedCost})</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Estimated Costs</h3>

                    <div className="bg-gray-50 rounded-sm p-6 mb-6">
                        <div className="text-sm text-muted uppercase tracking-wider mb-2">First Year Total</div>
                        <div className="text-6xl font-serif text-ink mb-2">
                            ${firstYearTotal}
                        </div>
                        <div className="text-sm text-muted mt-4">
                            Includes one-time formation fees + first year registered agent.
                        </div>
                    </div>

                    <div className="bg-white border border-black/5 rounded-sm p-6">
                        <h4 className="text-sm font-semibold text-ink mb-4">Cost Breakdown</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">State Filing Fee ({state})</span>
                                <span className="font-medium text-ink">${filingFee}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Legal / Service Fee</span>
                                <span className="font-medium text-ink">${legalFee}</span>
                            </div>
                            {addOns.ein && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">EIN Service</span>
                                    <span className="font-medium text-ink">${einCost}</span>
                                </div>
                            )}
                            {addOns.agreement && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Operating Agreement</span>
                                    <span className="font-medium text-ink">${agreementCost}</span>
                                </div>
                            )}
                            {addOns.expedited && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">Expedited Filing</span>
                                    <span className="font-medium text-ink">${expeditedCost}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm bg-gray-50 p-2 rounded-sm -mx-2 mt-2">
                                <span className="text-ink font-medium">One-Time Total</span>
                                <span className="font-bold text-ink">${oneTimeTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span className="text-muted">Registered Agent (Annual)</span>
                                <span className="font-medium text-ink">${agentFee}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IncorporationCostCalculator;
