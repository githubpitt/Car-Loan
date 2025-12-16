import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import IOSButton from '../ui/IOSButton';
import { TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const Dashboard = () => {
    return (
        <div className="space-y-8 pb-8">

            {/* Hero Section: Market Insight */}
            <section className="space-y-4">
                <h2 className="px-2 text-xl font-semibold tracking-tight text-black">Market Insight</h2>
                <GlassCard intensity="high" className="p-6 !bg-blue-500/5 !border-blue-500/10 min-h-[200px] flex flex-col justify-between relative overflow-hidden">
                    {/* Abstract Background Art */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />
                    <div className="absolute -left-10 bottom-0 w-32 h-32 bg-purple-500/20 blur-[40px] rounded-full pointer-events-none" />

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 bg-blue-500/10 rounded-full text-blue-600">
                                <TrendingUp size={16} />
                            </span>
                            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Avg. Rate</span>
                        </div>
                        <h3 className="text-4xl font-light text-black tracking-tight">6.54%</h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[80%]">
                            Rates have dropped by <span className="text-green-600 font-semibold">-0.2%</span> this week. Perfect time to refinance.
                        </p>
                    </div>
                </GlassCard>
            </section>

            {/* Quick Actions (Horizontal Scroll) */}
            <section>
                <div className="flex gap-4 overflow-x-auto px-2 pb-4 snap-x snap-mandatory">
                    <QuickAction icon={Zap} label="Pre-qualify" color="bg-orange-500" delay={0.1} />
                    <QuickAction icon={ShieldCheck} label="Insurance" color="bg-green-500" delay={0.2} />
                    <QuickAction icon={TrendingUp} label="Refinance" color="bg-purple-500" delay={0.3} />
                </div>
            </section>

            {/* Featured Vehicles (Horizontal Scroll) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-semibold tracking-tight text-black">Trending Now</h2>
                    <IOSButton variant="glass" size="sm" className="!p-1 !px-3 text-xs">View all</IOSButton>
                </div>

                <div className="flex gap-4 overflow-x-auto px-2 pb-6 snap-x snap-mandatory -mx-4 px-6">
                    <CarCard
                        name="Tesla Model Y"
                        price="$48,990"
                        img="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop"
                        delay={0.1}
                    />
                    <CarCard
                        name="Porsche Taycan"
                        price="$90,900"
                        img="https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600&auto=format&fit=crop"
                        delay={0.2}
                    />
                    <CarCard
                        name="Rivian R1T"
                        price="$73,000"
                        img="https://images.unsplash.com/photo-1669747535794-672522512f46?q=80&w=600&auto=format&fit=crop"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Recent Activity */}
            <section className="space-y-4 px-2">
                <h2 className="text-xl font-semibold tracking-tight text-black">Recent Searches</h2>
                <div className="space-y-3">
                    <HistoryRow label="Tesla Model 3" sub="Est. $650/mo" />
                    <HistoryRow label="Ford F-150" sub="Est. $820/mo" />
                </div>
            </section>
        </div>
    );
};

const QuickAction = ({ icon: Icon, label, color, delay }: any) => (
    <motion.button
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex flex-col items-center gap-3 min-w-[80px] snap-center"
    >
        <div className={`w-16 h-16 rounded-[1.2rem] ${color} flex items-center justify-center text-white shadow-lg shadow-black/5`}>
            <Icon size={28} strokeWidth={2} />
        </div>
        <span className="text-xs font-medium text-gray-500">{label}</span>
    </motion.button>
);

const CarCard = ({ name, price, img, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="min-w-[240px] h-[300px] relative rounded-[2rem] overflow-hidden snap-center flex-shrink-0 shadow-xl shadow-black/10 group active:scale-95 transition-transform duration-200"
    >
        <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
            <h3 className="text-white font-bold text-lg">{name}</h3>
            <p className="text-white/80 text-sm">{price}</p>
        </div>
    </motion.div>
);

const HistoryRow = ({ label, sub }: any) => (
    <GlassCard className="p-4 flex items-center justify-between !bg-white/40 active:scale-[0.98] transition-all">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <ArrowRight size={18} className="text-black/60" />
            </div>
            <div>
                <p className="font-medium text-black">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
            </div>
        </div>
    </GlassCard>
);
