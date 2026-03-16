import React from 'react';
import { motion } from 'framer-motion';
import { Play, Edit2, Info } from 'lucide-react';
import Button from '../ui/Button';

const ProfileCard = ({ name, age, theme, progress, avatar, onLaunch, onEdit, onInfo }) => {
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

            {/* Action Buttons (Info & Edit) */}
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onInfo && onInfo(); }}
                    style={{ background: 'white', border: '1px solid #E2E8F0', color: '#4A5568', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                    title="View Info"
                >
                    <Info size={16} />
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit && onEdit(); }}
                    style={{ background: 'white', border: '1px solid #E2E8F0', color: '#4A5568', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                    title="Edit Profile"
                >
                    <Edit2 size={16} />
                </button>
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
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {avatar?.startsWith('data:image') ? (
                    <img src={avatar} alt={`${name}'s avatar`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    avatar || '👶'
                )}
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
