import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Triangle, CheckCircle, AlertCircle, Trophy, RotateCcw, Clock, Zap, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NumberPyramid = ({ onComplete, onUnlockNext }) => {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [score, setScore] = useState(0);
    const [targetScore] = useState(100);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [speedBonus, setSpeedBonus] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showNumericPad, setShowNumericPad] = useState(false);

    const puzzles = [
        {
            pyramid: [
                [null],
                [5, 8],
                [2, 3, 5]
            ],
            solution: 13,
            rule: "Each block is the sum of the two blocks below it",
            hint: "Add the numbers in the row below"
        },
        {
            pyramid: [
                [null],
                [7, 12],
                [3, 4, 8]
            ],
            solution: 19,
            rule: "Each block is the sum of the two blocks below it",
            hint: "3 + 4 = 7, 4 + 8 = 12"
        },
        {
            pyramid: [
                [null],
                [11, 16],
                [5, 6, 10]
            ],
            solution: 27,
            rule: "Each block is the sum of the two blocks below it",
            hint: "5 + 6 = 11, 6 + 10 = 16"
        },
        {
            pyramid: [
                [null],
                [9, 14],
                [4, 5, 9]
            ],
            solution: 23,
            rule: "Each block is the sum of the two blocks below it",
            hint: "4 + 5 = 9, 5 + 9 = 14"
        },
        {
            pyramid: [
                [null],
                [15, 20],
                [7, 8, 12]
            ],
            solution: 35,
            rule: "Each block is the sum of the two blocks below it",
            hint: "7 + 8 = 15, 8 + 12 = 20"
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

    const handleNumericPadClick = (number) => {
        if (!isTimerRunning && timeElapsed === 0) {
            startPuzzle();
        }
        setUserAnswer(prev => prev + number);
    };

    const handleNumericPadClear = () => {
        setUserAnswer('');
    };

    const handleNumericPadDelete = () => {
        setUserAnswer(prev => prev.slice(0, -1));
    };

    const checkSolution = () => {
        const answer = parseInt(userAnswer);
        if (answer === currentPuzzle.solution) {
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
            setShowNumericPad(false);
            
            if (currentPuzzleIndex < puzzles.length - 1) {
                setTimeout(() => {
                    setCurrentPuzzleIndex(prev => prev + 1);
                    setUserAnswer('');
                    setShowSuccess(false);
                    setTimeElapsed(0);
                    setSpeedBonus(false);
                    setShowHint(false);
                }, 2000);
            } else if (score + points >= targetScore) {
                setTimeout(() => {
                    onComplete?.();
                    onUnlockNext?.('pattern-master');
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
        setUserAnswer('');
        setTimeElapsed(0);
        setIsTimerRunning(false);
        setSpeedBonus(false);
        setShowHint(false);
        setShowNumericPad(false);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                                color: '#f59e0b',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Pyramid Unlocked!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect calculation: {score + (speedBonus ? 25 : 20)} points
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
                                +100 Explorer Points • Pattern Master Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Numeric Pad Modal */}
            <AnimatePresence>
                {showNumericPad && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 200
                        }}
                        onClick={() => setShowNumericPad(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            style={{
                                background: 'white',
                                borderRadius: '20px',
                                padding: '2rem',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                                    Enter Your Answer
                                </div>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                    padding: '1rem',
                                    background: '#f3f4f6',
                                    borderRadius: '12px',
                                    minWidth: '150px',
                                    textAlign: 'center'
                                }}>
                                    {userAnswer || '_'}
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                                {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(num => (
                                    <motion.button
                                        key={num}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNumericPadClick(num)}
                                        style={{
                                            padding: '1rem',
                                            background: num === 0 ? '#ef4444' : '#3b82f6',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {num}
                                    </motion.button>
                                ))}
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNumericPadClear}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: '#6b7280',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Clear
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNumericPadDelete}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: '#6b7280',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Triangle size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Number Pyramid
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Find the missing capstone of the Ancient Pyramid
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
                
                {/* Left: Pyramid */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Ancient Pyramid
                    </h3>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center'
                    }}>
                        {/* Render Pyramid */}
                        {currentPuzzle.pyramid.map((row, rowIndex) => (
                            <div key={rowIndex} style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: '1rem', 
                                marginBottom: '1rem' 
                            }}>
                                {row.map((value, colIndex) => (
                                    <motion.div
                                        key={`${rowIndex}-${colIndex}`}
                                        whileHover={value === null ? { scale: 1.05 } : {}}
                                        onClick={() => value === null && setShowNumericPad(true)}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            background: value === null ? 
                                                (showSuccess ? 'rgba(16, 185, 129, 0.3)' : 'rgba(252, 211, 77, 0.3)') : 
                                                'rgba(255, 255, 255, 0.2)',
                                            border: value === null ? 
                                                (showSuccess ? '2px solid #10B981' : '2px solid #FCD34D') : 
                                                '2px solid rgba(255, 255, 255, 0.3)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            cursor: value === null ? 'pointer' : 'default',
                                            position: 'relative',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {value === null ? (
                                            showSuccess ? (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ type: 'spring', damping: 10 }}
                                                    style={{
                                                        color: '#10B981',
                                                        fontSize: '1.5rem'
                                                    }}
                                                >
                                                    {currentPuzzle.solution}
                                                </motion.div>
                                            ) : (
                                                <span style={{ color: '#FCD34D' }}>?</span>
                                            )
                                        ) : (
                                            <span style={{ color: 'white' }}>{value}</span>
                                        )}
                                        
                                        {showSuccess && value === null && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.6, repeat: 2 }}
                                                style={{
                                                    position: 'absolute',
                                                    inset: '-4px',
                                                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                                    borderRadius: '16px',
                                                    zIndex: -1
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                        
                        <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                            Click the "?" to enter your answer
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            onClick={() => setShowHint(!showHint)}
                            style={{
                                padding: '0.75rem 1rem',
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
                                padding: '0.75rem 1rem',
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

                {/* Right: Progress and Stats */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Calculation Progress
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
                                        Pyramid Master!
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
                    
                    {/* Rule Display */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calculator size={18} color="#FCD34D" />
                            Pyramid Rule:
                        </div>
                        <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                            {currentPuzzle.rule}
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
                            🔢 Pyramid Master
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            Complete all pyramids to earn
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumberPyramid;
