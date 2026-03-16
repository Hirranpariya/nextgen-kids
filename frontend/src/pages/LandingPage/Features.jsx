import React from 'react';
import { Shield, Sparkles, Brain, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        style={{
            padding: '2.5rem',
            background: 'white',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            border: '1px solid #edf2f7'
        }}
    >
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'var(--color-primary-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            <Icon size={28} />
        </div>
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
        </div>
    </motion.div>
);

const Features = () => {
    return (
        <section id="parents" style={{ padding: '8rem 0', background: '#f8faff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem auto' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Parents Love Us too.</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>We built NextGen Kids with safety and education as our core pillars, so you can relax while they explore.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <FeatureCard
                        icon={Shield}
                        title="100% Safe Garden"
                        desc="A completely closed ecosystem. No external links, no unmoderated chat, and zero ads."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Brain}
                        title="Adaptive & Smart"
                        desc="Our difficulty engine adjusts in real-time. If they breeze through it, we gently ramp up the challenge."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Clock}
                        title="Healthy Limits"
                        desc="Set daily screen time limits from your Parental Dashboard. When time's up, the garden goes to sleep."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={Sparkles}
                        title="Reward Growth"
                        desc="We celebrate effort over perfection. Badges and rewards are designed to build confidence."
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
