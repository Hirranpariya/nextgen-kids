import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, CheckCircle, AlertCircle, Trophy, RotateCcw, Clock, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PatternCode = ({ onComplete, onUnlockNext }) => {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [score, setScore] = useState(0);
    const [targetScore] = useState(100);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [speedBonus, setSpeedBonus] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const puzzles = [
        {
            example: { input: 'APPLE', output: 'EPPLE' },
            challenge: 'ORANGE',
            solution: 'ORNGEE',
            rule: 'Only vowels are shifted +1 in alphabet',
            hint: 'Look at the vowels carefully'
        },
        {
            example: { input: 'HOUSE', output: 'HPUSF' },
            challenge: 'GARDEN',
            solution: 'GRBDEN',
            rule: 'Consonants shift +1, vowels stay same',
            hint: 'Check consonants vs vowels'
        },
        {
            example: { input: 'CHAIR', output: 'HCAIR' },
            challenge: 'TABLE',
            solution: 'ATBLE',
            rule: 'First two letters swap positions',
            hint: 'Look at the beginning of the word'
        },
        {
            example: { input: 'PHONE', output: 'EHPON' },
            challenge: 'LAPTOP',
            solution: 'ALPTOP',
            rule: 'Vowels move to front, consonants to back',
            hint: 'Separate vowels and consonants'
        },
        {
            example: { input: 'WATER', output: 'WTAER' },
            challenge: 'MARKET',
            solution: 'MRAKET',
            rule: 'Last two vowels swap with consonants before them',
            hint: 'Focus on vowel positions'
        }
    ];

    const getCurrentPuzzle = () => {
        return puzzles[currentPuzzleIndex];
    };

    const currentPuzzle = getCurrentPuzzle();

    useEffect(() => {
        let interval;
        if (isTimerRunning && !showSuccess) {
            interval = setInterval(() => {
                setTimeElapsed(prev => {
                    const newTime = prev + 1;
                    if (newTime === 30) {
                        setIsTimerRunning(false);
                        setSpeedBonus(false);
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, showSuccess]);

    const startPuzzle = () => {
        setIsTimerRunning(true);
        setTimeElapsed(0);
        setSpeedBonus(true);
    };

    const handleLetterClick = (index) => {
        if (!isTimerRunning && timeElapsed === 0) {
            startPuzzle();
        }

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const currentInput = userInput.split('');
        currentInput[index] = alphabet[(alphabet.indexOf(currentInput[index]) + 1) % 26];
        setUserInput(currentInput.join(''));
    };

    const checkSolution = () => {
        if (userInput === currentPuzzle.solution) {
            const points = speedBonus ? 25 : 20;
            setScore(prev => prev + points);
            
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                puzzle: currentPuzzleIndex + 1,
                correct: true,
                time: timeElapsed,
                points: points,
                speedBonus: speedBonus
            }]);
            setAttempts(prev => prev + 1);
            
            setShowSuccess(true);
            setIsTimerRunning(false);
            
            if (currentPuzzleIndex < puzzles.length - 1) {
                setTimeout(() => {
                    setCurrentPuzzleIndex(prev => prev + 1);
                    setUserInput('');
                    setShowSuccess(false);
                    setTimeElapsed(0);
                    setSpeedBonus(false);
                    setShowHint(false);
                }, 2000);
            } else if (score + points >= targetScore) {
                setTimeout(() => {
                    onComplete?.();
                    onUnlockNext?.('direction-detective');
                }, 2000);
            }
        } else {
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                puzzle: currentPuzzleIndex + 1,
                correct: false,
                time: timeElapsed,
                points: 0,
                speedBonus: false
            }]);
            setAttempts(prev => prev + 1);
        }
    };

    const resetPuzzle = () => {
        setUserInput('');
        setTimeElapsed(0);
        setIsTimerRunning(false);
        setSpeedBonus(false);
        setShowHint(false);
    };

    useEffect(() => {
        setUserInput(currentPuzzle.challenge.split('').map(() => '').join(''));
    }, [currentPuzzleIndex]);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 100,
                            borderRadius: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10 }}
                            style={{
                                textAlign: 'center',
                                background: 'white',
                                color: '#ef4444',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Code Cracked!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect decoding: {score + (speedBonus ? 25 : 20)} points
                                {speedBonus && <span style={{ color: '#10B981', fontWeight: 'bold' }}> + Speed Bonus!</span>}
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +100 Explorer Points • Direction Detective Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Code size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Pattern Code
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Decode the enemy's scrambled transmission
                        </p>
                    </div>
                </div>
                
                {/* Timer and Speed Bonus */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} color="#FCD34D" />
                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            {timeElapsed}s
                        </span>
                    </div>
                    {speedBonus && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'rgba(16, 185, 129, 0.2)',
                                border: '2px solid #10B981',
                                borderRadius: '20px'
                            }}
                        >
                            <Zap size={16} color="#10B981" />
                            <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                Speed Bonus Active
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                
                {/* Left: Decoder Machine */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Decoder Machine
                    </h3>
                    
                    {/* Example */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.7 }}>
                            Example:
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {currentPuzzle.example.input}
                            </span>
                            <span style={{ fontSize: '1.5rem' }}>→</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10B981' }}>
                                {currentPuzzle.example.output}
                            </span>
                        </div>
                    </div>
                    
                    {/* Challenge */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.7 }}>
                            Decode this word:
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {currentPuzzle.challenge}
                            </span>
                            <span style={{ fontSize: '1.5rem' }}>→</span>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                {userInput.split('').map((letter, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleLetterClick(index)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: letter === currentPuzzle.solution[index] ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                                            border: `2px solid ${letter === currentPuzzle.solution[index] ? '#10B981' : 'rgba(255, 255, 255, 0.3)'}`,
                                            borderRadius: '8px',
                                            color: letter === currentPuzzle.solution[index] ? '#10B981' : 'white',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {letter || '_'}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={checkSolution}
                                disabled={userInput.includes('_')}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: userInput === currentPuzzle.solution ? '#10B981' : '#4A5568',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: userInput === currentPuzzle.solution ? 'pointer' : 'not-allowed',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Decode
                            </button>
                            
                            <button
                                onClick={() => setShowHint(!showHint)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {showHint ? 'Hide Hint' : 'Show Hint'}
                            </button>
                            
                            <button
                                onClick={resetPuzzle}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <RotateCcw size={16} /> Reset
                            </button>
                        </div>
                        
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(252, 211, 77, 0.2)',
                                    border: '2px solid #FCD34D',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                💡 Hint: {currentPuzzle.hint}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right: Progress and Stats */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Mission Progress
                    </h3>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>
                                {score}
                            </div>
                            <div style={{ fontSize: '1rem', opacity: 0.7 }}>
                                / {targetScore} points
                            </div>
                        </div>
                        
                        <div style={{
                            height: '8px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginBottom: '1rem'
                        }}>
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: '#10B981',
                                    borderRadius: '4px'
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min(100, (score / targetScore) * 100)}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            {score >= targetScore ? (
                                <>
                                    <CheckCircle size={20} color="#10B981" />
                                    <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                        All codes cracked!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle size={20} color="#F59E0B" />
                                    <span style={{ opacity: 0.8 }}>
                                        {targetScore - score} points to go
                                    </span>
                                </>
                            )}
                        </div>
                        
                        <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7, textAlign: 'center' }}>
                            Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
                        </div>
                    </div>
                    
                    {/* Badge Display */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            🏆 Codebreaker Badge
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            Complete all pattern codes to earn
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatternCode;
