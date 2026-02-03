import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

const HabitItem = ({ title, completed }) => (
    <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 0', borderBottom: '1px solid #EDF2F7'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: completed ? 'none' : '2px solid #CBD5E0',
                background: completed ? '#38A169' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
            }}>
                {completed && <CheckCircle size={16} color="white" />}
            </div>
            <span style={{ color: completed ? '#A0AEC0' : '#2D3748', textDecoration: completed ? 'line-through' : 'none', fontWeight: '500' }}>
                {title}
            </span>
        </div>
        {completed && <span style={{ fontSize: '0.8rem', color: '#38A169', fontWeight: '700' }}>+10 XP</span>}
    </div>
);

const HabitBuilder = () => {
    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2D3748', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="#D69E2E" /> Daily Habits
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <HabitItem title="Read for 20 mins" completed={true} />
                <HabitItem title="Clean my room" completed={false} />
                <HabitItem title="Finish math homework" completed={false} />
                <HabitItem title="Drink water (3 glasses)" completed={true} />
            </div>

            <div style={{ marginTop: '1.5rem', background: '#F7FAFC', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: '600', marginBottom: '0.25rem' }}>Daily Progress</div>
                <div style={{ width: '100%', height: '8px', background: '#EDF2F7', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                    <div style={{ width: '50%', height: '100%', background: '#38B2AC', borderRadius: '4px' }}></div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2C5282' }}>2 of 4 Completed</div>
            </div>
        </div>
    );
};

export default HabitBuilder;
