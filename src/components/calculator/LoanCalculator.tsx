import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Slider } from '../ui/Slider'; // We might need to create a Slider component
import { cn } from '../../lib/utils';

// Helper to format currency
const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

export const LoanCalculator = () => {
    const [price, setPrice] = useState(43500);
    const [downPayment, setDownPayment] = useState(5000);
    const [term, setTerm] = useState(60);
    const [rate, setRate] = useState(6.5);

    const [monthlyPayment, setMonthlyPayment] = useState(0);

    useEffect(() => {
        const principal = price - downPayment;
        const r = rate / 100 / 12;
        const n = term;

        if (principal <= 0) {
            setMonthlyPayment(0);
            return;
        }

        const payment = (principal * r * (Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
        setMonthlyPayment(isNaN(payment) ? 0 : payment);
    }, [price, downPayment, term, rate]);

    return (
        <div className="space-y-6">
            {/* Results Card */}
            <GlassCard intensity="high" className="p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px] !bg-white/60 !border-white/60">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Monthly Payment</span>
                <h2 className="text-6xl font-light tracking-tighter text-black mb-1">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyPayment)}
                </h2>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-black/5 rounded-full">Total Loan: {formatCurrency(price - downPayment)}</span>
                </div>
            </GlassCard>

            {/* Inputs */}
            <div className="grid gap-6">
                <InputGroup label="Vehicle Price" value={price} setValue={setPrice} min={5000} max={200000} step={500} format={formatCurrency} />
                <InputGroup label="Down Payment" value={downPayment} setValue={setDownPayment} min={0} max={price} step={100} format={formatCurrency} />
                <InputGroup label="Interest Rate" value={rate} setValue={setRate} min={0} max={20} step={0.1} format={(v) => `${v.toFixed(1)}%`} />

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

const InputGroup = ({ label, value, setValue, min, max, step, format }: any) => {
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
