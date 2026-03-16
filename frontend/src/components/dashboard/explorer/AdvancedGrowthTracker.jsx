import React from 'react';
import { Activity, TrendingUp, UserCheck } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

const data = [
    { name: 'Week 1', focus: 60, stress: 30 },
    { name: 'Week 2', focus: 70, stress: 25 },
    { name: 'Week 3', focus: 65, stress: 40 },
    { name: 'Week 4', focus: 85, stress: 20 },
];

const AdvancedGrowthTracker = () => {
    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', height: '100%' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="#38A169" /> Growth & Analytics
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#F7FAFC', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>BMI Status</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#38A169' }}>18.5 <span style={{ fontSize: '0.7rem', color: '#4A5568' }}>Normal</span></div>
                </div>
                <div style={{ background: '#F7FAFC', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>Focus Score</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#3182CE' }}>8.5/10</div>
                </div>
            </div>

            <div style={{ height: '120px' }}>
                <div style={{ fontSize: '0.7rem', color: '#A0AEC0', marginBottom: '0.5rem' }}>Monthly Trends (Focus vs Stress)</div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="name" hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="focus" stroke="#3182CE" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="stress" stroke="#E53E3E" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdvancedGrowthTracker;
