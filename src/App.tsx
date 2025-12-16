import { motion } from 'framer-motion';
import FloatingTabBar from './components/layout/FloatingTabBar';
import IOSButton from './components/ui/IOSButton';
import { LoanCalculator } from './components/calculator/LoanCalculator';

function App() {
  return (
    <main className="min-h-screen w-full relative pt-safe-top pb-[140px]"> {/* Bottom padding for tab bar */}

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Car Loan</span>
          <h1 className="text-3xl font-bold tracking-tight text-black">Calculator</h1>
        </motion.div>

        <IOSButton variant="glass" size="sm" className="rounded-full !p-3 bg-white shadow-sm border-0">
          <div className="w-5 h-5 bg-black rounded-full opacity-80" />
        </IOSButton>
      </header>

      {/* Content Area */}
      <div className="px-4 mt-6 space-y-6">
        <LoanCalculator />
      </div>

      <FloatingTabBar />
    </main>
  );
}

export default App;
