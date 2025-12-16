import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

const GlassCard = ({ children, className, intensity = 'medium', ...props }: GlassCardProps) => {
    const blurMap = {
        low: 'backdrop-blur-[20px] bg-white/5 border-white/5',
        medium: 'backdrop-blur-[40px] bg-white/10 border-white/10',
        high: 'backdrop-blur-[60px] bg-white/15 border-white/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "relative rounded-[2rem] shadow-2xl border",
                blurMap[intensity],
                "overflow-hidden",
                className
            )}
            {...props as any}
        >
            {/* Glossy reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
