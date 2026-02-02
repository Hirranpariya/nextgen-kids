import React, { useState } from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import MilestoneCard from '../../components/dashboard/MilestoneCard';
import PredictionWidget from '../../components/dashboard/PredictionWidget';
import SimpleBarChart from '../../components/dashboard/SimpleBarChart';
import { Calendar, ChevronDown, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const GrowthTrackerPage = () => {
    const [view, setView] = useState('weekly');

    const milestones = [
        { title: "Identify Shapes", category: "Cognitive", date: "Jan 12", status: "completed", icon: "🔺" },
        { title: "Count to 10", category: "Math", date: "Jan 15", status: "completed", icon: "🔢" },
        { title: "Color Mixing", category: "Art", date: "In Progress", status: "unlocked", icon: "🎨" },
        { title: "Basic Phonics", category: "Reading", date: "-", status: "locked", icon: "🔤" },
    ];

    const chartData = [
        { day: 'W1', value: 30 },
        { day: 'W2', value: 45 },
        { day: 'W3', value: 60 },
        { day: 'W4', value: 85 },
    ];

    return (
        <ParentLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Growth Tracker</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Tracking development milestones over time.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #edf2f7', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <Calendar size={18} color="var(--text-muted)" />
                        <span style={{ fontWeight: '600' }}>This Month</span>
                        <ChevronDown size={16} color="var(--text-muted)" />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Main Chart Card */}
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Skill Acquisition Rate</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setView('weekly')}
                                    style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: view === 'weekly' ? 'var(--color-primary)' : 'transparent', color: view === 'weekly' ? 'white' : 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}
                                >
                                    Weekly
                                </button>
                                <button
                                    onClick={() => setView('monthly')}
                                    style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: view === 'monthly' ? 'var(--color-primary)' : 'transparent', color: view === 'monthly' ? 'white' : 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}
                                >
                                    Monthly
                                </button>
                            </div>
                        </div>
                        <SimpleBarChart data={chartData} />
                    </div>

                    {/* AI Prediction */}
                    <PredictionWidget />
                </div>

                {/* Right Column: Milestones */}
                <div>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', minHeight: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Milestones</h3>
                            <Award size={20} color="#F6AD55" />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                <span>NEXT GOAL</span>
                                <span>75%</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#edf2f7', borderRadius: '4px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    style={{ height: '100%', background: '#48BB78' }}
                                />
                            </div>
                        </div>

                        <div>
                            {milestones.map((m, i) => (
                                <MilestoneCard key={i} {...m} />
                            ))}
                        </div>

                        <button style={{ width: '100%', padding: '1rem', marginTop: '1rem', background: '#f8fafc', color: 'var(--text-muted)', fontWeight: '600', borderRadius: '12px', cursor: 'pointer' }}>
                            View All Milestones
                        </button>
                    </div>
                </div>
            </div>
        </ParentLayout>
    );
};

export default GrowthTrackerPage;
