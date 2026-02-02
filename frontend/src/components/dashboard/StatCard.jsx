import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="card flex items-center gap-4"
        style={{ padding: '1.5rem' }} // keeping padding explicit if needed or use p-6
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
            <div className="text-sm text-muted mb-1">{label}</div>
            <div className="text-xl font-bold leading-none">{value}</div>
            {trend && (
                <div style={{ fontSize: '0.8rem', color: trend > 0 ? '#48BB78' : '#F56565', marginTop: '0.4rem', fontWeight: '600' }}>
                    {trend > 0 ? '+' : ''}{trend}% this week
                </div>
            )}
        </div>
    </motion.div>
);

export default StatCard;
