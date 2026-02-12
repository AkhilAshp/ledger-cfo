import React, { useState } from 'react';

const IncomeTaxCalculator: React.FC = () => {
    const [filingStatus, setFilingStatus] = useState('single');
    const [income, setIncome] = useState(100000);
    const [state, setState] = useState('CA');
    const [deductions, setDeductions] = useState(14600); // 2024 Standard Deduction for Single
    const [credits, setCredits] = useState(0);

    // Simplified 2024 Federal Tax Brackets (Single)
    const fedBrackets = [
        { limit: 11600, rate: 0.10 },
        { limit: 47150, rate: 0.12 },
        { limit: 100525, rate: 0.22 },
        { limit: 191950, rate: 0.24 },
        { limit: 243725, rate: 0.32 },
        { limit: 609350, rate: 0.35 },
        { limit: Infinity, rate: 0.37 },
    ];

    // Simplified State Flat Rates (for demo purposes)
    const stateRates: Record<string, number> = {
        'CA': 0.093, // ~9.3% avg effective
        'NY': 0.06,
        'TX': 0.0,
        'FL': 0.0,
        'WA': 0.0,
        'DE': 0.066,
        'MA': 0.05
    };

    const calculateFederalTax = (taxableIncome: number) => {
        let remainingIncome = taxableIncome;
        let tax = 0;
        let previousLimit = 0;

        for (const bracket of fedBrackets) {
            if (remainingIncome <= 0) break;

            const taxableInBracket = Math.min(remainingIncome, bracket.limit - previousLimit);
            tax += taxableInBracket * bracket.rate;

            remainingIncome -= taxableInBracket;
            previousLimit = bracket.limit;
        }
        return tax;
    };

    const taxableIncome = Math.max(0, income - deductions);
    const fedTaxRaw = calculateFederalTax(taxableIncome);
    const fedTax = Math.max(0, fedTaxRaw - credits);

    const stateRate = stateRates[state] || 0.05; // Fallback 5%
    const stateTax = taxableIncome * stateRate;

    const totalTax = fedTax + stateTax;
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

    return (
        <section className="bg-white border border-black/5 rounded-sm p-8">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Inputs */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Inputs</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm text-muted mb-2">Filing Status</label>
                            <select
                                value={filingStatus}
                                onChange={(e) => {
                                    setFilingStatus(e.target.value);
                                    if (e.target.value === 'single') setDeductions(14600);
                                    if (e.target.value === 'married') setDeductions(29200);
                                }}
                                className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink bg-white"
                            >
                                <option value="single">Single</option>
                                <option value="married">Married Filing Jointly</option>
                                <option value="head">Head of Household</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">Gross Annual Income</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="text"
                                    value={income.toLocaleString()}
                                    onChange={(e) => setIncome(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">State</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink bg-white"
                            >
                                <option value="CA">California</option>
                                <option value="NY">New York</option>
                                <option value="TX">Texas</option>
                                <option value="FL">Florida</option>
                                <option value="WA">Washington</option>
                                <option value="DE">Delaware</option>
                                <option value="MA">Massachusetts</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-muted mb-2">Deductions</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={deductions.toLocaleString()}
                                        onChange={(e) => setDeductions(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-muted mb-2">Tax Credits</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                    <input
                                        type="text"
                                        value={credits.toLocaleString()}
                                        onChange={(e) => setCredits(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Tax Liability</h3>

                    <div className="bg-gray-50 rounded-sm p-6 mb-6">
                        <div className="text-sm text-muted uppercase tracking-wider mb-2">Estimated Total Tax</div>
                        <div className="text-6xl font-serif text-ink mb-2">
                            ${Math.round(totalTax).toLocaleString()}
                        </div>
                        <div className="text-lg text-muted">
                            Effective Rate: {effectiveRate.toFixed(1)}%
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 border border-black/5 rounded-sm">
                            <div>
                                <div className="text-sm font-semibold text-ink">Federal Tax</div>
                                <div className="text-xs text-muted">Based on 2024 Brackets</div>
                            </div>
                            <div className="font-mono text-lg text-ink">
                                ${Math.round(fedTax).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4 border border-black/5 rounded-sm">
                            <div>
                                <div className="text-sm font-semibold text-ink">State Tax ({state})</div>
                                <div className="text-xs text-muted">Estimated Flat Rate</div>
                            </div>
                            <div className="font-mono text-lg text-ink">
                                ${Math.round(stateTax).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4 border border-black/5 rounded-sm bg-blue-50/50">
                            <div>
                                <div className="text-sm font-semibold text-ink">Take Home Pay</div>
                                <div className="text-xs text-muted">Annual Projection</div>
                            </div>
                            <div className="font-mono text-lg text-ink">
                                ${Math.round(income - totalTax).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IncomeTaxCalculator;
