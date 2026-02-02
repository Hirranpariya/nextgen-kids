import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Button from '../../components/ui/Button';

const Hero = () => {
    return (
        <section style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '6rem',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Animated Background Blobs */}
            <motion.div
                animate={{
                    y: [0, -50, 0],
                    x: [0, 30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, var(--color-primary-dark) 0%, rgba(255,255,255,0) 70%)',
                    opacity: 0.1,
                    borderRadius: '50%',
                    zIndex: -1
                }}
            />
            <motion.div
                animate={{
                    y: [0, 40, 0],
                    x: [0, -20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, var(--color-secondary) 0%, rgba(255,255,255,0) 70%)',
                    opacity: 0.1,
                    borderRadius: '50%',
                    zIndex: -1
                }}
            />

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--color-primary)',
                        borderRadius: '20px',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem'
                    }}>
                        🚀 The #1 Adaptive Learning Platform
                    </span>
                    <h1 style={{
                        fontSize: '4rem',
                        marginBottom: '1.5rem',
                        color: 'var(--text-main)',
                        lineHeight: 1.1
                    }}>
                        The Digital Playground That <span className="gradient-text">Grows With You</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)',
                        marginBottom: '2.5rem',
                        maxWidth: '500px'
                    }}>
                        A safe, magical world that evolves from a toddler's garden to a teen's creative studio. One app, infinite possibilities.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="bouncy" size="lg" icon={Play}>Start Adventure</Button>
                        <Button variant="secondary" size="lg">Parent Hub</Button>
                    </div>
                </motion.div>

                {/* Right Visual (Placeholder for now) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ position: 'relative' }}
                >
                    {/* Abstract Composition of Screens */}
                    <div style={{
                        width: '100%',
                        height: '500px',
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        position: 'relative',
                        zIndex: 2,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Mock UI Header */}
                        <div style={{ padding: '1rem', borderBottom: '2px solid #f0f0f0', display: 'flex', gap: '0.5rem' }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FC8181' }}></div>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F6E05E' }}></div>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#68D391' }}></div>
                        </div>

                        {/* Mock UI Content */}
                        <div style={{ flex: 1, background: '#EFF6FF', padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div style={{ background: 'white', borderRadius: '16px', height: '150px' }}></div>
                            <div style={{ background: 'white', borderRadius: '16px', height: '150px' }}></div>
                            <div style={{ background: 'white', borderRadius: '16px', height: '150px', gridColumn: 'span 2' }}></div>
                        </div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            bottom: '-30px',
                            right: '-30px',
                            padding: '1.5rem',
                            background: 'white',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-lg)',
                            zIndex: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: '#F6E05E',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            🏆
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', color: 'var(--text-main)' }}>Level Up!</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You learned "Patterns"</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
