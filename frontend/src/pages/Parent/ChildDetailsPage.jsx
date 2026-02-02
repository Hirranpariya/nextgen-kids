import React from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import ProgressRing from '../../components/dashboard/ProgressRing';
import ActivityHistory from '../../components/dashboard/ActivityHistory';
import Button from '../../components/ui/Button';
import { Pencil, Play, Brain, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ChildDetailsPage = () => {
    // Mock Data
    const child = {
        name: "Tommy",
        age: 5,
        theme: "toddler",
        color: "#63B3ED",
        avatar: "🦁",
        level: 3,
        xp: 450
    };

    return (
        <ParentLayout>
            {/* Header Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    border: '1px solid #edf2f7',
                    background: `linear-gradient(to right, white 60%, ${child.color}10 100%)`
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {/* Avatar with Level Ring */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: child.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '4rem',
                            border: '4px solid white',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            {child.avatar}
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            background: 'linear-gradient(135deg, #F6E05E 0%, #F6AD55 100%)',
                            color: 'white',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            border: '2px solid white',
                            fontSize: '0.9rem'
                        }}>
                            {child.level}
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <h1 style={{ fontSize: '2.5rem', lineHeight: 1 }}>{child.name}</h1>
                            <span style={{
                                background: `${child.color}20`,
                                color: child.color,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                fontWeight: '700',
                                fontSize: '0.8rem'
                            }}>
                                AGE {child.age}
                            </span>
                        </div>
                        <div style={{ color: 'var(--text-muted)' }}>Theme: <span style={{ textTransform: 'capitalize' }}>{child.theme}</span> • {child.xp} XP Earned</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="secondary" icon={Pencil}>Edit Profile</Button>
                    <Button variant="primary" icon={Play} style={{ boxShadow: `0 4px 15px ${child.color}60` }}>Launch Child Mode</Button>
                </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Left Col: Stats & History */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Progress Rings */}
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <ProgressRing progress={75} label="Logic & Math" color="#63B3ED" icon={Brain} />
                        <ProgressRing progress={40} label="Creativity" color="#F687B3" icon={Star} />
                        <ProgressRing progress={90} label="Daily Goal" color="#48BB78" icon={Clock} />
                    </div>

                    {/* History */}
                    <ActivityHistory />
                </div>

                {/* Right Col: Personalization */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Personalization</h3>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-muted)' }}>THEME COLOR</div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {['#F56565', '#ED8936', '#48BB78', '#38B2AC', '#4299E1', '#9F7AEA', '#ED64A6'].map(c => (
                                <div key={c} style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: c,
                                    cursor: 'pointer',
                                    border: c === child.color ? '3px solid white' : 'none',
                                    boxShadow: c === child.color ? '0 0 0 2px #cbd5e0' : 'none'
                                }} />
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-muted)' }}>AVATAR</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                            {['🦁', '🦊', '🐸', '🐼', '🐯', '🦄', '🐳', '🦖'].map(a => (
                                <div key={a} style={{
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    background: a === child.avatar ? '#edf2f7' : 'transparent',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.25rem'
                                }}>
                                    {a}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ParentLayout>
    );
};

export default ChildDetailsPage;
