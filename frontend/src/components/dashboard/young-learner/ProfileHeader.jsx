import React from 'react';
import { motion } from 'framer-motion';
import { Award, User, GraduationCap, Heart, Star } from 'lucide-react';

const ProfileHeader = ({ name, age, gender, avatar, grade = "2nd Grade", favoriteSubject, hobbies }) => {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
                background: 'white',
                borderRadius: '20px',
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E2E8F0',
                marginBottom: '2rem'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#E6FFFA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    border: '3px solid #38B2AC',
                    overflow: 'hidden'
                }}>
                    {avatar?.startsWith('data:image') ? (
                        <img src={avatar} alt={`${name}'s avatar`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        avatar || '🧑‍🎓'
                    )}
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2D3748', margin: 0 }}>{name || 'Student'}</h2>
                        <span style={{
                            background: '#3182CE', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px',
                            fontSize: '0.75rem', fontWeight: '700'
                        }}>
                            {age} Years
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={14} /> {gender || 'Child'}
                        </span>
                        <span style={{ width: '4px', height: '4px', background: '#CBD5E0', borderRadius: '50%' }} />
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <GraduationCap size={14} /> {grade}
                        </span>
                    </div>
                    {(favoriteSubject || hobbies) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                            {favoriteSubject && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: '#EBF4FF', color: '#2B6CB0', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>
                                    <Star size={12} /> {favoriteSubject}
                                </span>
                            )}
                            {hobbies && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: '#FCE8F3', color: '#B83280', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>
                                    <Heart size={12} /> {hobbies}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{
                    padding: '0.75rem 1rem',
                    background: '#FFFFF0',
                    border: '1px solid #FAF089',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <Award size={24} color="#D69E2E" />
                    <div>
                        <div style={{ fontSize: '0.7rem', color: '#B7791F', fontWeight: '700', textTransform: 'uppercase' }}>Current Badge</div>
                        <div style={{ fontWeight: '800', color: '#744210' }}>Young Learner</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileHeader;
