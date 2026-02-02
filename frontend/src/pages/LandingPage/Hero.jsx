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

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
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

                {/* Right Visual - Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center' }}
                >
                    {/* Abstract Composition of Screens */}
                    <div style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '4/3',
                        background: 'white',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        position: 'relative',
                        zIndex: 2,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                        border: '4px solid white'
                    }}>
                        {/* Mock UI Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '2px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FC8181' }}></div>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F6E05E' }}></div>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#68D391' }}></div>
                            </div>
                            <div style={{ width: '40%', height: '10px', background: '#f0f0f0', borderRadius: '5px' }}></div>
                        </div>

                        {/* Mock UI Content */}
                        <div style={{ flex: 1, background: '#f8faff', padding: '1.5rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ height: '120px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white', fontWeight: 'bold' }}>Continue Learning</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ height: '100px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}></div>
                                    <div style={{ height: '100px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ height: '60px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}></div>
                                <div style={{ height: '60px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}></div>
                                <div style={{ flex: 1, background: 'linear-gradient(to bottom, #fff 0%, #f0f4f8 100%)', borderRadius: '16px', border: '1px dashed #cbd5e0' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            bottom: '10%',
                            right: '-5%',
                            padding: '1rem 1.5rem',
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            zIndex: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: '#F6E05E',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem'
                        }}>
                            🏆
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '0.9rem' }}>Level Up!</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>You learned "Patterns"</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
