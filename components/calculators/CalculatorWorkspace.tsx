import React from 'react';

interface CalculatorWorkspaceProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const CalculatorWorkspace: React.FC<CalculatorWorkspaceProps> = ({
    title,
    description,
    children
}) => {
    return (
        <div className="flex-1 bg-gray-50 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="font-serif text-4xl text-ink font-medium mb-3">
                        {title}
                    </h1>
                    <p className="text-lg text-muted leading-relaxed max-w-3xl">
                        {description}
                    </p>
                </header>

                {/* Calculator Content */}
                <div className="space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CalculatorWorkspace;
