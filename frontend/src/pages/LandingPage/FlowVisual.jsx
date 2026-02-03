import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FlowVisual = () => {
    return (
        <section style={{ padding: '6rem 0 3rem 0', background: 'white' }}>
            <div className="container">
                <div style={{
                    background: 'var(--color-primary)',
                    borderRadius: '32px',
                    padding: '5rem',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>Ready to grow with us?</h2>
                    <p style={{ fontSize: '1.5rem', marginBottom: '3rem', opacity: 0.9, position: 'relative', zIndex: 2 }}>Join 10,000+ families growing together.</p>

                    <Link to="/register">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '1.25rem 3rem',
                                background: 'white',
                                color: 'var(--color-primary)',
                                fontSize: '1.25rem',
                                fontWeight: '800',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                position: 'relative',
                                zIndex: 2
                            }}
                        >
                            Get Started...
                        </motion.button>
                    </Link>

                    {/* Decorative Background Elements */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        <div style={{ position: 'absolute', top: '10%', left: '10%', fontSize: '4rem', opacity: 0.2 }}>🚀</div>
                        <div style={{ position: 'absolute', bottom: '10%', right: '10%', fontSize: '4rem', opacity: 0.2 }}>🎨</div>
                        <div style={{ position: 'absolute', top: '50%', left: '20%', fontSize: '2rem', opacity: 0.2 }}>🧩</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlowVisual;
