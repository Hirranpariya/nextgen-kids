import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
    return (
        <nav style={{
            padding: '1.5rem 0',
            position: 'absolute',
            width: '100%',
            top: 0,
            zIndex: 50
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--color-primary)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '900',
                        fontSize: '1.2rem',
                        transform: 'rotate(-5deg)'
                    }}>
                        N
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--text-main)'
                    }}>
                        NextGen<span style={{ color: 'var(--color-primary)' }}>Kids</span>
                    </span>
                </div>

                {/* Links */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    fontWeight: '600',
                    display: 'none' // Hidden on mobile for now
                }} className="desktop-menu">
                    <a href="#features">Features</a>
                    <a href="#age-groups">Age Groups</a>
                    <a href="#parents">For Parents</a>
                </div>

                {/* Auth Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="/login"><Button variant="ghost">Log In</Button></a>
                    <a href="/register"><Button variant="primary" icon={ArrowRight}>Get Started</Button></a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
