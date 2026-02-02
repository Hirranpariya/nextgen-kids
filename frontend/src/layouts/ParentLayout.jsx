import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Settings, LogOut, Bell, Search, Heart, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link to={to} style={{ textDecoration: 'none' }}>
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
    </Link>
);

const ParentLayout = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
                // Use a media query in vanilla styling or simple logic for desktop
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
                    top: 0,
                    // Desktop styles override (this is a simplified approach)
                }}
                className="sidebar-responsive"
            >
                {/* Logo Area */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'var(--color-primary)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '900'
                        }}>N</div>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>Parent Hub</span>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        className="mobile-only"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <div style={{ flex: 1 }}>
                    <SidebarItem icon={LayoutDashboard} label="Overview" to="/parent/dashboard" active={location.pathname.includes('dashboard')} />
                    <SidebarItem icon={Users} label="My Kids" to="/parent/profiles" active={location.pathname.includes('profiles')} />
                    <SidebarItem icon={LayoutDashboard} label="Learning Zone" to="/parent/learning" active={location.pathname.includes('learning')} />
                    <SidebarItem icon={Heart} label="Wellness" to="/parent/wellness" active={location.pathname.includes('wellness')} />
                    <SidebarItem icon={Users} label="Community" to="/parent/community" active={location.pathname.includes('community')} />
                    <SidebarItem icon={Bell} label="Notifications" to="/parent/notifications" />
                    <SidebarItem icon={Settings} label="Settings" to="/parent/settings" />
                    <SidebarItem icon={HelpCircle} label="Help & Support" to="/parent/help" active={location.pathname.includes('help')} />
                </div>

                {/* User Profile / Logout */}
                <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Jane Doe</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Super Mom</div>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e53e3e', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        <LogOut size={16} /> Sign Out
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', width: '100%' }}>
                {/* Top Header */}
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
                                display: 'none' // Hidden by default, shown via CSS
                            }}
                        >
                            ☰
                        </button>
                        <div style={{ color: 'var(--text-muted)' }} className="desktop-only">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ background: 'white', padding: '0.5rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
                            <Search size={20} color="var(--text-muted)" />
                        </div>
                        <div style={{ background: 'white', padding: '0.5rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} color="var(--text-muted)" />
                            <div style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, background: 'red', borderRadius: '50%' }} />
                        </div>
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

export default ParentLayout;
