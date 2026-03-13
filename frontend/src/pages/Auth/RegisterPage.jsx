import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate('/parent/dashboard');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error("Registration failed", error);
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
                maxWidth: '500px',
                padding: '3rem',
                position: 'relative'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Create Your Parent Hub</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Sign up to get started</p>
                </div>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Input
                        label="Username"
                        placeholder="janedoe"
                        icon={User}
                        autoFocus
                        value={formData.username}
                        onChange={(e) => updateForm('username', e.target.value)}
                    />
                    <Input
                        label="Email Address"
                        placeholder="jane@family.com"
                        icon={Mail}
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                    />
                    <Input
                        label="Create Password"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        value={formData.password}
                        onChange={(e) => updateForm('password', e.target.value)}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        value={formData.confirmPassword}
                        onChange={(e) => updateForm('confirmPassword', e.target.value)}
                    />

                    {error && (
                        <div style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <Button variant="primary" type="submit">
                        Create Account <ArrowRight size={20} />
                    </Button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
