import React from 'react';
import { motion } from 'framer-motion';
import { Book, Calculator, Cpu, Globe, ArrowRight } from 'lucide-react';

const SubjectModule = ({ title, icon: Icon, progress, color }) => (
    <motion.div
        whileHover={{ y: -2 }}
        style={{
            background: 'white', border: '1px solid #E2E8F0', borderRadius: '10px',
            padding: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: `${color}15`, borderRadius: '8px', color: color }}>
                    <Icon size={18} />
                </div>
                <span style={{ fontWeight: '600', color: '#2D3748', fontSize: '0.9rem' }}>{title}</span>
            </div>
            <ArrowRight size={14} color="#A0AEC0" />
        </div>
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: '#718096' }}>
                <span>Progress</span>
                <span>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: '#EDF2F7', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: '2px' }} />
            </div>
        </div>
    </motion.div>
);

const AcademicZone = () => {
    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Book size={18} color="#805AD5" /> Academic Zone
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#3182CE', fontWeight: '600', cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <SubjectModule title="Mathematics" icon={Calculator} progress={75} color="#3182CE" />
                <SubjectModule title="Science" icon={Cpu} progress={60} color="#38A169" />
                <SubjectModule title="Language Arts" icon={Book} progress={85} color="#D69E2E" />
                <SubjectModule title="Logic & Reasoning" icon={Globe} progress={40} color="#805AD5" />
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#F7FAFC', borderRadius: '10px', border: '1px solid #EDF2F7' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.5rem' }}>Daily Challenge 🧠</div>
                <div style={{ fontSize: '0.8rem', color: '#4A5568', marginBottom: '0.5rem' }}>
                    "If a train leaves Station A at 60mph..."
                </div>
                <div style={{ fontSize: '0.75rem', color: '#3182CE', fontWeight: '600', cursor: 'pointer' }}>Solve Now &rarr;</div>
            </div>
        </div>
    );
};

export default AcademicZone;
