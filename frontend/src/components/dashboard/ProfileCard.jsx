import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Button from '../ui/Button';

const ProfileCard = ({ name, age, theme, progress, avatar }) => {
    const themes = {
        toddler: { color: '#63B3ED', label: 'Toddler' },
        kid: { color: '#9F7AEA', label: 'Kid' },
        teen: { color: '#F687B3', label: 'Teen' }
    };

    const themeData = themes[theme] || themes.kid;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            style={{
                background: 'white',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #edf2f7',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Theme Badge */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: `${themeData.color}20`,
                color: themeData.color,
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700'
            }}>
                {themeData.label}
            </div>

            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: themeData.color,
                marginBottom: '1rem',
                fontSize: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {avatar || '👶'}
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{name}</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Age {age}</div>

            {/* Progress Mini Bar */}
            <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    <span>Daily Goal</span>
                    <span>{progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#edf2f7', borderRadius: '3px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: themeData.color, borderRadius: '3px' }} />
                </div>
            </div>

            <Button variant="secondary" size="sm" icon={Play} style={{ width: '100%', justifyContent: 'center' }}>
                Launch Mode
            </Button>
        </motion.div>
    );
};

export default ProfileCard;
