import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Coffee, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const GuidanceCard = ({ title, items, color, icon: Icon }) => (
    <div style={{ flex: 1, background: '#fff', padding: '1.25rem', borderRadius: '16px', borderLeft: `4px solid ${color}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: color }}>
            <Icon size={20} />
            <h4 style={{ fontWeight: '700', color: '#2D3748' }}>{title}</h4>
        </div>
        <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.9rem', color: '#718096', lineHeight: 1.6 }}>
            {items.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
        </ul>
    </div>
);

const ParentGuidance = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div style={{ background: '#F0FFF4', borderRadius: '24px', padding: '1.5rem', border: '1px solid #C6F6D5' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: isOpen ? '1.5rem' : 0 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: '#48BB78', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
                        <Info size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#276749' }}>Parent Guidance Panel 🛡️</h3>
                </div>
                {isOpen ? <ChevronUp size={20} color="#276749" /> : <ChevronDown size={20} color="#276749" />}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <GuidanceCard
                                icon={Coffee}
                                title="Today's Focus"
                                color="#4299E1"
                                items={[
                                    "Encourage sharing toys with siblings.",
                                    "Practice 'Please' and 'Thank you'.",
                                    "Read a bedtime story about animals."
                                ]}
                            />
                            <GuidanceCard
                                icon={AlertCircle}
                                title="Safety & Wellness"
                                color="#F6E05E"
                                items={[
                                    "Limit screen time to 1 hour.",
                                    "Ensure 10-12 hours of sleep.",
                                    "Hydration Goal: 4-5 cups of water."
                                ]}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ParentGuidance;
