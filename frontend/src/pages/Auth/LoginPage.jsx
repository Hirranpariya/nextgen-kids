import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/parent/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FFF5F5 0%, #EBF8FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="card" style={{
                width: '100%',
                maxWidth: '450px',
                padding: '2rem 2.5rem',
                position: 'relative'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to continue your journey</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ background: '#ebf8ff', padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem', color: '#2c5282', textAlign: 'center' }}>
                        <strong>Demo Credentials:</strong><br />
                        Email: demo@parent.com<br />
                        Pass: password123
                    </div>

                    <Input
                        label="Email Address"
                        placeholder="demo@parent.com"
                        icon={Mail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: '600' }}>Forgot Pin?</a>
                        </div>
                    </div>

                    {error && (
                        <div style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            padding: '1rem', 
                            marginTop: '0.5rem', 
                            background: 'var(--color-primary)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '0.75rem', 
                            fontWeight: 'bold', 
                            fontSize: '1rem', 
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Log In <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ marginTop: '0.5rem', textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid #edf2f7' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>Join the Family</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
