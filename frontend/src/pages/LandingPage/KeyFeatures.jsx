import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Smile } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem',
            border: '1px solid rgba(0,0,0,0.03)'
        }}
    >
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: color + '20', // 20% opacity
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={32} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{description}</p>
    </motion.div>
);

const KeyFeatures = () => {
    const features = [
        {
            icon: Shield,
            title: "100% Safe Environment",
            description: "Ad-free, COPPA-compliant, and fully walled garden for your peace of mind.",
            color: "#48BB78"
        },
        {
            icon: BookOpen,
            title: "Adaptive Learning",
            description: "Curriculum that evolves in real-time based on your child's pace and interests.",
            color: "#4299E1"
        },
        {
            icon: Smile,
            title: "Fun-First Design",
            description: "Gamified lessons that feel like play, keeping motivation high every day.",
            color: "#ED8936"
        }
    ];

    return (
        <section id="features" style={{ padding: '6rem 0', background: '#f8faff', position: 'relative' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {features.map((f, i) => (
                        <FeatureItem key={i} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
