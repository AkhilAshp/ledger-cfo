import React from 'react';
import { Check } from 'lucide-react';

const WhyLedgersCFO: React.FC = () => {
    const reasons = [
        {
            title: "CFO-led execution",
            desc: "Senior professionals own your numbers, ensuring strategy aligns with execution."
        },
        {
            title: "Real-time visibility",
            desc: "Not month-end surprises. Know your cash position every single day."
        },
        {
            title: "Built for global founders",
            desc: "US and India entities handled together seamlessly."
        },
        {
            title: "Always investor-ready",
            desc: "Clean books and defensible numbers that stand up to due diligence."
        },
        {
            title: "Flat pricing",
            desc: "Predictable, boring, fair. No hourly billing surprises."
        }
    ];

    return (
        <section className="py-24 bg-paper">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl sm:text-5xl font-serif text-ink mb-6">
                        This isn’t outsourced accounting. <br />
                        <span className="italic text-muted">It’s financial leadership.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {reasons.map((reason, i) => (
                        <div key={i} className="relative pl-8 border-l border-black/10">
                            <h3 className="text-xl font-bold text-ink mb-3">{reason.title}</h3>
                            <p className="text-muted leading-relaxed">
                                {reason.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyLedgersCFO;
