import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Plus, X, Divide, Shapes } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import MathPractice from '../../../../components/activities/math/MathPractice';
import MathGames from '../../../../components/activities/math/MathGames';

const FunMathPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('practice');

    const tabs = [
        { id: 'practice', label: 'Math Practice', icon: Calculator },
        { id: 'games', label: 'Math Games', icon: Plus }
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFC', padding: '2rem' }}>
            {/* Header */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '2rem' }}>
                <Button
                    variant="ghost"
                    onClick={() => navigate('/dashboard/young-learner')}
                    style={{ marginBottom: '1rem' }}
                >
                    <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                    Back to Dashboard
                </Button>

                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#2D3748',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Calculator size={32} color="#38A169" />
                    Fun Math
                </h1>

                {/* Tabs */}
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
                                background: activeTab === tab.id ? '#38A169' : '#FFFFFF',
                                color: activeTab === tab.id ? '#FFFFFF' : '#4A5568',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeTab === tab.id ? '0 2px 4px rgba(56, 161, 105, 0.2)' : 'none'
                            }}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {activeTab === 'practice' && <MathPractice />}
                {activeTab === 'games' && <MathGames />}
            </div>
        </div>
    );
};

export default FunMathPage;