import React, { useState } from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import PostCard from '../../components/community/PostCard';
import { MessageSquare, Users, Award, Search, PenTool } from 'lucide-react';
import Button from '../../components/ui/Button';

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('feed');

    const posts = [
        {
            author: "Sarah Jenkins",
            time: "2h ago",
            content: "Does anyone have recommendations for screen-free logic games for a 5-year-old? Tommy loves pattern matching but I want to get him off the iPad for a bit.",
            likes: 24,
            comments: 8,
            tags: ["Advice", "ScreenFree", "Logic"]
        },
        {
            author: "NextGen Official",
            time: "5h ago",
            content: "Weekly Challenge Alert! 🚀 This week's theme is 'Space Exploration'. Complete 3 space activities to unlock the Astronaut Badge!",
            image: "#2d3748", // Placeholder color
            likes: 156,
            comments: 12,
            tags: ["Challenge", "Update"]
        },
        {
            author: "Mike Ross",
            time: "1d ago",
            content: "Just unlocked the 'Little Chef' milestone! The kitchen safety module was surprisingly detailed. Highly recommend.",
            likes: 45,
            comments: 3,
            tags: ["Milestone", "Review"]
        },
    ];

    return (
        <ParentLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Parent Community</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Connect, share, and grow with other families.</p>
                </div>
                <Button variant="primary" icon={PenTool}>New Post</Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Feed Column */}
                <div>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1px' }}>
                        {['feed', 'questions', 'events'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 0',
                                    marginRight: '1rem',
                                    background: 'transparent',
                                    borderBottom: activeTab === tab ? '3px solid var(--color-primary)' : '3px solid transparent',
                                    color: activeTab === tab ? 'var(--color-primary)' : 'var(--text-muted)',
                                    fontWeight: '700',
                                    textTransform: 'capitalize',
                                    cursor: 'pointer'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {posts.map((post, i) => (
                        <PostCard key={i} {...post} />
                    ))}
                </div>

                {/* Sidebar Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Search */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search discussions..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    background: '#f8fafc'
                                }}
                            />
                        </div>
                    </div>

                    {/* Trending Topics */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Trending Topics</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {['#ScreenTime', '#HealthySnacks', '#Montessori', '#SleepTraining', '#ReadingLists'].map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    background: '#f7fafc',
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Experts Online */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem' }}>Ask an Expert</h3>
                            <span style={{ fontSize: '0.8rem', color: '#48BB78', fontWeight: 'bold' }}>3 Online</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F6AD55' }} />
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: '#48BB78', borderRadius: '50%', border: '2px solid white' }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Dr. Emily Chen</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Child Psychologist</div>
                            </div>
                        </div>

                        <Button variant="secondary" size="sm" style={{ width: '100%', justifyContent: 'center' }}>Start Chat</Button>
                    </div>
                </div>
            </div>
        </ParentLayout>
    );
};

export default CommunityPage;
