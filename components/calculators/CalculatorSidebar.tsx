import React from 'react';
import { X } from 'lucide-react';

interface Calculator {
    id: string;
    name: string;
    descriptor?: string;
}

interface CalculatorSidebarProps {
    calculators: Calculator[];
    activeId: string;
    onSelect: (id: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const CalculatorSidebar: React.FC<CalculatorSidebarProps> = ({
    calculators,
    activeId,
    onSelect,
    isOpen,
    onClose
}) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-black/10 z-50
          w-80 flex flex-col transition-transform duration-300 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Header */}
                <div className="px-6 py-8 border-b border-black/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-serif text-2xl text-ink font-medium">Calculators</h2>
                            <p className="text-sm text-muted mt-1">Financial metrics toolkit</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-sm transition-colors"
                        >
                            <X size={20} className="text-muted" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {calculators.map((calc) => (
                            <li key={calc.id}>
                                <button
                                    onClick={() => {
                                        onSelect(calc.id);
                                        onClose();
                                    }}
                                    className={`
                    w-full text-left px-4 py-3 rounded-sm transition-colors
                    ${activeId === calc.id
                                            ? 'bg-ink text-white'
                                            : 'text-ink hover:bg-gray-50'
                                        }
                  `}
                                >
                                    <div className="font-medium text-sm">{calc.name}</div>
                                    {calc.descriptor && (
                                        <div
                                            className={`text-xs mt-0.5 ${activeId === calc.id ? 'text-white/70' : 'text-muted'
                                                }`}
                                        >
                                            {calc.descriptor}
                                        </div>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer CTA */}
                <div className="p-6 border-t border-black/10">
                    <a
                        href="https://cal.com/ayush-garg-ledger/discovery-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-ink text-white px-4 py-3 rounded-sm text-sm font-medium hover:bg-black transition-colors"
                    >
                        Book a CFO Call
                    </a>
                </div>
            </aside>
        </>
    );
};

export default CalculatorSidebar;
