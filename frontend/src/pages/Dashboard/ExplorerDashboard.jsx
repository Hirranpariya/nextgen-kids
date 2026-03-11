import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import ExplorerLayout from '../../layouts/ExplorerLayout';
import ProfileHeader from '../../components/dashboard/explorer/ProfileHeader';
import WellnessPanel from '../../components/dashboard/explorer/WellnessPanel';
import AcademicZone from '../../components/dashboard/explorer/AcademicZone';
import TimeManagement from '../../components/dashboard/explorer/TimeManagement';
import AdvancedGrowthTracker from '../../components/dashboard/explorer/AdvancedGrowthTracker';
import DigitalSafety from '../../components/dashboard/explorer/DigitalSafety';

const ExplorerDashboard = () => {
    const { user, activeChild } = useAuth();
    const child = activeChild || user?.children?.[0] || { name: "Jordan", age: 10, avatar: "😎" };

    return (
        <ExplorerLayout>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1A202C', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                    Hello, {child.name}
                </h1>
                <p style={{ color: '#718096', fontSize: '0.95rem' }}>Here's what's happening today.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
                {/* Top Row: Profile & Stats */}
                <div style={{ gridColumn: 'span 8' }}>
                    <ProfileHeader 
                        name={child.name} 
                        age={child.age} 
                        avatar={child.avatar} 
                        grade={child.gradeLevel || "6th Grade"}
                        extracurriculars={child.extracurricularActivities}
                        hobbies={child.hobbies}
                    />
                </div>
                <div style={{ gridColumn: 'span 4' }}>
                    <WellnessPanel />
                </div>

                {/* Middle Row: Academics & Habits */}
                <div id="learning" style={{ gridColumn: 'span 7' }}>
                    <AcademicZone />
                </div>
                <div id="schedule" style={{ gridColumn: 'span 5' }}>
                    <TimeManagement />
                </div>

                {/* Bottom Row */}
                <div id="stats" style={{ gridColumn: 'span 4' }}>
                    <AdvancedGrowthTracker />
                </div>
                <div style={{ gridColumn: 'span 4' }}>
                    <DigitalSafety />
                </div>
                <div style={{ gridColumn: 'span 4' }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A0AEC0' }}>
                        Cognitive Skills (Coming Soon)
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 1024px) {
                    div[style*="gridColumn"] {
                        grid-column: span 12 !important;
                    }
                }
            `}</style>
        </ExplorerLayout>
    );
};

export default ExplorerDashboard;
