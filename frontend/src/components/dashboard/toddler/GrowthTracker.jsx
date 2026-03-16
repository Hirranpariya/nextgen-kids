import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Ruler, Weight } from 'lucide-react';

const GrowthCard = ({ icon: Icon, label, value, unit, color }) => (
    <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
        flex: 1
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={24} />
        </div>
        <div>
            <div style={{ fontSize: '0.8rem', color: '#718096' }}>{label}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2D3748' }}>
                {value} <span style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>{unit}</span>
            </div>
        </div>
    </div>
);

const GrowthTracker = () => {
    return (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="text-lg font-bold">Growth Tracker 📏</h3>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <GrowthCard icon={Ruler} label="Height" value="105" unit="cm" color="#4299E1" />
                <GrowthCard icon={Weight} label="Weight" value="18.5" unit="kg" color="#48BB78" />
            </div>

            <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#4A5568' }}>How are they feeling today?</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#F7FAFC', padding: '0.5rem', borderRadius: '12px' }}>
                    {['Great! 😊', 'Okay 😐', 'Tired 😴'].map((mood, i) => (
                        <motion.button
                            key={i}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                border: 'none',
                                background: i === 0 ? 'white' : 'transparent',
                                borderRadius: '8px',
                                boxShadow: i === 0 ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                fontWeight: '600',
                                color: i === 0 ? '#2D3748' : '#A0AEC0',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {mood}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GrowthTracker;
