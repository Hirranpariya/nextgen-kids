import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

const ActivityItem = ({ title, type, duration, score, time, color, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: 'white',
                borderRadius: '16px',
                marginBottom: '0.75rem',
                border: '1px solid #edf2f7',
                justifyContent: 'space-between'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${color}15`,
                    color: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {type === 'Logic' ? '🧩' : type === 'Art' ? '🎨' : '📚'}
                </div>
                <div>
                    <div style={{ fontWeight: '700', fontSize: '1rem' }}>{title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{type} • {duration}</div>
                </div>
            </div>

            <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#48BB78', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
                    <CheckCircle size={14} /> {score}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
                    <Clock size={12} /> {time}
                </div>
            </div>
        </motion.div>
    );
};

const ActivityHistory = () => {
    const activities = [
        { title: "Shape matching", type: "Logic", duration: "10m", score: "Perfect", time: "2h ago", color: "#63B3ED" },
        { title: "Color mixing", type: "Art", duration: "15m", score: "Good", time: "5h ago", color: "#F687B3" },
        { title: "Animal Sounds", type: "Nature", duration: "8m", score: "Perfect", time: "Yesterday", color: "#9F7AEA" },
    ];

    return (
        <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Adventures</h3>
            <div>
                {activities.map((act, i) => (
                    <ActivityItem key={i} index={i} {...act} />
                ))}
            </div>
        </div>
    );
};

export default ActivityHistory;
