import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Select = ({ label, options, icon: Icon, value, onChange, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <label
                style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: 'var(--text-muted)',
                    marginLeft: '4px'
                }}
            >
                {label}
            </label>
            <div style={{ position: 'relative' }}>
                {Icon && (
                    <div style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: isFocused ? 'var(--color-primary)' : 'var(--text-muted)',
                        transition: 'color 0.3s ease',
                        zIndex: 1
                    }}>
                        <Icon size={20} />
                    </div>
                )}
                <motion.select
                    layout
                    value={value || ''}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        width: '100%',
                        padding: Icon ? '1rem 1rem 1rem 3rem' : '1rem',
                        borderRadius: '16px',
                        border: '2px solid',
                        borderColor: isFocused ? 'var(--color-primary)' : '#e2e8f0',
                        background: isFocused ? 'white' : '#f8fafc',
                        outline: 'none',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-body)',
                        transition: 'background 0.3s ease',
                        appearance: 'none',
                        color: value ? 'inherit' : 'var(--text-muted)',
                        boxSizing: 'border-box'
                    }}
                    animate={{
                        scale: isFocused ? 1.02 : 1,
                        boxShadow: isFocused ? '0 10px 25px -5px rgba(99, 102, 241, 0.15)' : 'none'
                    }}
                    {...props}
                >
                    <option value="" disabled>Select {label}</option>
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
                    ))}
                </motion.select>
                <div style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'var(--text-muted)'
                }}>
                    ▼
                </div>
            </div>
        </div>
    );
};

export default Select;
