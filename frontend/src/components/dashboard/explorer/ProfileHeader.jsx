import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Star } from 'lucide-react';

const ProfileHeader = ({ name, age, grade = "5th Grade", avatar }) => {
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
                    {avatar || '😎'}
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
