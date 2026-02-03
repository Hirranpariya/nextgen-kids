import React from 'react';
import { Clock, CheckSquare, Calendar } from 'lucide-react';

const TaskItem = ({ title, time, type }) => (
    <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem', borderBottom: '1px solid #F7FAFC'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
                width: '18px', height: '18px', border: '2px solid #CBD5E0', borderRadius: '4px'
            }} />
            <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '500', color: '#2D3748' }}>{title}</div>
                <div style={{ fontSize: '0.7rem', color: '#718096', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={10} /> {time}
                </div>
            </div>
        </div>
        <div style={{
            fontSize: '0.65rem', fontWeight: '600', textTransform: 'uppercase',
            padding: '0.2rem 0.5rem', borderRadius: '4px',
            background: type === 'school' ? '#EBF8FF' : '#F0FFF4',
            color: type === 'school' ? '#3182CE' : '#38A169'
        }}>
            {type}
        </div>
    </div>
);

const TimeManagement = () => {
    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={18} color="#DD6B20" /> Schedule
                </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TaskItem title="Math Homework" time="4:00 PM" type="school" />
                <TaskItem title="Soccer Practice" time="5:30 PM" type="activity" />
                <TaskItem title="Read Science Chapter" time="7:30 PM" type="school" />
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #EDF2F7' }}>
                <button style={{ background: 'none', border: 'none', color: '#3182CE', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                    View Full Calendar
                </button>
            </div>
        </div>
    );
};

export default TimeManagement;
