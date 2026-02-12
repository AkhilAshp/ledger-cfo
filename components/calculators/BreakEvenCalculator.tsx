import React, { useState } from 'react';

const BreakEvenCalculator: React.FC = () => {
    const [fixedCosts, setFixedCosts] = useState(100000);
    const [variableCost, setVariableCost] = useState(20);
    const [pricePerUnit, setPricePerUnit] = useState(50);

    const contributionMargin = pricePerUnit - variableCost;

    const breakEvenUnits =
        contributionMargin > 0
            ? Math.ceil(fixedCosts / contributionMargin)
            : null;

    const breakEvenRevenue =
        breakEvenUnits !== null ? breakEvenUnits * pricePerUnit : null;

    let insight =
        'Enter valid inputs to understand how many units you must sell to cover your fixed costs.';
    let health: 'Healthy' | 'Risky' | 'Invalid' | 'N/A' = 'N/A';

    if (pricePerUnit > 0 && variableCost > 0) {
        if (contributionMargin <= 0) {
            health = 'Invalid';
            insight =
                'Your variable cost is equal to or greater than your price. Each sale loses money, making break-even impossible.';
        } else if (breakEvenUnits !== null && breakEvenUnits <= 1000) {
            health = 'Healthy';
            insight =
                'Your break-even point is achievable. The contribution margin supports scalable growth if demand is predictable.';
        } else if (breakEvenUnits !== null) {
            health = 'Risky';
            insight =
                'Your break-even point is high. Consider increasing pricing, reducing variable costs, or lowering fixed expenses.';
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
                                    Fixed Costs (Monthly)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        value={fixedCosts.toLocaleString()}
                                        onChange={(e) => {
                                            const val =
                                                parseInt(
                                                    e.target.value.replace(
                                                        /,/g,
                                                        ''
                                                    )
                                                ) || 0;
                                            setFixedCosts(val);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Variable Cost per Unit
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        value={variableCost}
                                        onChange={(e) =>
                                            setVariableCost(
                                                Number(e.target.value) || 0
                                            )
                                        }
                                        className="w-full pl-8 pr-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Price per Unit
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        value={pricePerUnit}
                                        onChange={(e) =>
                                            setPricePerUnit(
                                                Number(e.target.value) || 0
                                            )
                                        }
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
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-muted mb-1">
                                        Break-Even Units
                                    </div>
                                    <div className="text-5xl font-serif text-ink">
                                        {breakEvenUnits !== null
                                            ? breakEvenUnits.toLocaleString()
                                            : '—'}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-muted mb-1">
                                        Break-Even Revenue
                                    </div>
                                    <div className="text-4xl font-serif text-ink">
                                        {breakEvenRevenue !== null
                                            ? `$${breakEvenRevenue.toLocaleString()}`
                                            : '—'}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-black/10">
                                    <div className="text-sm text-muted mb-1">
                                        Contribution Margin
                                    </div>
                                    <div className="text-3xl font-serif text-ink">
                                        ${contributionMargin}
                                    </div>
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
                Break-even analysis identifies the minimum sales volume required
                to cover fixed costs. Improving contribution margin lowers
                break-even risk.
            </div>
        </>
    );
};

export default BreakEvenCalculator;
