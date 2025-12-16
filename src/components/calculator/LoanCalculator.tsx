import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../lib/utils';
// Slider import removed as not used yet

// Helper to format currency
const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

type CalculationMode = 'payment' | 'budget';

export const LoanCalculator = () => {
    const [mode, setMode] = useState<CalculationMode>('payment');

    // Joint state
    const [downPayment, setDownPayment] = useState(5000);
    const [term, setTerm] = useState(60);
    const [rate, setRate] = useState(6.5);

    // Payment Mode State
    const [price, setPrice] = useState(43500);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    // Budget Mode State
    const [targetPayment, setTargetPayment] = useState(800);
    const [buyingPower, setBuyingPower] = useState(0);

    // Calculate Payment (Standard Mode)
    useEffect(() => {
        if (mode !== 'payment') return;

        const principal = price - downPayment;
        const r = rate / 100 / 12;
        const n = term;

        if (principal <= 0) {
            setMonthlyPayment(0);
            return;
        }

        if (r === 0) {
            setMonthlyPayment(principal / n);
            return;
        }

        const payment = (principal * r * (Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
        setMonthlyPayment(isNaN(payment) ? 0 : payment);
    }, [mode, price, downPayment, term, rate]);

    // Calculate Buying Power (Reverse Mode)
    useEffect(() => {
        if (mode !== 'budget') return;

        const r = rate / 100 / 12;
        const n = term;

        let loanAmount = 0;

        if (r === 0) {
            loanAmount = targetPayment * n;
        } else {
            // PV = PMT * (1 - (1+r)^-n) / r
            loanAmount = (targetPayment * (1 - Math.pow(1 + r, -n))) / r;
        }

        const totalBuyingPower = loanAmount + downPayment;
        setBuyingPower(isNaN(totalBuyingPower) ? 0 : totalBuyingPower);

    }, [mode, targetPayment, downPayment, term, rate]);

    return (
        <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-2xl w-full">
                <button
                    onClick={() => setMode('payment')}
                    className={cn(
                        "flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                        mode === 'payment' ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                    )}
                >
                    Payment Calculator
                </button>
                <button
                    onClick={() => setMode('budget')}
                    className={cn(
                        "flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                        mode === 'budget' ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                    )}
                >
                    Budget Calculator
                </button>
            </div>

            {/* Results Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <GlassCard intensity="high" className="p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px] !bg-white/60 !border-white/60">
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

                        {mode === 'payment' ? (
                            <>
                                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Monthly Payment</span>
                                <h2 className="text-6xl font-light tracking-tighter text-black mb-1">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyPayment)}
                                </h2>
                                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                                    <span className="px-3 py-1 bg-black/5 rounded-full">Total Loan: {formatCurrency(price - downPayment)}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Buying Power</span>
                                <h2 className="text-6xl font-light tracking-tighter text-black mb-1">
                                    {formatCurrency(buyingPower)}
                                </h2>
                                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                                    <span className="px-3 py-1 bg-black/5 rounded-full">Loan Amount: {formatCurrency(buyingPower - downPayment)}</span>
                                </div>
                            </>
                        )}
                    </GlassCard>
                </motion.div>
            </AnimatePresence>

            {/* Inputs */}
            <div className="grid gap-6">
                <AnimatePresence mode="wait">
                    {mode === 'payment' ? (
                        <motion.div
                            key="input-price"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <InputGroup label="Vehicle Price" value={price} setValue={setPrice} min={5000} max={200000} step={500} format={formatCurrency} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="input-payment"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <InputGroup label="Target Monthly Payment" value={targetPayment} setValue={setTargetPayment} min={100} max={5000} step={50} format={formatCurrency} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <InputGroup label="Down Payment" value={downPayment} setValue={setDownPayment} min={0} max={mode === 'payment' ? price : 100000} step={100} format={formatCurrency} />
                <InputGroup label="Interest Rate" value={rate} setValue={setRate} min={0} max={20} step={0.1} format={(v: number) => `${v.toFixed(1)}%`} />

                {/* Term Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-500 ml-1">Loan Term (Months)</label>
                    <div className="grid grid-cols-4 gap-2">
                        {[36, 48, 60, 72].map(t => (
                            <button
                                key={t}
                                onClick={() => setTerm(t)}
                                className={cn(
                                    "py-3 rounded-[1rem] text-sm font-semibold transition-all",
                                    term === t
                                        ? "bg-black text-white shadow-lg shadow-black/20"
                                        : "bg-white/50 text-black border border-white/40"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Fixed 'any' type to specific types
interface InputGroupProps {
    label: string;
    value: number;
    setValue: (val: number) => void;
    min: number;
    max: number;
    step: number;
    format: (val: number) => string;
}

const InputGroup = ({ label, value, setValue, min, max, step, format }: InputGroupProps) => {
    return (
        <GlassCard className="p-5 !bg-white/50 !rounded-[1.5rem] space-y-4">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-500">{label}</label>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="text-right font-bold text-lg bg-transparent border-0 p-0 focus:ring-0 w-[120px] text-black"
                />
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
        </GlassCard>
    )
}
