import React, { useState } from "react";

const DelawareFranchiseTaxCalculator: React.FC = () => {
    const [authorizedShares, setAuthorizedShares] = useState(1_000_000);
    const [issuedShares, setIssuedShares] = useState(100_000);
    const [assets, setAssets] = useState(100_000);

    const SERVICE_FEE = 150;
    const STATE_FILING_FEE = 50;

    const calculateSharesMethod = () => {
        const estimated = Math.max(
            175,
            Math.ceil(authorizedShares / 10_000) * 85
        );
        return Math.min(estimated, 200_000);
    };

    const calculateParValueMethod = () => {
        if (issuedShares === 0) return null;

        const assumedParValue = assets / issuedShares;
        const capital = assumedParValue * authorizedShares;

        const tax = Math.max(400, Math.ceil(capital / 1_000_000) * 400);
        return Math.min(tax, 200_000);
    };

    const sharesTax = calculateSharesMethod();
    const parTax = calculateParValueMethod();

    let franchiseTax = sharesTax;
    let methodUsed = "Authorized Shares Method";

    if (parTax !== null && parTax < sharesTax) {
        franchiseTax = parTax;
        methodUsed = "Assumed Par Value Capital Method";
    }

    const totalCost = franchiseTax + SERVICE_FEE + STATE_FILING_FEE;

    return (
        <>
            {/* Main Content */}
            <section className="bg-white border border-black/10 rounded-sm p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Inputs */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">Inputs</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Authorized Shares
                                </label>
                                <input
                                    type="number"
                                    value={authorizedShares}
                                    onChange={(e) =>
                                        setAuthorizedShares(Number(e.target.value) || 0)
                                    }
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Issued Shares
                                </label>
                                <input
                                    type="number"
                                    value={issuedShares}
                                    onChange={(e) =>
                                        setIssuedShares(Number(e.target.value) || 0)
                                    }
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-muted mb-2">
                                    Total Assets ($)
                                </label>
                                <input
                                    type="number"
                                    value={assets}
                                    onChange={(e) => setAssets(Number(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        <h3 className="text-lg font-semibold text-ink mb-6">Results</h3>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="text-sm text-muted uppercase tracking-wider mb-4">
                                Estimated Franchise Tax
                            </div>

                            <div className="text-5xl font-serif text-ink mb-2">
                                ${franchiseTax.toLocaleString()}
                            </div>

                            <div className="text-sm text-muted">
                                Calculated using{" "}
                                <span className="font-medium text-ink">{methodUsed}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6 mb-6">
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted">Delaware Franchise Tax</span>
                                    <span className="font-mono text-ink">
                                        ${franchiseTax.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted">Delaware State Filing Fee</span>
                                    <span className="font-mono text-ink">
                                        ${STATE_FILING_FEE}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-muted">
                                        Annual Report Filing (LedgersCFO)
                                    </span>
                                    <span className="font-mono text-ink">
                                        ${SERVICE_FEE}
                                    </span>
                                </div>

                                <div className="flex justify-between pt-3 border-t border-black/10 font-semibold">
                                    <span className="text-ink">Total Compliance Cost</span>
                                    <span className="font-mono text-ink">
                                        ${totalCost.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6">
                            <div className="text-sm font-semibold text-ink mb-2">
                                CFO Insight:
                            </div>
                            <p className="text-sm text-muted leading-relaxed">
                                Delaware allows companies to choose the lower of two franchise tax
                                calculation methods. This estimate automatically applies the
                                method that minimizes your tax liability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="mt-6 text-sm text-muted italic">
                This calculator provides an estimate only and does not constitute legal
                or tax advice. Actual franchise tax may vary based on filings and changes
                during the year.
            </div>
        </>
    );
};

export default DelawareFranchiseTaxCalculator;
