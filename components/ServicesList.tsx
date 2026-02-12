import React from 'react';

const ServicesList: React.FC = () => {
    const services = [
        { title: "Fractional CFO", desc: "Planning, forecasting, and decision support — not slides for the sake of slides." },
        { title: "Incorporation", desc: "Entity setup that scales Delaware C-Corps" },
        { title: "Bookkeeping", desc: "Accurate, accrual-basis books delivered on time. Every month." },
        { title: "Tax & Compliance", desc: "Federal, state, and local filings. R&D credits identified and claimed." },
        { title: "Payroll", desc: "Domestic and international payroll setup and management." },
        { title: "Sales Tax", desc: "Nexus analysis and automated filing across all jurisdictions." },
        { title: "Cross-border Compliance", desc: "FEMA/RBI compliance for India operations (FDI, ODI, FLA)." },
        { title: "FP&A", desc: "Budget vs Actuals, unit economics, and burn rate analysis." }
    ];

    return (
        <section id="services" className="py-24 bg-paper border-t border-black/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-16 px-4">
                    <h2 className="text-4xl font-serif text-ink mb-4">
                        Services. <span className="text-muted italic">Everything you need. Nothing you don't.</span>
                    </h2>
                    <p className="text-lg text-muted">Everything below is owned by one team. No handoffs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    {services.map((service, i) => (
                        <div key={i} className="group py-8 border-b border-black/5 px-4 hover:bg-white hover:shadow-sm transition-all">
                            <h3 className="text-xl font-bold text-ink mb-2 group-hover:translate-x-1 transition-transform inline-block">
                                {service.title}
                            </h3>
                            <p className="text-muted text-lg leading-relaxed max-w-md">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesList;
