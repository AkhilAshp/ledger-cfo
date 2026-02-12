import React, { useState } from 'react';

const DueDateCalculator: React.FC = () => {
    const [entityType, setEntityType] = useState('LLC'); // LLC/Partnership vs C-Corp/S-Corp
    const [fiscalYearEnd, setFiscalYearEnd] = useState('12-31');
    const [state, setState] = useState('CA');

    // Helper to format date
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Helper to adjust for weekends (simplified unique logic)
    const adjustForWeekend = (date: Date) => {
        const day = date.getDay();
        if (day === 0) date.setDate(date.getDate() + 1); // Sunday -> Monday
        else if (day === 6) date.setDate(date.getDate() + 2); // Saturday -> Monday
        return date;
    };

    // Logic
    // Partnerships (LLC default): March 15 (3rd month, 15th day)
    // S-Corps: March 15
    // C-Corps: April 15 (4th month, 15th day) - assuming Dec 31 FYE
    // Extensions: usually 6 months

    // Parse FYE
    const currentYear = new Date().getFullYear();
    // If we are past the due date in current year, show next year? 
    // For simplicity, let's just show the due date for the CURRENT tax year (which is usually filed next year).
    // Let's assume we are planning for the UPCOMING filing season.
    const [fyeMonth, fyeDay] = fiscalYearEnd.split('-').map(Number);
    const filingYear = currentYear + (new Date().getMonth() > fyeMonth ? 1 : 0);
    // Actually, let's keep it simple: "For Fiscal Year Ending: [Date]" -> "Due Date: [Date]"

    const fyEndDate = new Date(currentYear, fyeMonth - 1, fyeDay);

    // Determine due dates based on entity type
    let fedDueMonthOffset = 3; // Default 15th day of 4th month (April)
    if (entityType === 'LLC' || entityType === 'S-Corp') {
        fedDueMonthOffset = 2; // 15th day of 3rd month (March)
    }

    const fedDueDate = new Date(fyEndDate);
    fedDueDate.setMonth(fedDueDate.getMonth() + fedDueMonthOffset + 1); // +1 because we want the NEXT year usually
    fedDueDate.setDate(15);
    adjustForWeekend(fedDueDate);

    // Extension
    const extensionDate = new Date(fedDueDate);
    extensionDate.setMonth(extensionDate.getMonth() + 6);
    adjustForWeekend(extensionDate);

    // State Due Date (Simplified: same as Fed or +1 month or specific)
    const stateDueDate = new Date(fedDueDate);
    if (state === 'TX' && entityType !== 'LLC') {
        stateDueDate.setMonth(stateDueDate.getMonth() + 1); // May 15 for TX Franchise sometimes
        adjustForWeekend(stateDueDate);
    }
    // Most states follow Fed

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
                                <option value="LLC">LLC (Partnership)</option>
                                <option value="S-Corp">S-Corporation</option>
                                <option value="C-Corp">C-Corporation</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">Fiscal Year End</label>
                            <select
                                value={fiscalYearEnd}
                                onChange={(e) => setFiscalYearEnd(e.target.value)}
                                className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink bg-white"
                            >
                                <option value="12-31">December 31 (Calendar Year)</option>
                                <option value="03-31">March 31</option>
                                <option value="06-30">June 30</option>
                                <option value="09-30">September 30</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">State</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-4 py-3 border border-black/10 rounded-sm text-ink focus:outline-none focus:border-ink bg-white"
                            >
                                <option value="CA">California</option>
                                <option value="NY">New York</option>
                                <option value="DE">Delaware</option>
                                <option value="TX">Texas</option>
                                <option value="FL">Florida</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div>
                    <h3 className="text-lg font-semibold text-ink mb-6">Key Dates</h3>

                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-ink">
                            <div className="text-sm text-muted uppercase tracking-wider mb-1">Federal Return Due Date</div>
                            <div className="text-2xl font-serif text-ink font-medium">
                                {formatDate(fedDueDate)}
                            </div>
                            <div className="text-sm text-muted mt-2">
                                Form 1065/1120/1120-S
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-blue-600">
                            <div className="text-sm text-muted uppercase tracking-wider mb-1">State Return Due Date ({state})</div>
                            <div className="text-2xl font-serif text-ink font-medium">
                                {formatDate(stateDueDate)}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-gray-400">
                            <div className="text-sm text-muted uppercase tracking-wider mb-1">Extension Deadline</div>
                            <div className="text-2xl font-serif text-ink font-medium">
                                {formatDate(extensionDate)}
                            </div>
                            <div className="text-sm text-muted mt-2">
                                With valid filed extension (Form 7004)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DueDateCalculator;
