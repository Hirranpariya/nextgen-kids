import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const PredictionWidget = () => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '24px',
            padding: '2rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                <Sparkles size={150} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '10px' }}>
                    <TrendingUp size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>AI Insight</h3>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                Based on Tommy's recent interest in <strong>Pattern Matching</strong>, he is likely to enjoy <strong>Basic Music Composition</strong> next week.
            </p>

            <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    style={{
                        background: 'white',
                        color: '#764ba2',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        fontWeight: '700',
                        cursor: 'pointer'
                    }}
                >
                    View Activity
                </motion.button>
                <button style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    fontWeight: '700',
                    cursor: 'pointer'
                }}>
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export default PredictionWidget;
