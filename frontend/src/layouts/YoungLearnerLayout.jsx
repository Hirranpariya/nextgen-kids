import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, ArrowLeft, Star, BookOpen, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SidebarItem = ({ icon: Icon, label, to, active, onClick }) => {
    const content = (
        <motion.div
            whileHover={{ x: 5, backgroundColor: 'rgba(56, 178, 172, 0.1)' }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                color: active ? 'white' : 'var(--text-muted)',
                background: active ? 'linear-gradient(135deg, #38B2AC 0%, #319795 100%)' : 'transparent', // Teal gradient for "Young Learner"
                marginBottom: '0.5rem',
                cursor: 'pointer',
                fontWeight: active ? '600' : '500',
                transition: 'all 0.3s ease',
                boxShadow: active ? '0 4px 6px -1px rgba(56, 178, 172, 0.4)' : 'none'
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

const YoungLearnerLayout = ({ children }) => {
    const navigate = useNavigate();
    const { activeChild, exitChildMode } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleExitChildMode = () => {
        exitChildMode();
        navigate('/parent/dashboard');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#F0F4F8', overflow: 'hidden' }}>
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
                    borderRight: '1px solid #E2E8F0',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 4px 6px -1px rgba(56, 178, 172, 0.3)'
                        }}>
                            <GraduationCap size={20} />
                        </div>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2C5282', letterSpacing: '-0.02em' }}>
                            Smart Kids
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        padding: '1rem',
                        background: '#E6FFFA', // Light Teal
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid #B2F5EA'
                    }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#319795', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Star size={12} fill="#319795" /> Active Student
                        </div>
                        <div style={{ fontWeight: '800', color: '#234E52', fontSize: '1.1rem' }}>{activeChild?.name || 'Learner'}</div>
                    </div>

                    <SidebarItem
                        icon={ArrowLeft}
                        label="Back to Parents"
                        onClick={handleExitChildMode}
                    />
                    <div style={{ margin: '1rem 0', height: '1px', background: '#E2E8F0' }} />
                    <SidebarItem icon={LayoutDashboard} label="My Space" to="/dashboard/young-learner" active={true} />
                    {/* Future items could be: My Projects, Reading List, etc. */}
                </div>

                {/* User Profile / Exit */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#B2F5EA', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                            {activeChild?.avatar || '👦'}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2D3748' }}>{activeChild?.name || 'Student'}</div>
                            <div style={{ fontSize: '0.8rem', color: '#718096' }}>Young Learner</div>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02, color: '#C53030' }}
                        onClick={handleExitChildMode}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E53E3E', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
                        <LogOut size={16} /> Exit Profile
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', width: '100%' }}>
                <header style={{
                    height: '70px',
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    borderBottom: '1px solid #E2E8F0'
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
                                display: 'none',
                                color: '#4A5568'
                            }}
                        >
                            ☰
                        </button>
                        <div style={{ fontWeight: '600', color: '#4A5568', fontSize: '1rem' }} className="desktop-only">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    {/* Header Extras like gamification points could go here */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEFCBF', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #F6E05E' }}>
                        <Star size={18} fill="#D69E2E" color="#D69E2E" />
                        <span style={{ fontWeight: '700', color: '#744210', fontSize: '0.9rem' }}>120 XP</span>
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

export default YoungLearnerLayout;
