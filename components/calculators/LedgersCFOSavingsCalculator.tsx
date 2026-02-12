import React, { useState } from 'react';

const LedgersCFOSavingsCalculator: React.FC = () => {
    const [companySize, setCompanySize] =
        useState<'seed' | 'seriesA' | 'seriesB'>('seed');
    const [hoursPerWeek, setHoursPerWeek] = useState(10);

    const costData = {
        seed: {
            fullTimeCFO: 180_000,
            fractionalCFO: 60_000,
            ledgersCFO: 24_000,
            errorRisk: 4
        },
        seriesA: {
            fullTimeCFO: 220_000,
            fractionalCFO: 80_000,
            ledgersCFO: 36_000,
            errorRisk: 6
        },
        seriesB: {
            fullTimeCFO: 280_000,
            fractionalCFO: 100_000,
            ledgersCFO: 48_000,
            errorRisk: 8
        }
    };

    const costs = costData[companySize];

    const savingsVsFull = costs.fullTimeCFO - costs.ledgersCFO;
    const savingsVsFractional = costs.fractionalCFO - costs.ledgersCFO;

    const timeSaved = hoursPerWeek * 52;

    // Conservative estimate: number of costly finance/compliance errors avoided per year
    const errorsAvoided = Math.max(
        1,
        Math.round((timeSaved / 500) * costs.errorRisk)
    );

    let insight =
        'Use this calculator to estimate the financial and operational ROI of outsourcing finance leadership.';
    let health: 'High ROI' | 'Moderate ROI' | 'Low ROI' = 'Moderate ROI';

    if (savingsVsFull > 100_000 && timeSaved > 300) {
        health = 'High ROI';
        insight =
            'Strong ROI profile. LedgersCFO meaningfully reduces cost, frees leadership bandwidth, and lowers financial risk.';
    } else if (savingsVsFull > 50_000) {
        health = 'Moderate ROI';
        insight =
            'Clear cost and time benefits. Particularly valuable if your team lacks in-house finance expertise.';
    } else {
        health = 'Low ROI';
        insight =
            'Cost savings are modest at this stage, but time savings and risk reduction may still justify the investment.';
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
                                    Company Stage
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['seed', 'seriesA', 'seriesB'] as const).map(
                                        (stage) => (
                                            <button
                                                key={stage}
                                                onClick={() =>
                                                    setCompanySize(stage)
                                                }
                                                className={`px-4 py-3 rounded-sm font-medium transition-colors ${companySize === stage
                                                        ? 'bg-ink text-white'
                                                        : 'bg-gray-100 text-muted hover:bg-gray-200'
                                                    }`}
                                            >
                                                {stage === 'seriesA'
                                                    ? 'Series A'
                                                    : stage === 'seriesB'
                                                        ? 'Series B'
                                                        : 'Seed'}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Hours Spent on Finance (Weekly)
                                </label>
                                <input
                                    type="number"
                                    value={hoursPerWeek}
                                    onChange={(e) =>
                                        setHoursPerWeek(
                                            Math.max(
                                                0,
                                                Number(e.target.value) || 0
                                            )
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">
                            Results
                        </h3>

                        {/* Cost Comparison */}
                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm text-muted uppercase tracking-wider mb-4">
                                Annual Cost Comparison
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">
                                        Full-Time CFO
                                    </span>
                                    <span className="text-ink font-mono">
                                        $
                                        {costs.fullTimeCFO.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">
                                        Fractional CFO
                                    </span>
                                    <span className="text-ink font-mono">
                                        $
                                        {costs.fractionalCFO.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between pt-3 border-t border-black/10">
                                    <span className="text-ink font-semibold">
                                        LedgersCFO
                                    </span>
                                    <span className="text-ink font-mono font-semibold">
                                        $
                                        {costs.ledgersCFO.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Savings */}
                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm font-semibold text-ink mb-2">
                                Annual Savings
                            </div>

                            <div className="text-4xl font-serif text-ink mb-2">
                                ${savingsVsFull.toLocaleString()}
                            </div>

                            <div className="text-sm text-muted">
                                vs. full-time CFO (${savingsVsFractional.toLocaleString()} vs.
                                fractional)
                            </div>
                        </div>

                        {/* Time + Risk */}
                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="font-semibold text-ink">
                                        Time Saved:
                                    </span>{' '}
                                    {timeSaved} hours/year
                                </div>
                                <div>
                                    <span className="font-semibold text-ink">
                                        Potential Errors Avoided:
                                    </span>{' '}
                                    ~{errorsAvoided} per year
                                </div>
                            </div>
                        </div>

                        {/* CFO Insight */}
                        <div className="bg-gray-50 rounded-sm p-6 mt-6">
                            <div className="text-sm font-semibold text-ink mb-2">
                                CFO Insight:
                            </div>
                            <p className="text-sm text-muted leading-relaxed">
                                {insight}
                            </p>
                            <div className="text-sm text-muted mt-3">
                                ROI Profile: {health}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="mt-6 text-sm text-muted italic">
                Estimates are directional and based on typical startup finance
                workloads and market compensation. Actual savings and risk
                reduction may vary by company.
            </div>
        </>
    );
};

export default LedgersCFOSavingsCalculator;
