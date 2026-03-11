import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Star, Activity, Heart } from 'lucide-react';

const ProfileHeader = ({ name, age, grade = "6th Grade", avatar, extracurriculars, hobbies }) => {
    return (
        <div style={{
            background: 'white', borderRadius: '12px', padding: '1.5rem',
            border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '100%'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '12px', background: '#EDF2F7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem',
                    overflow: 'hidden'
                }}>
                    {avatar?.startsWith('data:image') ? (
                        <img src={avatar} alt={`${name}'s avatar`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        avatar || '😎'
                    )}
                </div>
                <div>
                    <div style={{
                        fontSize: '0.75rem', fontWeight: '700', color: '#3182CE',
                        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem'
                    }}>
                        Independent Explorer
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1A202C', margin: 0 }}>{name}</h2>
                    <div style={{ fontSize: '0.9rem', color: '#718096', marginTop: '0.25rem' }}>{grade} • {age} Years Old</div>
                    
                    {(extracurriculars || hobbies) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                            {extracurriculars && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', background: '#F0FFF4', color: '#276749', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>
                                    <Activity size={10} /> {extracurriculars}
                                </span>
                            )}
                            {hobbies && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', background: '#EBF8FF', color: '#2B6CB0', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>
                                    <Heart size={10} /> {hobbies}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2D3748' }}>85%</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096', fontWeight: '500' }}>Academic Focus</div>
                </div>
                <div style={{ width: '1px', background: '#E2E8F0' }}></div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2D3748' }}>Lvl 4</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096', fontWeight: '500' }}>Explorer Rank</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
