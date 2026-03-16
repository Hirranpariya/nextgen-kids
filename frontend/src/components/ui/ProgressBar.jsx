import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: 'var(--text-muted)'
            }}>
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
            </div>
            <div style={{
                width: '100%',
                height: '10px',
                background: '#edf2f7',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                        borderRadius: '10px'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
