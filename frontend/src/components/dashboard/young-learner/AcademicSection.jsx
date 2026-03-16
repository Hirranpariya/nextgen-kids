import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Binary, Microscope, ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';

const SubjectCard = ({ title, icon: Icon, color, bg, onClick }) => (
    <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.25rem',
            border: `1px solid ${bg}`,
            borderBottom: `4px solid ${bg}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            cursor: onClick ? 'pointer' : 'default'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '10px', background: bg, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={20} />
            </div>
            <div style={{
                fontSize: '0.7rem', fontWeight: '700', background: '#EDF2F7',
                padding: '0.2rem 0.6rem', borderRadius: '20px', color: '#4A5568'
            }}>
                Level 1
            </div>
        </div>
        <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', marginBottom: '0.25rem' }}>{title}</h4>
            <div style={{ width: '100%', height: '6px', background: '#EDF2F7', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '40%', height: '100%', background: color, borderRadius: '3px' }}></div>
            </div>
        </div>
    </motion.div>
);

const AcademicSection = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2C5282', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen size={24} color="#3182CE" /> Academic Zone
                    </h3>
                    <p style={{ color: '#718096', fontSize: '0.9rem' }}>Math, logic, and reading fun!</p>
                </div>
                <Button variant="ghost" size="sm">View Curriculum <ArrowRight size={16} /></Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <SubjectCard
                    title="Reading & Stories"
                    icon={BookOpen}
                    color="#DD6B20"
                    bg="#FBD38D"
                    onClick={() => navigate('/dashboard/young-learner/activities/reading-stories')}
                />
                <SubjectCard
                    title="Fun Math"
                    icon={Calculator}
                    color="#38A169"
                    bg="#9AE6B4"
                    onClick={() => navigate('/dashboard/young-learner/activities/fun-math')}
                />
                <SubjectCard
                    title="Think & Learn"
                    icon={Binary}
                    color="#805AD5"
                    bg="#D6BCFA"
                    onClick={() => navigate('/dashboard/young-learner/activities/think-learn')}
                />
                <SubjectCard
                    title="Basic Science"
                    icon={Microscope}
                    color="#3182CE"
                    bg="#90CDF4"
                    onClick={() => navigate('/dashboard/young-learner/activities/basic-science')}
                />
            </div>
        </div>
    );
};

export default AcademicSection;
