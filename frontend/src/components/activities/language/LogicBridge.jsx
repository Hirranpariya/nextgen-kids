import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Puzzle, CheckCircle, AlertCircle, Trophy, RotateCcw, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LogicBridge = ({ onComplete, onUnlockNext }) => {
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [score, setScore] = useState(0);
    const [targetScore] = useState(100);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [showHint, setShowHint] = useState(false);

    const puzzles = [
        {
            question: "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
            answer: "3",
            hint: "Think about the rate - cats per minute"
        },
        {
            question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
            answer: "42",
            hint: "Look at the differences between numbers"
        },
        {
            question: "If all roses are flowers and some flowers fade quickly, can we say all roses fade quickly?",
            answer: "no",
            hint: "Consider logical validity"
        },
        {
            question: "A man has 5 apples. He gives away 3, eats 1, and finds 2 more. How many apples does he have?",
            answer: "3",
            hint: "Calculate: 5 - 3 - 1 + 2"
        }
    ];

    const updateAnswer = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const checkAnswer = () => {
        const correct = answers[currentPuzzle].toLowerCase().trim() === puzzles[currentPuzzle].answer.toLowerCase();
        
        if (correct) {
            const points = 25;
            setScore(prev => prev + points);
            
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                puzzle: currentPuzzle + 1,
                correct: true,
                points: points,
                total: score + points
            }]);
            setAttempts(prev => prev + 1);
            
            if (currentPuzzle < puzzles.length - 1) {
                setCurrentPuzzle(prev => prev + 1);
                setShowHint(false);
            } else if (score + points >= targetScore) {
                setShowSuccess(true);
                setTimeout(() => {
                    onComplete?.();
                    onUnlockNext?.('pattern-master');
                }, 2000);
            }
        } else {
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                puzzle: currentPuzzle + 1,
                correct: false,
                points: 0,
                total: score
            }]);
            setAttempts(prev => prev + 1);
        }
    };

    const resetPuzzle = () => {
        setCurrentPuzzle(0);
        setAnswers(['', '', '', '']);
        setScore(0);
        setShowSuccess(false);
        setShowHint(false);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            position: 'relative'
        }}>
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
                                color: '#667eea',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Logic Master!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect score: {score} points
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +150 Explorer Points • Pattern Master Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Brain size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Logic Bridge
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Solve logic puzzles to reach {targetScore} points
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Puzzle {currentPuzzle + 1} of {puzzles.length}
                    </h3>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1rem'
                    }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                            {puzzles[currentPuzzle].question}
                        </p>
                        
                        <input
                            type="text"
                            value={answers[currentPuzzle]}
                            onChange={(e) => updateAnswer(currentPuzzle, e.target.value)}
                            placeholder="Your answer..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button
                                onClick={checkAnswer}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: '#10B981',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Submit Answer
                            </button>
                            <button
                                onClick={() => setShowHint(!showHint)}
                                style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <Lightbulb size={16} />
                            </button>
                        </div>
                        
                        {showHint && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                background: 'rgba(252, 211, 77, 0.2)',
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                            }}>
                                💡 Hint: {puzzles[currentPuzzle].hint}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Score Progress
                    </h3>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        textAlign: 'center',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FCD34D' }}>
                            {score}
                        </div>
                        <div style={{ fontSize: '1rem', opacity: 0.7 }}>
                            / {targetScore} points
                        </div>
                    </div>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        height: '200px'
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="attempt" stroke="rgba(255,255,255,0.5)" />
                                <YAxis stroke="rgba(255,255,255,0.5)" />
                                <Tooltip contentStyle={{ background: 'rgba(102, 126, 234, 0.9)' }} />
                                <Line type="monotone" dataKey="total" stroke="#FCD34D" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Puzzle Status
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {puzzles.map((_, index) => (
                            <div key={index} style={{
                                padding: '0.75rem',
                                background: index < currentPuzzle ? 'rgba(16, 185, 129, 0.2)' : 
                                           index === currentPuzzle ? 'rgba(252, 211, 77, 0.2)' : 
                                           'rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: index < currentPuzzle ? '#10B981' : 
                                               index === currentPuzzle ? '#FCD34D' : '#4A5568',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>
                                    {index < currentPuzzle ? '✓' : index + 1}
                                </div>
                                <span style={{ fontSize: '0.9rem' }}>
                                    Puzzle {index + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                    
                    <button
                        onClick={resetPuzzle}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <RotateCcw size={16} /> Reset Puzzles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogicBridge;
