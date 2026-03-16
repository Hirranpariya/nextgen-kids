import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Headphones } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import LearnReading from '../../../../components/activities/reading/LearnReading';
import ListenStories from '../../../../components/activities/reading/ListenStories';

const ReadingStoriesPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('learn-reading');

    const tabs = [
        { id: 'learn-reading', label: 'Learn Reading', icon: BookOpen },
        { id: 'listen-stories', label: 'Listen Stories', icon: Headphones }
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
                    <BookOpen size={32} color="#DD6B20" />
                    Reading & Stories
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
                                background: activeTab === tab.id ? '#DD6B20' : '#FFFFFF',
                                color: activeTab === tab.id ? '#FFFFFF' : '#4A5568',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeTab === tab.id ? '0 2px 4px rgba(221, 107, 32, 0.2)' : 'none'
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
                {activeTab === 'learn-reading' && <LearnReading />}
                {activeTab === 'listen-stories' && <ListenStories />}
            </div>
        </div>
    );
};

export default ReadingStoriesPage;