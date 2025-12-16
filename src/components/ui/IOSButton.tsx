import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface IOSButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'glass';
    size?: 'sm' | 'md' | 'lg';
}

const IOSButton = ({ children, className, variant = 'primary', size = 'md', ...props }: IOSButtonProps) => {
    const variants = {
        primary: 'bg-white text-black font-semibold shadow-lg shadow-white/10',
        secondary: 'bg-white/10 text-white backdrop-blur-md border border-white/10',
        glass: 'bg-transparent text-white border border-white/20 hover:bg-white/5',
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
