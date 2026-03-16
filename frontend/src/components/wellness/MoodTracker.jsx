import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MoodOption = ({ emoji, label, color, selected, onClick }) => (
    <motion.div
        onClick={onClick}
        whileHover={{ y: -5 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            opacity: selected ? 1 : 0.5,
            transform: selected ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.3s ease'
        }}
    >
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: selected ? color : '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: selected ? `0 10px 20px ${color}60` : 'none',
        }}>
            {emoji}
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: selected ? 'var(--text-main)' : 'var(--text-muted)' }}>
            {label}
        </span>
    </motion.div>
);

const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState(null);

    const moods = [
        { emoji: '😄', label: 'Happy', color: '#F6E05E' },
        { emoji: '🙂', label: 'Calm', color: '#68D391' },
        { emoji: '🥱', label: 'Tired', color: '#63B3ED' },
        { emoji: '😤', label: 'Frustrated', color: '#F687B3' },
        { emoji: '🤒', label: 'Sick', color: '#FC8181' },
    ];

    return (
        <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-sm)',
            textAlign: 'center'
        }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Emotional Check-in</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>How was Tommy feeling today?</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                {moods.map((m, i) => (
                    <MoodOption
                        key={i}
                        {...m}
                        selected={selectedMood === m.label}
                        onClick={() => setSelectedMood(m.label)}
                    />
                ))}
            </div>

            {selectedMood && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ marginTop: '2rem', textAlign: 'left' }}
                >
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Add a note (optional)</label>
                    <textarea
                        placeholder="What happened today?"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '16px',
                            border: '1px solid #edf2f7',
                            resize: 'none',
                            background: '#f8fafc',
                            height: '80px',
                            fontFamily: 'inherit'
                        }}
                    />
                </motion.div>
            )}
        </div>
    );
};

export default MoodTracker;
