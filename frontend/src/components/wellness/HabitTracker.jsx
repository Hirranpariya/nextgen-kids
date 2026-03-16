import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const HabitCard = ({ title, icon, completed, onClick, color }) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
                background: completed ? `${color}15` : 'white',
                border: `2px solid ${completed ? color : '#edf2f7'}`,
                borderRadius: '20px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: completed ? color : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                filter: completed ? 'none' : 'grayscale(100%)'
            }}>
                {icon}
            </div>
            <div style={{ flex: 1, fontWeight: '600', color: completed ? color : 'var(--text-muted)' }}>
                {title}
            </div>
            <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: `2px solid ${completed ? color : '#cbd5e0'}`,
                background: completed ? color : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                {completed && <Check size={14} />}
            </div>
        </motion.div>
    );
};

const HabitTracker = ({ habits, onToggle }) => {
    return (
        <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Daily Habits</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {habits.map((habit, index) => (
                    <HabitCard
                        key={index}
                        {...habit}
                        onClick={() => onToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitTracker;
