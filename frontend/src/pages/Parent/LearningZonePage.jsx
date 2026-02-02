import React, { useState } from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import FilterBar from '../../components/learning/FilterBar';
import ContentCard from '../../components/learning/ContentCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const LearningZonePage = () => {
    const [activeAge, setActiveAge] = useState('all');
    const [activeCategory, setActiveCategory] = useState('all');

    const ageFilters = [
        { id: 'all', label: 'All Ages' },
        { id: '3-5', label: 'Toddlers (3-5)' },
        { id: '6-9', label: 'Kids (6-9)' },
        { id: '10-12', label: 'Pre-Teens (10-12)' },
    ];

    const catFilters = [
        { id: 'all', label: 'Everything' },
        { id: 'math', label: 'Math & Logic' },
        { id: 'science', label: 'Science' },
        { id: 'art', label: 'Creative Arts' },
        { id: 'reading', label: 'Reading' },
    ];

    const content = [
        { title: "Counting with Dinos", category: "math", age: "3-5", duration: "5m", difficulty: 1, thumbnail: "#FED7D7" },
        { title: "Solar System Tour", category: "science", age: "6-9", duration: "12m", difficulty: 2, thumbnail: "#C4F1F9" },
        { title: "Color Theory Basics", category: "art", age: "3-5", duration: "8m", difficulty: 1, thumbnail: "#FBB6CE" },
        { title: "Physics of Rollercoasters", category: "science", age: "10-12", duration: "20m", difficulty: 3, thumbnail: "#9AE6B4" },
        { title: "Advanced Shapes", category: "math", age: "6-9", duration: "10m", difficulty: 2, thumbnail: "#E9D8FD" },
        { title: "Coding Logic 101", category: "math", age: "10-12", duration: "25m", difficulty: 3, thumbnail: "#FAF089" },
        { title: "Alphabet Song", category: "reading", age: "3-5", duration: "3m", difficulty: 1, thumbnail: "#FEEBC8" },
        { title: "History of Castles", category: "history", age: "6-9", duration: "15m", difficulty: 2, thumbnail: "#E2E8F0" },
    ];

    const filteredContent = content.filter(item => {
        const ageMatch = activeAge === 'all' || item.age === activeAge;
        const catMatch = activeCategory === 'all' || item.category === activeCategory;
        return ageMatch && catMatch;
    });

    return (
        <ParentLayout>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Learning Zone</h1>
                <p style={{ color: 'var(--text-muted)' }}>Curated content library for all developmental stages.</p>
            </div>

            {/* Filters Overlay */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search for topics, e.g., 'Dinosaurs'"
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                borderRadius: '50px',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                background: '#f8fafc'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>AGE GROUP</div>
                    <FilterBar filters={ageFilters} activeFilter={activeAge} onFilterChange={setActiveAge} color="#4299E1" />
                </div>

                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CATEGORY</div>
                    <FilterBar filters={catFilters} activeFilter={activeCategory} onFilterChange={setActiveCategory} color="#9F7AEA" />
                </div>
            </div>

            {/* Content Grid */}
            <motion.div
                layout
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}
            >
                {filteredContent.map((item, index) => (
                    <ContentCard key={index} {...item} index={index} />
                ))}
            </motion.div>

            {filteredContent.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <p>No content found for these filters.</p>
                </div>
            )}
        </ParentLayout>
    );
};

export default LearningZonePage;
