import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shapes, Palette, Music, Move, Bike } from 'lucide-react';

const ActivityCard = ({ icon: Icon, title, description, color, type, route, onClick }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
            cursor: 'pointer',
            border: `2px solid ${color}20`,
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem'
        }}>
            <Icon size={30} />
        </div>
        <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2D3748', marginBottom: '0.25rem' }}>{title}</h4>
            <p style={{ fontSize: '0.8rem', color: '#718096' }}>{description}</p>
        </div>

        <div style={{
            marginTop: 'auto',
            background: color,
            color: 'white',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700'
        }}>
            Play Now
        </div>

        {/* Type Badge */}
        <div style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            fontSize: '0.65rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: '#A0AEC0',
            background: '#F7FAFC',
            padding: '0.2rem 0.5rem',
            borderRadius: '6px'
        }}>
            {type}
        </div>
    </motion.div>
);

const ActivityMatrix = () => {
    const navigate = useNavigate();

    const activities = [
        { icon: Palette, title: "Colors Fun", description: "Match the bright colors!", color: "#F6E05E", type: "Cognitive", route: "/dashboard/toddler/activities/colors" },
        { icon: Shapes, title: "Shapes Sort", description: "Find the matching shapes.", color: "#4299E1", type: "Cognitive", route: "/dashboard/toddler/activities/shapes" },
        { icon: Music, title: "Music Time", description: "Sing along with rhymes.", color: "#F687B3", type: "Sensory", route: "/dashboard/toddler/activities/music" },
        { icon: Move, title: "Jump & Run", description: "Let's move your body!", color: "#48BB78", type: "Motor", route: "/dashboard/toddler/activities/movement" },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="text-lg font-bold">Time to Play & Learn! 🎮</h3>
                <span className="text-muted text-sm">See all</span>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '2rem'
            }}>
                {activities.map((act, i) => (
                    <ActivityCard 
                        key={i} 
                        {...act} 
                        onClick={() => act.route && navigate(act.route)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ActivityMatrix;
