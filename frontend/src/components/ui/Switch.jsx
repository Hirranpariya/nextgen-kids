import React from 'react';
import { motion } from 'framer-motion';

const Switch = ({ checked, onCheckedChange }) => {
    return (
        <div
            style={{
                width: '50px',
                height: '28px',
                background: checked ? 'var(--color-primary)' : '#cbd5e0',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
            }}
            onClick={() => onCheckedChange(!checked)}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{
                    width: '24px',
                    height: '24px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
                animate={{ x: checked ? 22 : 0 }}
            />
        </div>
    );
};

export default Switch;
