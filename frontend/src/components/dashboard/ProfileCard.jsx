import React from 'react';
import { motion } from 'framer-motion';
import { Play, Edit2 } from 'lucide-react';
import Button from '../ui/Button';

const ProfileCard = ({ name, age, theme, progress, avatar, onLaunch, onEdit }) => {
    const themes = {
        toddler: { color: '#63B3ED', label: 'Toddler' },
        kid: { color: '#9F7AEA', label: 'Kid' },
        teen: { color: '#F687B3', label: 'Teen' }
    };

    const themeData = themes[theme] || themes.kid;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card flex flex-col items-center text-center relative overflow-hidden"
            style={{ padding: '1.5rem' }}
        >
            {/* Theme Badge */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: `${themeData.color}20`,
                color: themeData.color,
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700'
            }}>
                {themeData.label}
            </div>

            {/* Edit Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: '#A0AEC0',
                    cursor: 'pointer'
                }}
            >
                <Edit2 size={18} />
            </button>

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

            <h3 className="text-lg font-bold mb-1">{name}</h3>
            <div className="text-sm text-muted mb-6">Age {age}</div>

            {/* Progress Mini Bar */}
            <div className="w-full mb-6" style={{ width: '100%' }}>
                <div className="flex-between text-sm text-muted mb-1">
                    <span>Daily Goal</span>
                    <span>{progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#edf2f7', borderRadius: '3px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: themeData.color, borderRadius: '3px' }} />
                </div>
            </div>

            <Button variant="secondary" size="sm" icon={Play} onClick={onLaunch} className="w-full justify-center" style={{ width: '100%' }}>
                Launch Mode
            </Button>
        </motion.div>
    );
};

export default ProfileCard;
