import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import HeroVisual from './HeroVisual';

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
                        <Link to="/register">
                            <Button variant="bouncy" size="lg" icon={Play}>Start Adventure</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="secondary" size="lg">Parent Hub</Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Right Visual - Dashboard Preview */}
                <HeroVisual />
            </div>
        </section>
    );
};

export default Hero;
