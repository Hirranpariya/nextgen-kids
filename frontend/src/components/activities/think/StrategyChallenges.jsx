import React, { useState } from 'react';
import { STRATEGY_CHALLENGES } from '../../../constants/think';
import { Lightbulb, RefreshCcw } from 'lucide-react';

const StrategyChallenges = () => {
    const [activeChallenge, setActiveChallenge] = useState(STRATEGY_CHALLENGES[0]);
    const [showHints, setShowHints] = useState(false);
    const [solved, setSolved] = useState(false);

    const handleSolve = () => {
        setSolved(true);
    };

    const handleReset = () => {
        setSolved(false);
        setShowHints(false);
    };

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748', marginBottom: '1.5rem' }}>
                Strategy Challenges
            </h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {STRATEGY_CHALLENGES.map(challenge => (
                    <button
                        key={challenge.id}
                        onClick={() => {
                            setActiveChallenge(challenge);
                            handleReset();
                        }}
                        style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: activeChallenge.id === challenge.id ? '#805AD5' : '#EDF2F7',
                            color: activeChallenge.id === challenge.id ? 'white' : '#4A5568',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {challenge.title}
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.75rem' }}>
                    {activeChallenge.title}
                </h3>
                <p style={{ color: '#718096', marginBottom: '1rem' }}>{activeChallenge.description}</p>

                <div style={{ background: '#F7FAFC', borderRadius: '12px', padding: '1rem', border: '1px solid #E2E8F0' }}>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Characters</h4>
                    <ul style={{ color: '#4A5568', lineHeight: '1.6' }}>
                        {activeChallenge.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setShowHints(!showHints)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '12px',
                        background: '#F6E05E',
                        color: '#744210',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Lightbulb size={16} />
                    {showHints ? 'Hide Hints' : 'Show Hints'}
                </button>
                <button
                    onClick={handleSolve}
                    disabled={solved}
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '12px',
                        background: '#805AD5',
                        color: 'white',
                        fontWeight: '700',
                        cursor: solved ? 'not-allowed' : 'pointer',
                        opacity: solved ? 0.6 : 1
                    }}
                >
                    {solved ? 'Solved ✅' : 'Mark as Solved'}
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '12px',
                        background: '#EDF2F7',
                        color: '#4A5568',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <RefreshCcw size={16} />
                    Reset
                </button>
            </div>

            {showHints && (
                <div style={{
                    background: '#E9D8FD',
                    border: '1px solid #D6BCFA',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <h4 style={{ fontWeight: '700', marginBottom: '0.75rem' }}>Hints</h4>
                    <ul style={{ color: '#4A5568', lineHeight: '1.6' }}>
                        {activeChallenge.hints.map((hint, index) => (
                            <li key={index}>{hint}</li>
                        ))}
                    </ul>
                </div>
            )}

            {solved && (
                <div style={{
                    background: '#C6F6D5',
                    border: '1px solid #9AE6B4',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: '#22543D',
                    fontWeight: '700'
                }}>
                    <div style={{ marginBottom: '0.75rem' }}>Well done! Here's a suggested solution:</div>
                    <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        {activeChallenge.solution}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StrategyChallenges;
