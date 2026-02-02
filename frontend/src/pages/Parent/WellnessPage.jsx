import React, { useState } from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import HabitTracker from '../../components/wellness/HabitTracker';
import MoodTracker from '../../components/wellness/MoodTracker';
import { Apple, Moon, Droplets } from 'lucide-react';

const NutritionCard = ({ title, value, target, icon: Icon, color, unit }) => (
    <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={24} />
        </div>
        <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>{title}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{value}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ {target} {unit}</span>
            </div>
        </div>
    </div>
);

const WellnessPage = () => {
    const [habits, setHabits] = useState([
        { title: "Brushed Teeth Morning", icon: "🦷", color: "#63B3ED", completed: true },
        { title: "Book Reading", icon: "📚", color: "#9F7AEA", completed: false },
        { title: "Outdoor Play (30m)", icon: "⚽", color: "#48BB78", completed: false },
        { title: "No Screens after 7PM", icon: "📵", color: "#FC8181", completed: false },
    ]);

    const toggleHabit = (index) => {
        const newHabits = [...habits];
        newHabits[index].completed = !newHabits[index].completed;
        setHabits(newHabits);
    };

    return (
        <ParentLayout>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Wellness Journey</h1>
                <p style={{ color: 'var(--text-muted)' }}>Holistic health monitoring for body and mind.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <NutritionCard title="Water Intake" value="4" target="6" unit="cups" icon={Droplets} color="#63B3ED" />
                <NutritionCard title="Sleep Duration" value="9.5" target="10" unit="hrs" icon={Moon} color="#805AD5" />
                <NutritionCard title="Fruit & Veg" value="3" target="5" unit="servings" icon={Apple} color="#F6AD55" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Left Col: Emotional */}
                <MoodTracker />

                {/* Right Col: Habits */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                    <HabitTracker habits={habits} onToggle={toggleHabit} />
                </div>
            </div>
        </ParentLayout>
    );
};

export default WellnessPage;
