import React, { useState } from 'react';
import { Target, Zap, Trophy } from 'lucide-react';
import { MATH_EXERCISES } from '../../../constants/math';

const MathGames = () => {
    const [currentGame, setCurrentGame] = useState(0);
    const [gameState, setGameState] = useState({});
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(new Set());

    const games = MATH_EXERCISES;

    const handleGameComplete = (gameId, gameScore) => {
        setCompleted(prev => new Set([...prev, gameId]));
        setScore(prev => prev + gameScore);
        if (currentGame < games.length - 1) {
            setCurrentGame(currentGame + 1);
        }
    };

    const resetGames = () => {
        setCurrentGame(0);
        setGameState({});
        setScore(0);
        setCompleted(new Set());
    };

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748' }}>
                    Math Games
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38A169' }}>
                    <Trophy size={20} />
                    <span style={{ fontWeight: '600' }}>Score: {score}</span>
                </div>
            </div>

            {/* Game Selection */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {games.map((game, index) => (
                    <button
                        key={game.id}
                        onClick={() => setCurrentGame(index)}
                        style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: currentGame === index ? '#38A169' : completed.has(game.id) ? '#C6F6D5' : '#EDF2F7',
                            color: currentGame === index || completed.has(game.id) ? 'white' : '#4A5568',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}
                    >
                        {completed.has(game.id) && <Trophy size={16} />}
                        {game.title}
                    </button>
                ))}
            </div>

            {/* Current Game */}
            {games[currentGame] && (
                <div>
                    {games[currentGame].type === 'number-line' && (
                        <NumberLineGame
                            game={games[currentGame]}
                            onComplete={(gameScore) => handleGameComplete(games[currentGame].id, gameScore)}
                        />
                    )}
                    {games[currentGame].type === 'pattern' && (
                        <PatternGame
                            game={games[currentGame]}
                            onComplete={(gameScore) => handleGameComplete(games[currentGame].id, gameScore)}
                        />
                    )}
                </div>
            )}

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                    onClick={resetGames}
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
                    <Zap size={16} />
                    Play Again
                </button>
            </div>
        </div>
    );
};

// Number Line Game Component
const NumberLineGame = ({ game, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [position, setPosition] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [gameScore, setGameScore] = useState(0);

    const numbers = game.problems;
    const target = numbers.reduce((sum, num) => sum + num, 0);

    const handleSubmit = () => {
        const answer = parseInt(input);
        if (answer === numbers[currentStep]) {
            setPosition(prev => prev + answer);
            setGameScore(prev => prev + 10);
            setFeedback('Correct! 🎉');
            setInput('');

            if (currentStep < numbers.length - 1) {
                setTimeout(() => {
                    setCurrentStep(prev => prev + 1);
                    setFeedback('');
                }, 1500);
            } else {
                setTimeout(() => {
                    onComplete(gameScore + 10);
                }, 1500);
            }
        } else {
            setFeedback('Try again! 💪');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2D3748', marginBottom: '1rem' }}>
                {game.title}
            </h3>
            <p style={{ color: '#718096', marginBottom: '1.5rem' }}>{game.description}</p>

            <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Add these numbers step by step: {numbers.join(' + ')} = ?
                </p>
                <p style={{ color: '#38A169', fontWeight: '600' }}>
                    Target: {target}
                </p>
            </div>

            {/* Number Line */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    position: 'relative',
                    height: '60px',
                    background: '#EDF2F7',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 2rem'
                }}>
                    {/* Markers */}
                    {Array.from({ length: target + 1 }, (_, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: `${(i / target) * 100}%`,
                                width: '2px',
                                height: '20px',
                                background: '#4A5568',
                                transform: 'translateX(-50%)'
                            }}
                        >
                            <span style={{
                                position: 'absolute',
                                top: '25px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#4A5568'
                            }}>
                                {i}
                            </span>
                        </div>
                    ))}

                    {/* Player */}
                    <div style={{
                        position: 'absolute',
                        left: `${(position / target) * 100}%`,
                        transform: 'translateX(-50%)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#38A169',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        transition: 'left 0.5s ease'
                    }}>
                        {position}
                    </div>
                </div>
            </div>

            {/* Input */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                    Step {currentStep + 1}: Add {numbers[currentStep]}
                </span>
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    style={{
                        padding: '0.5rem',
                        border: '2px solid #E2E8F0',
                        borderRadius: '8px',
                        fontSize: '1.2rem',
                        width: '80px',
                        textAlign: 'center'
                    }}
                />
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '8px',
                        background: '#38A169',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Jump!
                </button>
            </div>

            {feedback && (
                <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: feedback.includes('Correct') ? '#C6F6D5' : '#FED7D7',
                    color: feedback.includes('Correct') ? '#22543D' : '#742A2A',
                    fontWeight: '600'
                }}>
                    {feedback}
                </div>
            )}
        </div>
    );
};

// Pattern Game Component
const PatternGame = ({ game, onComplete }) => {
    const [currentSequence, setCurrentSequence] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [gameScore, setGameScore] = useState(0);

    const sequences = game.sequences;
    const sequence = sequences[currentSequence];

    const handleSubmit = () => {
        const answer = parseInt(input);
        if (answer === sequence.answer) {
            setGameScore(prev => prev + 15);
            setFeedback('Correct! 🎉');
            setInput('');

            if (currentSequence < sequences.length - 1) {
                setTimeout(() => {
                    setCurrentSequence(prev => prev + 1);
                    setFeedback('');
                }, 1500);
            } else {
                setTimeout(() => {
                    onComplete(gameScore + 15);
                }, 1500);
            }
        } else {
            setFeedback('Try again! 💪');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2D3748', marginBottom: '1rem' }}>
                {game.title}
            </h3>
            <p style={{ color: '#718096', marginBottom: '1.5rem' }}>{game.description}</p>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#2D3748',
                    marginBottom: '1rem',
                    letterSpacing: '0.5rem'
                }}>
                    {sequence.pattern.map((num, index) => (
                        <span key={index} style={{
                            display: 'inline-block',
                            width: '60px',
                            textAlign: 'center',
                            border: index === sequence.pattern.length - 1 ? '2px dashed #38A169' : 'none',
                            borderRadius: '8px',
                            padding: '0.5rem'
                        }}>
                            {num}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        What comes next?
                    </span>
                    <input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{
                            padding: '0.5rem',
                            border: '2px solid #E2E8F0',
                            borderRadius: '8px',
                            fontSize: '1.2rem',
                            width: '80px',
                            textAlign: 'center'
                        }}
                    />
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: '#38A169',
                            color: 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Check
                    </button>
                </div>
            </div>

            {feedback && (
                <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: feedback.includes('Correct') ? '#C6F6D5' : '#FED7D7',
                    color: feedback.includes('Correct') ? '#22543D' : '#742A2A',
                    fontWeight: '600'
                }}>
                    {feedback}
                </div>
            )}
        </div>
    );
};

export default MathGames;