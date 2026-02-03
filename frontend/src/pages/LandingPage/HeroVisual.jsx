import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Brain, Star, Plus, Bell, MoreHorizontal } from 'lucide-react';

const MiniStatCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay }}
        style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flex: 1
        }}
    >
        <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={18} />
        </div>
        <div>
            <div style={{ fontSize: '0.65rem', color: '#718096' }}>{label}</div>
            <div style={{ fontSize: '1rem', fontWeight: '800', lineHeight: 1 }}>{value}</div>
        </div>
    </motion.div>
);

const HeroVisual = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Dashboard Container */}
            <motion.div
                initial={{ rotateX: 10, rotateY: -10, scale: 0.9, opacity: 0 }}
                animate={{ rotateX: 5, rotateY: -5, scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                    width: '100%',
                    maxWidth: '580px',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(66, 153, 225, 0.25)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    padding: '1.5rem',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2D3748', marginBottom: '0.25rem' }}>Dashboard</h3>
                        <p style={{ fontSize: '0.8rem', color: '#718096' }}>Welcome back, Jane! 👋</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{ padding: '0.5rem', background: 'white', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <Bell size={18} color="#718096" />
                        </div>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}></div>
                    </div>
                </div>

                {/* Stat Cards Row */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <MiniStatCard icon={Clock} label="Screen Time" value="2h 15m" color="#63B3ED" delay={0.3} />
                    <MiniStatCard icon={Brain} label="Activities" value="12" color="#9F7AEA" delay={0.4} />
                    <MiniStatCard icon={Star} label="Skills" value="5" color="#F687B3" delay={0.5} />
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', flex: 1 }}>

                    {/* Activity Chart Section */}
                    <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#4A5568' }}>Activity Week</span>
                            <MoreHorizontal size={16} color="#CBD5E0" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, height: '120px', paddingBottom: '0.5rem' }}>
                            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                                        style={{ width: '8px', background: i === 5 ? '#6366f1' : '#EDF2F7', borderRadius: '10px' }}
                                    />
                                    <span style={{ fontSize: '0.65rem', color: '#A0AEC0' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Profile Card Section */}
                    <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontSize: '0.65rem', fontWeight: '700', background: '#EBF8FF', color: '#4299E1', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>
                            Toddler
                        </div>
                        <div style={{ width: '50px', height: '50px', background: '#EDF2F7', borderRadius: '50%', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                            🦁
                        </div>
                        <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Tommy</h4>
                        <p style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '1rem' }}>Age 5</p>

                        <div style={{ fontSize: '0.75rem', color: '#718096', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span>Goal</span>
                            <span>80%</span>
                        </div>
                        <div style={{ height: '6px', background: '#EDF2F7', borderRadius: '3px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '80%' }}
                                transition={{ duration: 1, delay: 1.2 }}
                                style={{ height: '100%', background: '#48BB78' }}
                            />
                        </div>
                    </div>

                </div>
            </motion.div>

        </div>
    );
};

export default HeroVisual;
