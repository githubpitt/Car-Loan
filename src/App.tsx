import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingTabBar from './components/layout/FloatingTabBar';
import IOSButton from './components/ui/IOSButton';
import { LoanCalculator } from './components/calculator/LoanCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <main className="min-h-screen w-full relative pt-safe-top pb-[140px]"> {/* Bottom padding for tab bar */}

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 transition-all duration-300">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Car Loan</span>
          <h1 className="text-3xl font-bold tracking-tight text-black capitalize">
            {activeTab === 'calculator' ? 'Calculator' : activeTab}
          </h1>
        </motion.div>

        <IOSButton variant="glass" size="sm" className="rounded-full !p-3 bg-white shadow-sm border-0">
          <div className="w-5 h-5 bg-black rounded-full opacity-80" />
        </IOSButton>
      </header>

      {/* Content Area */}
      <div className="px-4 mt-6 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'calculator' && <LoanCalculator />}
            {activeTab === 'home' && (
              <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                <h2 className="text-xl font-semibold text-black">Dashboard</h2>
                <p className="text-gray-500">Your saved loans and featured offers will appear here.</p>
              </div>
            )}
            {activeTab === 'garage' && (
              <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🏎️</span>
                </div>
                <h2 className="text-xl font-semibold text-black">My Garage</h2>
                <p className="text-gray-500">Save your dream cars and comparing financing options.</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">⚙️</span>
                </div>
                <h2 className="text-xl font-semibold text-black">Settings</h2>
                <p className="text-gray-500">App preferences, currency settings, and default rates.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <FloatingTabBar currentTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}

export default App;
