import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Lock } from 'lucide-react';

const ContentCard = ({ title, category, duration, thumbnail, difficulty, locked, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                cursor: locked ? 'default' : 'pointer'
            }}
        >
            {/* Thumbnail */}
            <div style={{
                height: '160px',
                background: thumbnail || '#edf2f7',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {locked ? (
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Lock size={24} />
                    </div>
                ) : (
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        <Play size={24} fill="currentColor" />
                    </div>
                )}

                <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <Clock size={12} /> {duration}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        color: 'var(--color-primary)',
                        background: 'rgba(99, 102, 241, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '6px'
                    }}>
                        {category}
                    </span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(3)].map((_, i) => (
                            <Star key={i} size={12} fill={i < difficulty ? "#F6E05E" : "#cbd5e0"} color={i < difficulty ? "#F6E05E" : "#cbd5e0"} />
                        ))}
                    </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Interactive learning session.</p>
            </div>
        </motion.div>
    );
};

export default ContentCard;
