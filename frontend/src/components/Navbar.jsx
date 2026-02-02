import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
    return (
        <nav style={{
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 100,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.3)',
            padding: '1rem 0'
        }}>
            <div className="container flex-between">
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '900',
                        fontSize: '1.4rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}>
                        N
                    </div>
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>
                        NextGen<span className="text-primary">Kids</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="flex gap-4 hide-mobile" style={{ fontWeight: '600' }}>
                    <a href="#features" className="text-muted" style={{ transition: 'color 0.2s' }}>Features</a>
                    <a href="#age-groups" className="text-muted">Age Groups</a>
                    <a href="#parents" className="text-muted">For Parents</a>
                </div>

                {/* Auth Buttons */}
                <div className="flex gap-2">
                    <Link to="/login">
                        <Button variant="ghost">Log In</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="primary" icon={ArrowRight}>Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
