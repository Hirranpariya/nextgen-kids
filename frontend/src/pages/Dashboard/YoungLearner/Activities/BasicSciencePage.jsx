import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Atom } from 'lucide-react';
import BackButton from '../../../../components/ui/BackButton';
import Button from '../../../../components/ui/Button';
import PlantLab from '../../../../components/activities/science/PlantLab';
import CircuitBuilder from '../../../../components/activities/science/CircuitBuilder';

const BasicSciencePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('plant');

    const tabs = [
        { id: 'plant', label: 'Plant Lab', icon: FlaskConical },
        { id: 'circuit', label: 'Circuit Builder', icon: Atom }
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFC', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '2rem' }}>
                <BackButton to="/dashboard/young-learner" theme="youngLearner" />

                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#2D3748',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <FlaskConical size={32} color="#3182CE" />
                    Basic Science Lab
                </h1>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    borderBottom: '1px solid #E2E8F0',
                    paddingBottom: '1rem'
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '12px',
                                background: activeTab === tab.id ? '#3182CE' : '#FFFFFF',
                                color: activeTab === tab.id ? '#FFFFFF' : '#4A5568',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeTab === tab.id ? '0 2px 4px rgba(49, 130, 206, 0.2)' : 'none'
                            }}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {activeTab === 'plant' && <PlantLab />}
                {activeTab === 'circuit' && <CircuitBuilder />}
            </div>
        </div>
    );
};

export default BasicSciencePage;
