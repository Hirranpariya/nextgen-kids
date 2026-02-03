import React, { useState } from 'react'; // Checking if useState needs explicit import if not automatic? React usually imports it.
import { motion } from 'framer-motion';
import { Star, Check } from 'lucide-react';

const HabitItem = ({ icon: Icon, label, color }) => {
    const [completed, setCompleted] = useState(false);

    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => setCompleted(!completed)}
            style={{
                background: completed ? `${color}20` : 'white',
                border: `2px solid ${completed ? color : '#EDF2F7'}`,
                borderRadius: '16px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.3s'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: completed ? color : '#F7FAFC',
                    color: completed ? 'white' : '#A0AEC0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={20} />
                </div>
                <span style={{ fontWeight: '600', color: completed ? '#2D3748' : '#718096' }}>{label}</span>
            </div>

            {completed && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        background: '#F6E05E',
                        padding: '0.25rem',
                        borderRadius: '50%',
                        display: 'flex'
                    }}
                >
                    <Star size={16} fill="white" color="white" />
                </motion.div>
            )}
        </motion.div>
    );
};

const HabitBuilder = () => {
    return (
        <div className="card">
            <h3 className="text-lg font-bold mb-4">Good Habits 🌟</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <HabitItem icon={() => <span>🦷</span>} label="Brush Teeth" color="#4299E1" />
                <HabitItem icon={() => <span>🧼</span>} label="Wash Hands" color="#63B3ED" />
                <HabitItem icon={() => <span>🧸</span>} label="Clean Toys" color="#9F7AEA" />
                <HabitItem icon={() => <span>😴</span>} label="Sleep on Time" color="#48BB78" />
            </div>
        </div>
    );
};

export default HabitBuilder;
