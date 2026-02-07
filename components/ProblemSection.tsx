import React from 'react';

const ProblemSection: React.FC = () => {
    const problems = [
        "Books that never fully reconcile",
        "Compliance deadlines that sneak up",
        "No real-time visibility into burn or runway",
        "Multiple vendors with no single owner",
        "Last-minute stress before board or investor calls"
    ];

    return (
        <section id="problem" className="py-24 bg-subtle">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-5xl sm:text-6xl font-serif text-ink leading-tight mb-6">
                            Finance shouldn’t slow you down - but for most founders, it still does.
                        </h2>
                    </div>

                    <div className="space-y-8">
                        <ul className="space-y-6">
                            {problems.map((problem, i) => (
                                <li key={i} className="flex items-start gap-4 text-lg sm:text-xl text-ink">
                                    <span className="block mt-2 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
                                    {problem}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-8 block">
                            <p className="text-xl font-serif italic text-ink border-l-2 border-ink pl-6 py-2">
                                LedgersCFO replaces chaos with control.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
