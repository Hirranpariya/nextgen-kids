import { useAuth } from '../../hooks/useAuth';
import ToddlerLayout from '../../layouts/ToddlerLayout';
import ChildProfileHeader from '../../components/dashboard/toddler/ChildProfileHeader';
import GrowthTracker from '../../components/dashboard/toddler/GrowthTracker';
import ActivityMatrix from '../../components/dashboard/toddler/ActivityMatrix';
import HabitBuilder from '../../components/dashboard/toddler/HabitBuilder';
import ParentGuidance from '../../components/dashboard/toddler/ParentGuidance';

const ToddlerDashboard = () => {
    const { user, activeChild } = useAuth();

    // Use active child if selected, otherwise fallback to first child or mock
    const child = activeChild || user?.children?.[0] || { name: "Tommy", age: 5, avatar: "🦁" };

    const childData = {
        name: child.name,
        age: child.age,
        avatar: child.avatar || "🦁", // Ensure we pass the real avatar
        dominantHand: child.dominantHand,
        primaryLanguage: child.primaryLanguage
    };

    return (
        <ToddlerLayout>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <ChildProfileHeader {...childData} />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                    {/* Left Main Column */}
                    <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <ActivityMatrix />
                        <ParentGuidance />
                    </div>

                    {/* Right Side Column */}
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <GrowthTracker />
                        <HabitBuilder />
                    </div>
                </div>
            </div>
        </ToddlerLayout>
    );
};

export default ToddlerDashboard;
