import React, { useState } from 'react';

const RnDTaxCreditCalculator: React.FC = () => {
    const [method, setMethod] = useState<'regular' | 'asc'>('regular');
    const [wages, setWages] = useState(500000);
    const [supplies, setSupplies] = useState(50000);
    const [contractExpenses, setContractExpenses] = useState(100000);
    const [baseAmount, setBaseAmount] = useState(100000);

    // Total QRE = Wages + Supplies + 65% of Contract Expenses
    const totalQRE = wages + supplies + contractExpenses * 0.65;

    let credit = 0;
    let calculationBreakdown: { label: string; value: number | string }[] = [];

    if (method === 'regular') {
        const incrementalQRE = Math.max(0, totalQRE - baseAmount);
        credit = incrementalQRE * 0.2;

        calculationBreakdown = [
            { label: 'Total QRE', value: totalQRE },
            { label: 'Base Amount', value: baseAmount },
            { label: 'Incremental QRE', value: incrementalQRE },
            { label: 'Credit Rate', value: '20%' },
        ];
    } else {
        const base = baseAmount > 0 ? baseAmount : totalQRE * 0.5;
        const excessQRE = Math.max(0, totalQRE - base * 0.5);
        credit = excessQRE * 0.14;

        calculationBreakdown = [
            { label: 'Total QRE', value: totalQRE },
            { label: 'Base (Avg QRE)', value: base },
            { label: '50% of Base', value: base * 0.5 },
            { label: 'Excess QRE', value: excessQRE },
            { label: 'Credit Rate', value: '14%' },
        ];
    }

    const parseCurrency = (value: string) =>
        parseInt(value.replace(/,/g, '')) || 0;

    return (
        <section className="bg-white border border-black/5 rounded-sm p-8">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Inputs */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Inputs</h3>

                    <div className="space-y-6">
                        {/* Method */}
                        <div>
                            <label className="block text-sm text-muted mb-2">
                                Calculation Method
                            </label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setMethod('regular')}
                                    className={`flex-1 py-2 px-4 rounded-sm border ${method === 'regular'
                                            ? 'bg-ink text-white border-ink'
                                            : 'bg-white text-ink border-black/10'
                                        }`}
                                >
                                    Regular
                                </button>
                                <button
                                    onClick={() => setMethod('asc')}
                                    className={`flex-1 py-2 px-4 rounded-sm border ${method === 'asc'
                                            ? 'bg-ink text-white border-ink'
                                            : 'bg-white text-ink border-black/10'
                                        }`}
                                >
                                    ASC
                                </button>
                            </div>
                        </div>

                        {/* Wages */}
                        <div>
                            <label className="block text-sm text-muted mb-2">
                                R&D Wages
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="text"
                                    value={wages.toLocaleString()}
                                    onChange={(e) =>
                                        setWages(parseCurrency(e.target.value))
                                    }
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>

                        {/* Supplies */}
                        <div>
                            <label className="block text-sm text-muted mb-2">
                                Supplies Cost
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="text"
                                    value={supplies.toLocaleString()}
                                    onChange={(e) =>
                                        setSupplies(parseCurrency(e.target.value))
                                    }
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>

                        {/* Contract Research Expenses (FIXED ALIGNMENT) */}
                        <div>
                            <label className="block text-sm text-muted mb-2">
                                Contract Research Expenses
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="text"
                                    value={contractExpenses.toLocaleString()}
                                    onChange={(e) =>
                                        setContractExpenses(
                                            parseCurrency(e.target.value)
                                        )
                                    }
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-ink"
                                />
                            </div>
                            <p className="text-xs text-muted mt-1">
                                * 65% allowability applied automatically
                            </p>
                        </div>

                        {/* Base Amount */}
                        <div>
                            <label className="block text-sm text-muted mb-2">
                                {method === 'regular'
                                    ? 'Base Amount'
                                    : 'Avg QRE (Past 3 Years)'}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                                <input
                                    type="text"
                                    value={baseAmount.toLocaleString()}
                                    onChange={(e) =>
                                        setBaseAmount(
                                            parseCurrency(e.target.value)
                                        )
                                    }
                                    className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-ink"
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
                        <div className="text-sm text-muted uppercase mb-2">
                            Estimated R&D Tax Credit
                        </div>
                        <div className="text-6xl font-serif text-ink">
                            ${Math.round(credit).toLocaleString()}
                        </div>
                        <p className="text-sm text-muted mt-4">
                            Only an estimate. Consult a tax professional.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-sm p-6">
                        <h4 className="text-sm font-semibold mb-4">
                            Calculation Breakdown
                        </h4>
                        <div className="space-y-3">
                            {calculationBreakdown.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between text-sm"
                                >
                                    <span className="text-muted">
                                        {item.label}
                                    </span>
                                    <span className="font-medium">
                                        {typeof item.value === 'number'
                                            ? `$${Math.round(
                                                item.value
                                            ).toLocaleString()}`
                                            : item.value}
                                    </span>
                                </div>
                            ))}
                            <div className="border-t border-black/10 pt-3 flex justify-between font-semibold text-sm">
                                <span>Total Credit</span>
                                <span>
                                    ${Math.round(credit).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RnDTaxCreditCalculator;
