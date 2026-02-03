import React from 'react';
import { Ruler, Weight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', cm: 120 },
    { name: 'Feb', cm: 121 },
    { name: 'Mar', cm: 121 },
    { name: 'Apr', cm: 122 },
    { name: 'May', cm: 123 },
    { name: 'Jun', cm: 124 },
];

const GrowthCard = ({ icon: Icon, label, value, unit, color }) => (
    <div style={{ flex: 1, background: '#F7FAFC', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Icon size={20} color={color} />
        </div>
        <div>
            <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: '600' }}>{label}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2D3748' }}>{value} <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#A0AEC0' }}>{unit}</span></div>
        </div>
    </div>
);

const GrowthTracker = () => {
    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', gridRow: 'span 2' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2D3748', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={20} color="#E53E3E" /> Growth & Health
            </h3>
            <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Keep track of physical development.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <GrowthCard icon={Ruler} label="Height" value="124" unit="cm" color="#3182CE" />
                <GrowthCard icon={Weight} label="Weight" value="26" unit="kg" color="#38A169" />

                <div style={{ background: '#F0FFF4', padding: '1rem', borderRadius: '12px', border: '1px solid #C6F6D5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '700', color: '#276749' }}>BMI Score: 16.9</span>
                        <span style={{ fontWeight: '600', color: '#38A169', fontSize: '0.9rem' }}>Healthy Weight</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#FFF5F5', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                        <div style={{ flex: 1, background: '#63B3ED', opacity: 0.3 }}></div>
                        <div style={{ flex: 1, background: '#48BB78' }}></div> {/* Healthy Zone */}
                        <div style={{ flex: 1, background: '#F6AD55', opacity: 0.3 }}></div>
                    </div>
                </div>
            </div>

            <div style={{ height: '150px' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#A0AEC0', marginBottom: '0.5rem' }}>Growth Trend (6 Months)</p>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCm" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3182CE" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3182CE" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="cm" stroke="#3182CE" strokeWidth={2} fillOpacity={1} fill="url(#colorCm)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GrowthTracker;
