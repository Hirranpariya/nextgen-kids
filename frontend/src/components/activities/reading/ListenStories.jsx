import React, { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import { STORIES } from '../../../constants/stories';
import StoryPlayer from './StoryPlayer';

const ListenStories = () => {
    const [selectedStory, setSelectedStory] = useState(null);

    if (selectedStory) {
        return <StoryPlayer story={selectedStory} onBack={() => setSelectedStory(null)} />;
    }

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748', marginBottom: '1.5rem' }}>
                Listen to Stories
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {STORIES.map(story => (
                    <div
                        key={story.id}
                        onClick={() => setSelectedStory(story)}
                        style={{
                            background: '#F7FAFC',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid #E2E8F0',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            ':hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                background: '#DD6B20',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <Play size={24} />
                            </div>
                            <div style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                background: '#EDF2F7',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                color: '#4A5568',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                <Clock size={12} />
                                {story.duration}
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2D3748', marginBottom: '0.5rem' }}>
                            {story.title}
                        </h3>

                        <p style={{ color: '#718096', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            {story.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListenStories;