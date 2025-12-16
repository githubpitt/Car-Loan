import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface IOSButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'glass';
    size?: 'sm' | 'md' | 'lg';
}

const IOSButton = ({ children, className, variant = 'primary', size = 'md', ...props }: IOSButtonProps) => {
    const variants = {
        primary: 'bg-black text-white font-semibold shadow-lg shadow-black/20 hover:bg-gray-900',
        secondary: 'bg-white text-black font-semibold shadow-md shadow-black/5 border border-black/5 hover:bg-gray-50',
        glass: 'bg-white/40 text-black border border-white/40 hover:bg-white/60 backdrop-blur-md',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(
                "relative rounded-[1.5rem] flex items-center justify-center overflow-hidden",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default IOSButton;
