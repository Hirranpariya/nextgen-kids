import React, { useState } from 'react';
import { LOGIC_PUZZLES } from '../../../constants/think';
import { CheckCircle, XCircle } from 'lucide-react';

const LogicPuzzles = () => {
    const [activePuzzle, setActivePuzzle] = useState(LOGIC_PUZZLES[0]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [feedback, setFeedback] = useState('');

    const handleSolve = () => {
        const correct = Object.entries(activePuzzle.answers).every(([name, answer]) => {
            return selectedAnswers[name] === answer;
        });

        setFeedback(correct ? 'Nice work! You solved it. 🧠' : 'Almost there! Check the clues again.');
    };

    const handleReset = () => {
        setSelectedAnswers({});
        setFeedback('');
    };

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748', marginBottom: '1.5rem' }}>
                Logic Puzzles
            </h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {LOGIC_PUZZLES.map(puzzle => (
                    <button
                        key={puzzle.id}
                        onClick={() => {
                            setActivePuzzle(puzzle);
                            handleReset();
                        }}
                        style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: activePuzzle.id === puzzle.id ? '#805AD5' : '#EDF2F7',
                            color: activePuzzle.id === puzzle.id ? 'white' : '#4A5568',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {puzzle.title}
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.75rem' }}>
                    {activePuzzle.title}
                </h3>
                <p style={{ color: '#718096', marginBottom: '1rem' }}>{activePuzzle.description}</p>

                <div style={{ background: '#F7FAFC', borderRadius: '12px', padding: '1rem', border: '1px solid #E2E8F0' }}>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Clues</h4>
                    <ul style={{ color: '#4A5568', lineHeight: '1.6' }}>
                        {activePuzzle.clues.map((clue, index) => (
                            <li key={index}>{clue}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem' }}>Your Answers</h4>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                    {Object.keys(activePuzzle.answers).map(name => (
                        <div key={name} style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid #E2E8F0',
                            background: '#F7FAFC'
                        }}>
                            <div style={{ fontWeight: '700', color: '#2D3748', marginBottom: '0.5rem' }}>{name}</div>
                            <input
                                value={selectedAnswers[name] || ''}
                                onChange={(e) => setSelectedAnswers(prev => ({ ...prev, [name]: e.target.value }))}
                                placeholder="Type your answer"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    border: '1px solid #CBD5E0',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                    onClick={handleSolve}
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '12px',
                        background: '#805AD5',
                        color: 'white',
                        fontWeight: '700',
                        cursor: 'pointer'
                    }}
                >
                    Check Answer
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
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
                {feedback && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        background: feedback.includes('Nice') ? '#C6F6D5' : '#FED7D7',
                        color: feedback.includes('Nice') ? '#22543D' : '#742A2A',
                        fontWeight: '600'
                    }}>
                        {feedback.includes('Nice') ? <CheckCircle size={18} /> : <XCircle size={18} />}
                        {feedback}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogicPuzzles;
