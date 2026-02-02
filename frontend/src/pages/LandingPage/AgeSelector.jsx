import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AgeGroupSelector = () => {
    const [activeTab, setActiveTab] = useState('kid');

    const groups = {
        toddler: {
            range: '3-5 Years',
            label: 'The Explorer',
            color: '#63B3ED', // Blue
            desc: 'Simple, voice-guided activities. Bouncing gardens and musical shapes.',
            features: ['No Reading Required', 'Voice Prompts', 'Motor Skills Focus']
        },
        kid: {
            range: '6-9 Years',
            label: 'The Adventurer',
            color: '#9F7AEA', // Purple
            desc: 'Story-driven quests. Math castles, logic puzzles, and world exploration.',
            features: ['Reading Adventures', 'Logic Puzzles', 'Reward Collection']
        },
        teen: {
            range: '10-12 Years',
            label: 'The Creator',
            color: '#F687B3', // Pink
            desc: 'A futuristic creative studio. Coding challenges, digital art, and safe social sharing.',
            features: ['Visual Coding', 'Creative Studio', 'Trend Discovery']
        }
    };

    return (
        <section id="age-groups" style={{ padding: '8rem 0', background: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Designed for Every Stage</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>The interface physically changes as they grow.</p>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap'
                }}>
                    {Object.entries(groups).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                background: activeTab === key ? data.color : '#f7fafc',
                                color: activeTab === key ? 'white' : 'var(--text-muted)',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: activeTab === key ? `0 10px 20px -5px ${data.color}80` : 'none',
                                transform: activeTab === key ? 'scale(1.05)' : 'scale(1)'
                            }}
                        >
                            {data.range}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div style={{ position: 'relative', height: '400px' }}>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                background: `linear-gradient(135deg, ${groups[activeTab].color}15, white)`,
                                borderRadius: '32px',
                                padding: '4rem',
                                border: `2px solid ${groups[activeTab].color}30`,
                                display: 'grid',
                                gridTemplateColumns: '1.5fr 1fr',
                                gap: '4rem',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <h3 style={{
                                    color: groups[activeTab].color,
                                    fontSize: '1.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    marginBottom: '1rem'
                                }}>
                                    {groups[activeTab].label}
                                </h3>
                                <h4 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                                    {groups[activeTab].desc}
                                </h4>
                                <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                                    {groups[activeTab].features.map((feature, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: groups[activeTab].color,
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.8rem'
                                            }}>✓</div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Mock Device Preview */}
                            <div style={{
                                height: '300px',
                                background: groups[activeTab].color,
                                borderRadius: '20px',
                                boxShadow: `0 20px 40px ${groups[activeTab].color}60`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '5rem'
                            }}>
                                {/* Placeholder for Screenshot */}
                                {activeTab === 'toddler' ? '🧸' : activeTab === 'kid' ? '🚀' : '🎨'}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default AgeGroupSelector;
