import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Home } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Link } from 'react-router-dom';

const Mascot = () => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
            width: '150px',
            height: '150px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            marginBottom: '2rem',
            position: 'relative',
            zIndex: 2
        }}
    >
        <motion.div
            animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            👽
        </motion.div>
    </motion.div>
);

const LoginPage = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f6f8fb 0%, #e2e8f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, var(--color-primary) 0%, rgba(255,255,255,0) 70%)',
                opacity: 0.1,
                borderRadius: '50%'
            }} />

            <div className="container" style={{ width: '100%', maxWidth: '1000px', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center'
                }}>

                    {/* Left Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'white',
                            padding: '3rem',
                            borderRadius: '32px',
                            boxShadow: 'var(--shadow-lg)',
                            position: 'relative'
                        }}
                    >
                        {/* Back to Home Utility */}
                        <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
                            <Link to="/">
                                <Button variant="ghost" size="sm" icon={Home}>Home</Button>
                            </Link>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back!</h1>
                            <p style={{ color: 'var(--text-muted)' }}>Sign in to the Parent Hub to manage your child's journey.</p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <Input
                                id="email"
                                label="Email Address"
                                placeholder="parent@example.com"
                                icon={Mail}
                            />
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                icon={Lock}
                            />

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                                <a href="#" style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.9rem' }}>Forgot Password?</a>
                            </div>

                            <Button variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center' }} icon={ArrowRight}>
                                Sign In
                            </Button>
                        </form>

                        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            Don't have an account? <Link to="/register"><span style={{ color: 'var(--color-primary)', fontWeight: '700', cursor: 'pointer' }}>Create one free</span></Link>
                        </div>
                    </motion.div>

                    {/* Right Side: Visual/Mascot */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Mascot />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Safety First.</h2>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                                Your portal is secured with 256-bit encryption. We keep the fun for the kids and the control for you.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
