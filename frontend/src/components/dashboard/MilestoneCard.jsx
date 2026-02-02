import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';

const MilestoneCard = ({ title, category, date, status, icon }) => {
    const isUnlocked = status === 'unlocked' || status === 'completed';

    return (
        <motion.div
            whileHover={{ y: -2 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: isUnlocked ? 'white' : '#f8fafc',
                borderRadius: '16px',
                border: `1px solid ${isUnlocked ? '#edf2f7' : '#e2e8f0'}`,
                marginBottom: '1rem',
                opacity: isUnlocked ? 1 : 0.7,
                gap: '1rem'
            }}
        >
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: isUnlocked ? '#FFF5F5' : '#e2e8f0', // Default reddish bg for unlocked icon
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                filter: isUnlocked ? 'none' : 'grayscale(100%)'
            }}>
                {icon || '🏆'}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{category} • {isUnlocked ? date : 'Locked'}</div>
            </div>

            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: status === 'completed' ? '#48BB78' : isUnlocked ? 'white' : '#e2e8f0',
                border: status === 'completed' ? 'none' : '2px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                {status === 'completed' ? <Check size={16} /> : !isUnlocked && <Lock size={14} color="#a0aec0" />}
            </div>
        </motion.div>
    );
};

export default MilestoneCard;
