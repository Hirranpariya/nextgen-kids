import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
        }}
    >
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={28} />
        </div>
        <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1 }}>{value}</div>
            {trend && (
                <div style={{ fontSize: '0.8rem', color: trend > 0 ? '#48BB78' : '#F56565', marginTop: '0.25rem', fontWeight: '600' }}>
                    {trend > 0 ? '+' : ''}{trend}% this week
                </div>
            )}
        </div>
    </motion.div>
);

export default StatCard;
