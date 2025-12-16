import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calculator, Settings, Car } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TabItem {
    id: string;
    icon: React.ElementType;
    label: string;
}

const tabs: TabItem[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'calculator', icon: Calculator, label: 'Loan' },
    { id: 'garage', icon: Car, label: 'Garage' },
    { id: 'settings', icon: Settings, label: 'Settings' },
];

const FloatingTabBar = () => {
    const [activeTab, setActiveTab] = React.useState('calculator');

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe-bottom pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
                className="mx-4 mb-4 pointer-events-auto"
            >
                <div className="glass-panel rounded-[2rem] p-2 flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative px-6 py-4 rounded-[1.5rem] flex flex-col items-center justify-center transition-colors"
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-white shadow-md shadow-black/5 rounded-[1.5rem]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <tab.icon
                                className={cn(
                                    "w-6 h-6 relative z-10 transition-colors duration-300",
                                    activeTab === tab.id ? "text-black" : "text-gray-400"
                                )}
                                strokeWidth={activeTab === tab.id ? 2.5 : 2}
                            />
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default FloatingTabBar;
