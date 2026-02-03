import React, { useState } from 'react';
import { Smile, Frown, Meh, Sun, Moon } from 'lucide-react';

const WellnessPanel = () => {
    const [selectedMood, setSelectedMood] = useState(null);

    const MoodBtn = ({ icon: Icon, mood, color }) => (
        <button
            onClick={() => setSelectedMood(mood)}
            style={{
                background: selectedMood === mood ? `${color}20` : 'transparent',
                border: selectedMood === mood ? `1px solid ${color}` : '1px solid #E2E8F0',
                borderRadius: '8px', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s'
            }}
        >
            <Icon size={20} color={selectedMood === mood ? color : '#A0AEC0'} />
        </button>
    );

    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', height: '100%' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', marginBottom: '1rem' }}>Wellness Check</h3>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.5rem' }}>How are you feeling?</div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <MoodBtn icon={Smile} mood="happy" color="#38A169" />
                    <MoodBtn icon={Meh} mood="neutral" color="#D69E2E" />
                    <MoodBtn icon={Frown} mood="sad" color="#E53E3E" />
                </div>
            </div>

            <div style={{ borderTop: '1px solid #EDF2F7', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sun size={16} color="#D69E2E" />
                    <div>
                        <div style={{ fontSize: '0.7rem', color: '#A0AEC0' }}>Activity</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>30m goal</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Moon size={16} color="#805AD5" />
                    <div>
                        <div style={{ fontSize: '0.7rem', color: '#A0AEC0' }}>Sleep</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>8h 30m</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WellnessPanel;
