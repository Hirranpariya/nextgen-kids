import React from 'react';
import { motion } from 'framer-motion';

const ProgressRing = ({
    radius = 60,
    stroke = 10,
    progress = 0,
    color = 'var(--color-primary)',
    icon: Icon,
    label
}) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    style={{ transform: 'rotate(-90deg)' }}
                >
                    <circle
                        stroke="#edf2f7"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <motion.circle
                        stroke={color}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color
                }}>
                    {Icon ? <Icon size={24} /> : <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{progress}%</span>}
                </div>
            </div>
            {label && <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>{label}</div>}
        </div>
    );
};

export default ProgressRing;
