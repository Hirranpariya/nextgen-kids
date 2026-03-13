import React, { useState } from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { READING_EXERCISES } from '../../../constants/stories';

const LearnReading = () => {
    const [currentExercise, setCurrentExercise] = useState(0);
    const [completed, setCompleted] = useState(new Set());

    const exercise = READING_EXERCISES[currentExercise];

    const speak = (text) => {
        if (!window.speechSynthesis) return;
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
    };

    const handleComplete = () => {
        setCompleted(prev => new Set([...prev, currentExercise]));
        if (currentExercise < READING_EXERCISES.length - 1) {
            setCurrentExercise(currentExercise + 1);
        }
    };

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748', marginBottom: '1.5rem' }}>
                Learn Reading
            </h2>

            {/* Exercise Navigation */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {READING_EXERCISES.map((ex, index) => (
                    <button
                        key={ex.id}
                        onClick={() => setCurrentExercise(index)}
                        style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: currentExercise === index ? '#DD6B20' : completed.has(index) ? '#38A169' : '#EDF2F7',
                            color: currentExercise === index || completed.has(index) ? 'white' : '#4A5568',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {completed.has(index) && <CheckCircle size={16} style={{ marginRight: '0.25rem' }} />}
                        {ex.title}
                    </button>
                ))}
            </div>

            {/* Current Exercise */}
            {exercise && (
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2D3748', marginBottom: '1rem' }}>
                        {exercise.title}
                    </h3>
                    <p style={{ color: '#718096', marginBottom: '1.5rem' }}>{exercise.description}</p>

                    {exercise.type === 'phonics' && (
                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Match Letters to Sounds:</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
                                {exercise.letters.map((letter, index) => (
                                    <div key={letter} style={{
                                        background: '#F7FAFC',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        border: '1px solid #E2E8F0'
                                    }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#DD6B20', marginBottom: '0.5rem' }}>
                                            {letter}
                                        </div>
                                        <button
                                            onClick={() => speak(exercise.sounds[index])}
                                            style={{
                                                background: '#DD6B20',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '0.5rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                margin: '0 auto'
                                            }}
                                        >
                                            <Play size={14} />
                                            Sound
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {exercise.type === 'sight-words' && (
                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Read These Words:</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {exercise.words.map(word => (
                                    <div key={word} style={{
                                        background: '#F7FAFC',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '12px',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: '#2D3748',
                                        border: '1px solid #E2E8F0',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => speak(word)}
                                    >
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <button
                            onClick={handleComplete}
                            style={{
                                background: '#38A169',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '0.75rem 2rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Mark as Complete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LearnReading;