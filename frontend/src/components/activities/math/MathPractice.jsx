import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { MATH_PROBLEMS } from '../../../constants/math';

const MathPractice = () => {
    const [selectedTopic, setSelectedTopic] = useState('addition');
    const [currentProblem, setCurrentProblem] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(0);

    const topics = [
        { id: 'addition', label: 'Addition', icon: '+' },
        { id: 'multiplication', label: 'Multiplication', icon: '×' },
        { id: 'fractions', label: 'Fractions', icon: '½' },
        { id: 'geometry', label: 'Geometry', icon: '⬜' }
    ];

    const problems = MATH_PROBLEMS[selectedTopic];
    const problem = problems[currentProblem];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        setShowFeedback(true);

        const isCorrect = answer === problem.answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            setShowFeedback(false);
            setSelectedAnswer(null);
            if (currentProblem < problems.length - 1) {
                setCurrentProblem(prev => prev + 1);
            } else {
                setCompleted(prev => prev + 1);
                setCurrentProblem(0);
                setScore(0);
            }
        }, 2000);
    };

    const resetTopic = () => {
        setCurrentProblem(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
    };

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748', marginBottom: '1.5rem' }}>
                Math Practice
            </h2>

            {/* Topic Selection */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {topics.map(topic => (
                    <button
                        key={topic.id}
                        onClick={() => {
                            setSelectedTopic(topic.id);
                            resetTopic();
                        }}
                        style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: selectedTopic === topic.id ? '#38A169' : '#EDF2F7',
                            color: selectedTopic === topic.id ? 'white' : '#4A5568',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}
                    >
                        <span>{topic.icon}</span>
                        {topic.label}
                    </button>
                ))}
            </div>

            {/* Progress */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#2D3748' }}>
                        Problem {currentProblem + 1} of {problems.length}
                    </span>
                    <span style={{ color: '#718096' }}>
                        Score: {score}/{currentProblem + (selectedAnswer !== null ? 1 : 0)}
                    </span>
                </div>
                <div style={{
                    width: '100%',
                    height: '6px',
                    background: '#EDF2F7',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${((currentProblem + 1) / problems.length) * 100}%`,
                        height: '100%',
                        background: '#38A169',
                        borderRadius: '3px'
                    }} />
                </div>
            </div>

            {/* Problem */}
            {problem && (
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#2D3748',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        {problem.question}
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {problem.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={showFeedback}
                                style={{
                                    padding: '1rem',
                                    border: '2px solid #E2E8F0',
                                    borderRadius: '12px',
                                    background: selectedAnswer === option ? '#38A169' : 'white',
                                    color: selectedAnswer === option ? 'white' : '#2D3748',
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    cursor: showFeedback ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: showFeedback ? 0.6 : 1
                                }}
                            >
                                {option}{problem.unit || ''}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Feedback */}
            {showFeedback && (
                <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: selectedAnswer === problem.answer ? '#C6F6D5' : '#FED7D7',
                    color: selectedAnswer === problem.answer ? '#22543D' : '#742A2A',
                    fontWeight: '600',
                    marginBottom: '1rem'
                }}>
                    {selectedAnswer === problem.answer ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={24} />
                            Correct! Well done! 🎉
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <XCircle size={24} />
                            Try again! The correct answer is {problem.answer}{problem.unit || ''}
                        </div>
                    )}
                </div>
            )}

            {/* Reset Button */}
            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={resetTopic}
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '8px',
                        background: '#EDF2F7',
                        color: '#4A5568',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        margin: '0 auto'
                    }}
                >
                    <RotateCcw size={16} />
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default MathPractice;