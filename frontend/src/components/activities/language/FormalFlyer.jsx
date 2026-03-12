import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Edit3, CheckCircle, AlertCircle, Trophy, RotateCcw, Send } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FormalFlyer = ({ onComplete, onUnlockNext }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [respectMeter, setRespectMeter] = useState(0);
    const [selectedWords, setSelectedWords] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);

    const letterContent = {
        rough: [
            "Hey Principal Sir/Madam,",
            "I want to tell you that I need leave.",
            "My family is having a big function.",
            "I have to go from 5th to 7th March.",
            "Please give me permission.",
            "See ya,",
            "Rahul"
        ],
        formal: [
            "Respected Principal Sir/Madam,",
            "I would like to request a leave of absence.",
            "My family is organizing an important function.",
            "I request permission to be absent from 5th to 7th March.",
            "Kindly grant me leave for the mentioned dates.",
            "Yours obediently,",
            "Rahul"
        ]
    };

    const wordReplacements = [
        {
            rough: "Hey",
            formal: "Respected",
            options: ["Hello", "Dear", "Respected", "Hi"],
            correct: "Respected",
            points: 15
        },
        {
            rough: "I want to tell you that I need leave",
            formal: "I would like to request a leave of absence",
            options: ["I want to request", "I would like to request", "I need to ask for", "I wish to inform"],
            correct: "I would like to request",
            points: 20
        },
        {
            rough: "My family is having a big function",
            formal: "My family is organizing an important function",
            options: ["My family is having", "My family is organizing", "My family will conduct", "My family is arranging"],
            correct: "My family is organizing",
            points: 15
        },
        {
            rough: "I have to go from 5th to 7th March",
            formal: "I request permission to be absent from 5th to 7th March",
            options: ["I need to be absent", "I request permission to be absent", "I want to be away", "I wish to be absent"],
            correct: "I request permission to be absent",
            points: 20
        },
        {
            rough: "Please give me permission",
            formal: "Kindly grant me leave for the mentioned dates",
            options: ["Please give me leave", "Kindly grant me leave", "Please approve my leave", "Kindly accept my request"],
            correct: "Kindly grant me leave",
            points: 15
        },
        {
            rough: "See ya",
            formal: "Yours obediently",
            options: ["Thank you", "Regards", "Yours obediently", "Sincerely"],
            correct: "Yours obediently",
            points: 15
        }
    ];

    const handleWordClick = (index) => {
        setCurrentWordIndex(index);
    };

    const selectReplacement = (replacement) => {
        const currentReplacement = wordReplacements[currentWordIndex];
        
        if (replacement === currentReplacement.correct) {
            // Correct selection
            setSelectedWords(prev => [...prev, replacement]);
            setRespectMeter(prev => Math.min(100, prev + currentReplacement.points));
            
            // Add to history
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                wordIndex: currentWordIndex + 1,
                correct: true,
                points: currentReplacement.points,
                meter: respectMeter + currentReplacement.points
            }]);
            setAttempts(prev => prev + 1);
            
            // Move to next word or complete
            if (currentWordIndex < wordReplacements.length - 1) {
                setCurrentWordIndex(prev => prev + 1);
            } else {
                setShowSuccess(true);
                setTimeout(() => {
                    onComplete?.();
                    onUnlockNext?.('tense-transformer');
                }, 2000);
            }
        } else {
            // Wrong selection
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                wordIndex: currentWordIndex + 1,
                correct: false,
                points: 0,
                meter: respectMeter
            }]);
            setAttempts(prev => prev + 1);
        }
    };

    const resetLetter = () => {
        setCurrentWordIndex(0);
        setSelectedWords([]);
        setRespectMeter(0);
        setShowSuccess(false);
    };

    const getFormalText = (index) => {
        if (index < selectedWords.length) {
            return selectedWords[index];
        }
        if (index === currentWordIndex) {
            return wordReplacements[index].rough;
        }
        return letterContent.rough[index];
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
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
                                color: '#3b82f6',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Letter Approved!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect formal letter: {respectMeter}% respect
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +100 Explorer Points • Tense Transformer Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Mail size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Formal Flyer
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Write a polite formal letter to your Principal
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                
                {/* Left: Rough Draft */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Edit3 size={18} color="#FCD34D" />
                        Rough Draft
                    </h3>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        minHeight: '300px'
                    }}>
                        {letterContent.rough.map((line, index) => (
                            <div key={index} style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                {index === currentWordIndex ? (
                                    <motion.span
                                        style={{
                                            background: 'rgba(252, 211, 77, 0.3)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontWeight: '600'
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => handleWordClick(index)}
                                    >
                                        {wordReplacements[index].rough}
                                    </motion.span>
                                ) : index < selectedWords.length ? (
                                    <span style={{ color: '#10B981', fontWeight: '600' }}>
                                        {selectedWords[index]}
                                    </span>
                                ) : (
                                    <span style={{ opacity: 0.7 }}>
                                        {line}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Official Letter */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Official Letter
                    </h3>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        minHeight: '300px'
                    }}>
                        {letterContent.formal.map((line, index) => (
                            <div key={index} style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                {index < selectedWords.length ? (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ color: '#10B981', fontWeight: '600' }}
                                    >
                                        {selectedWords[index]}
                                    </motion.span>
                                ) : (
                                    <span style={{ opacity: 0.5 }}>
                                        {line}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Word Options */}
            {currentWordIndex < wordReplacements.length && (
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Choose the formal word for: "{wordReplacements[currentWordIndex].rough}"
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {wordReplacements[currentWordIndex].options.map((option, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => selectReplacement(option)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: '600'
                                }}
                            >
                                {option}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* Respect Meter */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '600' }}>Respect Meter</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: respectMeter >= 100 ? '#10B981' : '#FCD34D' }}>
                            {respectMeter}%
                        </span>
                    </div>
                    <div style={{
                        height: '12px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            style={{
                                height: '100%',
                                background: respectMeter >= 100 ? '#10B981' : '#FCD34D',
                                borderRadius: '6px'
                            }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${respectMeter}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {respectMeter >= 100 ? (
                        <>
                            <CheckCircle size={24} color="#10B981" />
                            <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                Letter Approved!
                            </span>
                        </>
                    ) : (
                        <>
                            <AlertCircle size={24} color="#F59E0B" />
                            <span style={{ opacity: 0.8 }}>
                                {100 - respectMeter}% more respect needed
                            </span>
                        </>
                    )}
                </div>
                
                <button
                    onClick={resetLetter}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <RotateCcw size={16} /> Reset Letter
                </button>
            </div>
        </div>
    );
};

export default FormalFlyer;
