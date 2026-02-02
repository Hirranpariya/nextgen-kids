import React from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import StatCard from '../../components/dashboard/StatCard';
import ProfileCard from '../../components/dashboard/ProfileCard';
import SimpleBarChart from '../../components/dashboard/SimpleBarChart';
import { Clock, Star, Brain, AlertCircle } from 'lucide-react';

const ParentDashboard = () => {
    const chartData = [
        { day: 'Mon', value: 45 },
        { day: 'Tue', value: 60 },
        { day: 'Wed', value: 30 },
        { day: 'Thu', value: 80 },
        { day: 'Fri', value: 50 },
        { day: 'Sat', value: 90 },
        { day: 'Sun', value: 70 },
    ];

    return (
        <ParentLayout>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back, Jane. Here's how the kids are doing.</p>
            </div>

            {/* Stats Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <StatCard icon={Clock} label="Total Screen Time" value="2h 15m" trend={-5} color="#63B3ED" />
                <StatCard icon={Brain} label="Activities Done" value="12" trend={15} color="#9F7AEA" />
                <StatCard icon={Star} label="Skills Mastered" value="5" trend={8} color="#F687B3" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Chart Section */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Activity this Week</h3>
                            <select style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                                <option>All Kids</option>
                                <option>Tommy</option>
                                <option>Sarah</option>
                            </select>
                        </div>
                        <SimpleBarChart data={chartData} />
                    </div>

                    {/* Alerts Section */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Recent Alerts</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#FFF5F5', borderRadius: '12px', color: '#C53030' }}>
                                <AlertCircle size={24} />
                                <div>
                                    <div style={{ fontWeight: '700' }}>Screen Time Limit Reached</div>
                                    <div style={{ fontSize: '0.9rem' }}>Tommy hit his 1h limit on "Arcade" genre.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Profiles */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem' }}>My Kids</h3>
                        <button style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.9rem' }}>+ Add New</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <ProfileCard
                            name="Tommy"
                            age={5}
                            theme="toddler"
                            avatar="🦁"
                            progress={80}
                        />
                        <ProfileCard
                            name="Sarah"
                            age={8}
                            theme="kid"
                            avatar="🚀"
                            progress={45}
                        />
                    </div>
                </div>
            </div>
        </ParentLayout>
    );
};

export default ParentDashboard;
