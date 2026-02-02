import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Gift, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ProgressBar from '../../components/ui/ProgressBar';

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FFF5F5 0%, #EBF8FF 100%)', // Soft pastel mix
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '500px',
                background: 'white',
                borderRadius: '32px',
                padding: '3rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Join the Family</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create your Parent Hub account</p>
                </div>

                <ProgressBar currentStep={step} totalSteps={totalSteps} />

                {/* Form Area */}
                <div style={{ minHeight: '300px' }}>
                    <AnimatePresence mode='wait' custom={step}>
                        {step === 1 && (
                            <motion.div
                                key={1}
                                custom={1}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>About You (The Guardian)</h3>
                                <Input label="Full Name" placeholder="Jane Doe" icon={User} autoFocus />
                                <Input label="Email Address" placeholder="jane@family.com" icon={Mail} />
                                <Input label="Create Password" type="password" placeholder="••••••••" icon={Lock} />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key={2}
                                custom={1}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Your First Explorer</h3>
                                <div style={{
                                    background: '#F0FFF4',
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <div style={{ fontSize: '2rem' }}>🎁</div>
                                    <p style={{ fontSize: '0.9rem', color: '#276749' }}>We'll customize the experience based on their age!</p>
                                </div>
                                <Input label="Child's Name" placeholder="Tommy" icon={User} autoFocus />
                                <Input label="Age" type="number" placeholder="5" icon={Gift} />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key={3}
                                custom={1}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Secure Your Hub</h3>
                                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                                    Set a 4-digit PIN. This prevents your child from exiting their safe zone.
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <input
                                            key={i}
                                            type="password"
                                            maxLength={1}
                                            style={{
                                                width: '60px',
                                                height: '70px',
                                                borderRadius: '16px',
                                                border: '2px solid #e2e8f0',
                                                fontSize: '2rem',
                                                textAlign: 'center',
                                                outline: 'none',
                                                background: '#f8fafc'
                                            }}
                                        />
                                    ))}
                                </div>
                                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Don't worry, you can change this later.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f0f0f0'
                }}>
                    {step > 1 ? (
                        <Button variant="ghost" icon={ArrowLeft} onClick={prevStep}>Back</Button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < totalSteps ? (
                        <Button variant="primary" onClick={nextStep}>
                            Next <ArrowRight size={20} />
                        </Button>
                    ) : (
                        <Button variant="bouncy" style={{ background: '#48BB78' }}>
                            Create Account 🚀
                        </Button>
                    )}
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
