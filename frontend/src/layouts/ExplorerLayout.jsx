import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ArrowLeft, BookOpen, Activity, Clock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SidebarItem = ({ icon: Icon, label, to, active, onClick }) => {
    return (
        <motion.div
            whileHover={{ x: 4, backgroundColor: 'rgba(226, 232, 240, 0.5)' }}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: active ? '#2D3748' : '#718096',
                background: active ? '#EDF2F7' : 'transparent',
                marginBottom: '0.25rem',
                cursor: 'pointer',
                fontWeight: active ? '600' : '500',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                position: 'relative'
            }}
        >
            {active && <div style={{ position: 'absolute', left: 0, top: '15%', height: '70%', width: '3px', background: '#4A5568', borderRadius: '0 4px 4px 0' }} />}
            <Icon size={18} strokeWidth={2} />
            <span style={{ fontSize: '0.95rem' }}>{label}</span>
            {onClick ? null : <Link to={to} style={{ position: 'absolute', inset: 0 }} />}
        </motion.div>
    );
};

const ExplorerLayout = ({ children }) => {
    const navigate = useNavigate();
    const { activeChild, exitChildMode } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleExitChildMode = () => {
        exitChildMode();
        navigate('/parent/dashboard');
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#F7FAFC', fontFamily: "'Inter', sans-serif" }}>
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

            {/* Sidebar - Minimal & Clean */}
            <motion.div
                initial={false}
                animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
                style={{
                    width: '240px',
                    background: 'white',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid #E2E8F0',
                    position: 'fixed',
                    height: '100%',
                    zIndex: 50,
                    left: 0,
                    top: 0
                }}
                className="sidebar-responsive"
            >
                {/* Brand */}
                <div style={{ marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '32px', height: '32px', background: '#F6E05E', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#744210', fontWeight: '900'
                        }}>
                            K
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1A202C', letterSpacing: '-0.02em' }}>Kids Zone</span>
                    </div>
                </div>

                {/* Explicit Active Profile Section */}
                <div style={{
                    padding: '1rem', background: '#F7FAFC', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #EDF2F7'
                }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#718096', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Active Profile
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#CBD5E0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {activeChild?.avatar || <User size={16} />}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2D3748', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {activeChild?.name || 'Explorer'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#A0AEC0', marginBottom: '0.5rem', paddingLeft: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        My Hub
                    </div>
                    <SidebarItem icon={LayoutGrid} label="Dashboard" to="/dashboard/explorer" active={true} />
                    <SidebarItem icon={BookOpen} label="Learning" onClick={() => scrollToSection('learning')} active={false} />
                    <SidebarItem icon={Activity} label="Stats" onClick={() => scrollToSection('stats')} active={false} />
                    <SidebarItem icon={Clock} label="Schedule" onClick={() => scrollToSection('schedule')} active={false} />
                </div>

                {/* Bottom Actions */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginTop: '1rem' }}>
                    <SidebarItem icon={ArrowLeft} label="Switch Profile" onClick={handleExitChildMode} />
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', width: '100%' }}>
                <header style={{
                    height: '64px',
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    borderBottom: '1px solid #EDF2F7'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="mobile-only"
                            onClick={() => setIsMobileMenuOpen(true)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4A5568' }}
                        >
                            ☰
                        </button>
                        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#4A5568', margin: 0 }} className="desktop-only">
                            Dashboard
                        </h2>
                    </div>

                    {/* Date Widget */}
                    <div style={{ fontSize: '0.9rem', color: '#718096', fontWeight: '500' }}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                </header>

                <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
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
                    .desktop-only {
                        display: none !important;
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

export default ExplorerLayout;
