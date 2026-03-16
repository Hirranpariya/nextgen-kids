import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SidebarItem = ({ icon: Icon, label, to, active, onClick }) => {
    const content = (
        <motion.div
            whileHover={{ x: 5 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                color: active ? 'white' : 'var(--text-muted)',
                background: active ? 'var(--color-primary)' : 'transparent',
                marginBottom: '0.5rem',
                cursor: 'pointer',
                fontWeight: active ? '600' : '500',
                transition: 'background 0.3s ease'
            }}
        >
            <Icon size={20} />
            <span>{label}</span>
        </motion.div>
    );

    if (onClick) {
        return <div onClick={onClick}>{content}</div>;
    }
    return <Link to={to} style={{ textDecoration: 'none' }}>{content}</Link>;
};

const ToddlerLayout = ({ children }) => {
    const navigate = useNavigate();
    const { activeChild, exitChildMode } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleExitChildMode = () => {
        exitChildMode();
        navigate('/parent/dashboard');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#f8faff', overflow: 'hidden' }}>
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        backdropFilter: 'blur(2px)'
                    }}
                />
            )}

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
                style={{
                    width: '260px',
                    background: 'white',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid #edf2f7',
                    position: 'fixed',
                    height: '100%',
                    zIndex: 50,
                    left: 0,
                    top: 0
                }}
                className="sidebar-responsive"
            >
                {/* Logo Area */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#F6E05E',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#744210',
                            fontWeight: '900'
                        }}>K</div>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                            Kids Zone
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        padding: '1rem',
                        background: '#FFF5F5',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid #FED7D7'
                    }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#E53E3E', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Active Profile</div>
                        <div style={{ fontWeight: '800', color: '#2D3748' }}>{activeChild?.name || 'Explorer'}</div>
                    </div>

                    <SidebarItem
                        icon={ArrowLeft}
                        label="Back to Parents"
                        onClick={handleExitChildMode}
                    />
                    <div style={{ margin: '1rem 0', height: '1px', background: '#EDF2F7' }} />
                    <SidebarItem icon={LayoutDashboard} label="My Room" to="/dashboard/toddler" active={true} />
                </div>

                {/* User Profile / Exit */}
                <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            {activeChild?.avatar || '👶'}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{activeChild?.name || 'Explorer'}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Explorer</div>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={handleExitChildMode}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e53e3e', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        <LogOut size={16} /> Exit Profile
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', width: '100%' }}>
                <header style={{
                    height: '80px',
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="mobile-only"
                            onClick={() => setIsMobileMenuOpen(true)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                display: 'none'
                            }}
                        >
                            ☰
                        </button>
                    </div>
                </header>

                <main style={{ padding: '2rem' }}>
                    {children}
                </main>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .sidebar-responsive {
                        transform: translateX(-100%); 
                    }
                    .mobile-only {
                        display: block !important;
                    }
                    main {
                        padding: 1rem !important;
                    }
                }
                @media (min-width: 769px) {
                     .sidebar-responsive {
                        transform: none !important;
                        position: relative !important;
                     }
                     .mobile-only {
                         display: none !important;
                     }
                }
            `}</style>
        </div>
    );
};

export default ToddlerLayout;
