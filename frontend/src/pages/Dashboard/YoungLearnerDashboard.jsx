import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import YoungLearnerLayout from '../../layouts/YoungLearnerLayout';
import ProfileHeader from '../../components/dashboard/young-learner/ProfileHeader';
import AcademicSection from '../../components/dashboard/young-learner/AcademicSection';
import GrowthTracker from '../../components/dashboard/young-learner/GrowthTracker';
import HabitBuilder from '../../components/dashboard/young-learner/HabitBuilder';

const YoungLearnerDashboard = () => {
    const { user, activeChild } = useAuth();
    // Use active child if selected
    const child = activeChild || user?.children?.[0] || { name: "Alex", age: 7, gender: "Boy", avatar: "👦" };

    return (
        <YoungLearnerLayout>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <ProfileHeader
                    name={child.name}
                    age={child.age}
                    gender={child.gender}
                    avatar={child.avatar}
                    grade={child.gradeLevel || "Young Learner"}
                    favoriteSubject={child.favoriteSubject}
                    hobbies={child.hobbies}
                />

                <div className="grid-dashboard" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '1.5rem',
                    alignItems: 'start'
                }}>
                    {/* Left Column - Academics takes more width if possible */}
                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <AcademicSection />

                        {/* Placeholder for Emotional/Social - can be added later */}
                        <div style={{ background: '#FFF5F5', padding: '1.5rem', borderRadius: '20px', border: '1px solid #FED7D7' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#C53030' }}>😊 Emotional Check-in</h3>
                            <p style={{ color: '#E53E3E', fontSize: '0.9rem' }}>How are you feeling today? (Coming Soon)</p>
                        </div>
                    </div>

                    {/* Right Column - Trackers */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <HabitBuilder />
                        <GrowthTracker />
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 1024px) {
                    .grid-dashboard > div {
                        grid-column: span 1 !important;
                    }
                }
            `}</style>
        </YoungLearnerLayout>
    );
};

export default YoungLearnerDashboard;
