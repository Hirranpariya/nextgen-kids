import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Hand, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

const ChildProfileHeader = ({ name, age, avatar, dominantHand, primaryLanguage }) => {
    const navigate = useNavigate();
    return (
        <div style={{
            background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
            borderRadius: '24px',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            boxShadow: '0 10px 25px -5px rgba(255, 154, 158, 0.4)',
            color: '#702459',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 2 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{
                        width: '100px',
                        height: '100px',
                        background: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3.5rem',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        border: '4px solid rgba(255,255,255,0.5)',
                        overflow: 'hidden'
                    }}
                >
                    {avatar?.startsWith('data:image') ? (
                        <img src={avatar} alt={`${name}'s avatar`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        avatar || '👶'
                    )}
                </motion.div>
                <div>
                    <div style={{
                        background: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        display: 'inline-block',
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        color: '#D53F8C',
                        marginBottom: '0.5rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}>
                        Early Explorer (3-5)
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '0.25rem' }}>{name}</h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '0.5rem' }}>{age} Years Old • Super Hero in Training</p>
                    
                    {(dominantHand || primaryLanguage) && (
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {dominantHand && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Hand size={14} /> {dominantHand} Handed
                                </span>
                            )}
                            {primaryLanguage && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Globe size={14} /> Speaks {primaryLanguage}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Button 
                variant="ghost" 
                icon={Settings} 
                onClick={() => navigate('/parent/settings')}
                style={{ background: 'rgba(255,255,255,0.3)', color: '#702459', border: 'none' }}
            >
                Parent Settings
            </Button>

            {/* Decorative Background Elements */}
            <div style={{ position: 'absolute', top: -20, right: -20, width: 150, height: 150, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: -40, left: 100, width: 100, height: 100, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        </div>
    );
};

export default ChildProfileHeader;
