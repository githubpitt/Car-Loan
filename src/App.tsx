import { motion } from 'framer-motion';
import FloatingTabBar from './components/layout/FloatingTabBar';
import GlassCard from './components/ui/GlassCard';
import IOSButton from './components/ui/IOSButton';

function App() {
  return (
    <main className="min-h-screen w-full relative overflow-x-hidden pt-safe-top pb-[120px]"> {/* Bottom padding for tab bar */}

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/5 backdrop-blur-sm">
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
      <div className="px-4 space-y-6">

        {/* Featured Card */}
        <GlassCard intensity="high" className="p-6 relative overflow-hidden h-[240px] flex flex-col justify-between !bg-white/60 !border-white/60">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-black/5 text-xs font-medium text-black/60 mb-2 border border-black/5">
              Tesla Model 3
            </span>
            <h2 className="text-4xl font-light tracking-tight text-black">$43,500</h2>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Interest Rate</span>
              <span className="text-black font-semibold">6.5%</span>
            </div>
            <div className="w-full bg-black/5 h-1 rounded-full overflow-hidden">
              <div className="w-[60%] h-full bg-black rounded-full" />
            </div>
          </div>
        </GlassCard>

        {/* Input Section Preview */}
        <section className="grid grid-cols-2 gap-4">
          <GlassCard className="p-4 flex flex-col items-center justify-center gap-2 aspect-square !bg-white/80">
            <span className="text-2xl font-bold text-black">60</span>
            <span className="text-sm text-gray-500">Months</span>
          </GlassCard>

          <GlassCard className="p-4 flex flex-col items-center justify-center gap-2 aspect-square !bg-white/80">
            <span className="text-2xl font-bold text-black">$5k</span>
            <span className="text-sm text-gray-500">Down</span>
          </GlassCard>
        </section>

        <IOSButton className="w-full font-bold text-lg bg-black text-white shadow-xl shadow-black/10">
          Calculate Payment
        </IOSButton>

      </div>

      <FloatingTabBar />
    </main>
  );
}

export default App;
