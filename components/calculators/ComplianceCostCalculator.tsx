import React, { useState } from 'react';

const ComplianceCostCalculator: React.FC = () => {
    const [entityType, setEntityType] = useState('LLC');
    const [state, setState] = useState('DE');
    const [revenue, setRevenue] = useState(500000);
    const [employees, setEmployees] = useState(2);

    // Estimation Logic (Simplified for Demo)
    const baseFilingFee = state === 'CA' ? 800 : state === 'DE' ? 300 : 100;
    const payrollCost = employees * 12 * 50; // $50/mo per employee approx
    const legalAgentFee = 200; // Average registered agent fee
    const taxPrepBase = entityType === 'C-Corp' ? 2000 : 1000;
    const taxPrep = taxPrepBase + (revenue > 1000000 ? 1000 : 0);

    const totalCost = baseFilingFee + payrollCost + legalAgentFee + taxPrep;

    const breakdown = [
        { label: 'State Filing Fees', value: baseFilingFee },
        { label: 'Payroll Service (Est.)', value: payrollCost },
        { label: 'Legal / Registered Agent', value: legalAgentFee },
        { label: 'Tax Preparation', value: taxPrep },
    ];

    return (
        <section className="bg-white border border-black/5 rounded-sm p-8">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Inputs */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Inputs</h3>
                    <div className="space-y-6">
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
                            <label className="block text-sm text-muted mb-2">State of Formation</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink bg-white"
                            >
                                <option value="DE">Delaware</option>
                                <option value="CA">California</option>
                                <option value="NY">New York</option>
                                <option value="TX">Texas</option>
                                <option value="FL">Florida</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">Annual Revenue</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="text"
                                    value={revenue.toLocaleString()}
                                    onChange={(e) => setRevenue(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">Number of Employees</label>
                            <input
                                type="number"
                                value={employees}
                                onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Estimated Cost</h3>

                    <div className="bg-gray-50 rounded-sm p-6 mb-6">
                        <div className="text-sm text-muted uppercase tracking-wider mb-2">Annual Compliance Cost</div>
                        <div className="text-6xl font-serif text-ink mb-2">
                            ${Math.round(totalCost).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted mt-4">
                            Includes state filings, basic legal maintenance, payroll, and tax prep.
                        </div>
                    </div>

                    <div className="bg-white border border-black/5 rounded-sm p-6">
                        <h4 className="text-sm font-semibold text-ink mb-4">Cost Breakdown</h4>
                        <div className="space-y-3">
                            {breakdown.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm items-center">
                                    <span className="text-muted">{item.label}</span>
                                    <span className="font-medium text-ink">
                                        ${Math.round(item.value).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                            <div className="border-t border-black/10 pt-3 flex justify-between text-sm font-semibold mt-4">
                                <span>Total Estimated</span>
                                <span>${Math.round(totalCost).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplianceCostCalculator;
