import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import CalculatorSidebar from '../calculators/CalculatorSidebar';
import CalculatorWorkspace from '../calculators/CalculatorWorkspace';
import RunwayCalculator from '../calculators/RunwayCalculator';
import DelawareFranchiseTaxCalculator from '../calculators/DelawareFranchiseTaxCalculator';
import BurnMultipleCalculator from '../calculators/BurnMultipleCalculator';
import CACPaybackCalculator from '../calculators/CACPaybackCalculator';
import LTVCACCalculator from '../calculators/LTVCACCalculator';
import RevenueGrowthCalculator from '../calculators/RevenueGrowthCalculator';
import OpExBreakdownCalculator from '../calculators/OpExBreakdownCalculator';
import BreakEvenCalculator from '../calculators/BreakEvenCalculator';
import CashConversionCalculator from '../calculators/CashConversionCalculator';
import LedgersCFOSavingsCalculator from '../calculators/LedgersCFOSavingsCalculator';
import ValuationImpactCalculator from '../calculators/ValuationImpactCalculator';

interface Calculator {
    id: string;
    name: string;
    descriptor: string;
    description: string;
    component: React.FC;
}

const calculators: Calculator[] = [
    {
        id: 'runway',
        name: 'Runway Calculator',
        descriptor: 'Cash runway analysis',
        description: 'Calculate how many months of cash you have left based on current burn rate and cash balance.',
        component: RunwayCalculator
    },
    {
        id: 'delaware-franchise-tax',
        name: 'Delaware Franchise Tax',
        descriptor: 'Tax & compliance cost',
        description: 'Estimate your Delaware franchise tax and total annual compliance cost based on authorized shares and assets.',
        component: DelawareFranchiseTaxCalculator
    },
    {
        id: 'burn-multiple',
        name: 'Burn Multiple',
        descriptor: 'Capital efficiency',
        description: 'Measure capital efficiency by comparing net burn to net new ARR. Lower is better.',
        component: BurnMultipleCalculator
    },
    {
        id: 'cac-payback',
        name: 'CAC Payback Period',
        descriptor: 'Customer acquisition',
        description: 'Calculate how long it takes to recover customer acquisition costs through gross margin.',
        component: CACPaybackCalculator
    },
    {
        id: 'ltv-cac',
        name: 'LTV:CAC Ratio',
        descriptor: 'Unit economics',
        description: 'Evaluate unit economics by comparing customer lifetime value to acquisition cost. Target 3:1 or higher.',
        component: LTVCACCalculator
    },
    {
        id: 'revenue-growth',
        name: 'Revenue Growth Rate',
        descriptor: 'Growth tracking',
        description: 'Track month-over-month or year-over-year revenue growth to measure business momentum.',
        component: RevenueGrowthCalculator
    },
    {
        id: 'opex-breakdown',
        name: 'Operating Expense Breakdown',
        descriptor: 'Spend planning',
        description: 'Plan your operating spend across COGS, Sales & Marketing, R&D, and G&A categories.',
        component: OpExBreakdownCalculator
    },
    {
        id: 'break-even',
        name: 'Break-Even Analysis',
        descriptor: 'Profitability planning',
        description: 'Determine the units and revenue needed to cover fixed costs and reach profitability.',
        component: BreakEvenCalculator
    },
    {
        id: 'cash-conversion',
        name: 'Cash Conversion Cycle',
        descriptor: 'Working capital',
        description: 'Measure how quickly you convert investments in inventory and operations back into cash.',
        component: CashConversionCalculator
    },
    {
        id: 'ledgerscfo-savings',
        name: 'What LedgersCFO Saves You',
        descriptor: 'Cost comparison',
        description: 'Calculate cost and time savings compared to traditional full-time or fractional CFO options.',
        component: LedgersCFOSavingsCalculator
    },
    {
        id: 'valuation-impact',
        name: 'Valuation Impact',
        descriptor: 'Metric optimization',
        description: 'Estimate how improved financial metrics can increase your company valuation and investor appeal.',
        component: ValuationImpactCalculator
    }
];

const CalculatorsPage: React.FC = () => {
    const { calculatorId } = useParams<{ calculatorId?: string }>();
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(calculatorId || 'runway');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (calculatorId && calculatorId !== activeId) {
            setActiveId(calculatorId);
        }
    }, [calculatorId]);

    const handleSelect = (id: string) => {
        setActiveId(id);
        navigate(`/resources/calculators/${id}`, { replace: true });
    };

    const activeCalculator = calculators.find(c => c.id === activeId) || calculators[0];
    const CalculatorComponent = activeCalculator.component;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <CalculatorSidebar
                calculators={calculators}
                activeId={activeId}
                onSelect={handleSelect}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
                    >
                        <Menu size={24} className="text-ink" />
                    </button>
                    <h2 className="font-serif text-xl text-ink font-medium">Calculators</h2>
                    <div className="w-10"></div>
                </div>

                {/* Workspace */}
                <CalculatorWorkspace
                    title={activeCalculator.name}
                    description={activeCalculator.description}
                >
                    <CalculatorComponent />
                </CalculatorWorkspace>
            </div>
        </div>
    );
};

export default CalculatorsPage;
