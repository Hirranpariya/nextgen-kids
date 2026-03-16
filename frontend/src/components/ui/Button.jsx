import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    onClick,
    className = ''
}) => {
    const baseStyles = {
        padding: size === 'lg' ? '1rem 2.5rem' : size === 'md' ? '0.75rem 1.5rem' : '0.5rem 1rem',
        fontSize: size === 'lg' ? '1.25rem' : size === 'md' ? '1rem' : '0.875rem',
        borderRadius: '50px',
        fontWeight: '700',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
    };

    const variants = {
        primary: {
            background: 'var(--color-primary)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        },
        secondary: {
            background: 'white',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
        },
        bouncy: {
            background: 'var(--color-secondary)',
            color: 'white',
            boxShadow: '0 6px 0 rgba(0,0,0,0.2)',
            transform: 'translateY(-2px)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--text-main)',
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ ...baseStyles, ...variants[variant] }}
            onClick={onClick}
            className={className}
        >
            {Icon && <Icon size={20} />}
            {children}
        </motion.button>
    );
};

export default Button;
