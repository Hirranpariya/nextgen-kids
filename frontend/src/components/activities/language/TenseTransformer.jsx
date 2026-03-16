import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, RotateCcw, CheckCircle, AlertCircle, Trophy, History } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TenseTransformer = ({ onComplete, onUnlockNext }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [fixedCards, setFixedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [targetScore] = useState(100);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [isFlipping, setIsFlipping] = useState(false);

    const historyFacts = [
        {
            broken: "Ashoka the Great build many roads.",
            correct: "built",
            tense: "past",
            image: "🛣️",
            description: "Ashoka built roads across his empire"
        },
        {
            broken: "Mahatma Gandhi fight for India's freedom.",
            correct: "fought",
            tense: "past",
            image: "🇮🇳",
            description: "Gandhi fought for India's independence"
        },
        {
            broken: "The Indus Valley people have advanced cities.",
            correct: "had",
            tense: "past",
            image: "🏛️",
            description: "Indus Valley had advanced urban planning"
        },
        {
            broken: "Tipu Sultan use rockets in warfare.",
            correct: "used",
            tense: "past",
            image: "🚀",
            description: "Tipu Sultan used rockets against British"
        },
        {
            broken: "Rani Lakshmibai lead the army in 1857.",
            correct: "led",
            tense: "past",
            image: "⚔️",
            description: "Rani Lakshmibai led forces in the revolt"
        }
    ];

    const tenseOptions = {
        past: ["build", "built", "will build"],
        present: ["builds", "build", "will build"],
        future: ["will build", "build", "built"]
    };

    const getCurrentCard = () => {
        return historyFacts[currentCardIndex];
    };

    const extractVerb = (sentence) => {
        const words = sentence.split(' ');
        // Find the verb (usually the 2nd or 3rd word)
        for (let i = 1; i < words.length; i++) {
            if (words[i].endsWith('e') || words[i].endsWith('s') || words[i].endsWith('d') || words[i].endsWith('t')) {
                return words[i];
            }
        }
        return words[1]; // fallback
    };

    const selectTense = (selectedVerb) => {
        if (isFlipping) return;
        
        const currentCard = getCurrentCard();
        const isCorrect = selectedVerb === currentCard.correct;
        
        setIsFlipping(true);
        
        setTimeout(() => {
            if (isCorrect) {
                setFixedCards(prev => [...prev, currentCardIndex]);
                setScore(prev => prev + 20);
                
                setHistory(prev => [...prev.slice(-9), {
                    attempt: attempts + 1,
                    cardIndex: currentCardIndex + 1,
                    correct: true,
                    verb: selectedVerb,
                    points: 20,
                    total: score + 20
                }]);
                setAttempts(prev => prev + 1);
                
                if (currentCardIndex < historyFacts.length - 1) {
                    setCurrentCardIndex(prev => prev + 1);
                } else if (score + 20 >= targetScore) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        onComplete?.();
                        onUnlockNext?.('word-root-tree');
                    }, 2000);
                }
            } else {
                setHistory(prev => [...prev.slice(-9), {
                    attempt: attempts + 1,
                    cardIndex: currentCardIndex + 1,
                    correct: false,
                    verb: selectedVerb,
                    points: 0,
                    total: score
                }]);
                setAttempts(prev => prev + 1);
            }
            setIsFlipping(false);
        }, 600);
    };

    const resetGame = () => {
        setCurrentCardIndex(0);
        setFixedCards([]);
        setScore(0);
        setShowSuccess(false);
        setIsFlipping(false);
    };

    const currentCard = getCurrentCard();
    const currentVerb = extractVerb(currentCard.broken);
    const options = tenseOptions[currentCard.tense];

    return (
        <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
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
                                color: '#8b5cf6',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                History Fixed!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect tense mastery: {score} points
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +100 Explorer Points • Word Root Tree Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <History size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Tense Transformer
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Fix the History Robot's tense mistakes
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                
                {/* Left: History Cards */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={18} color="#FCD34D" />
                        History Cards {currentCardIndex + 1}/{historyFacts.length}
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {historyFacts.map((card, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: index === currentCardIndex ? 1.02 : 1 }}
                                style={{
                                    background: fixedCards.includes(index) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                    border: `2px solid ${fixedCards.includes(index) ? '#10B981' : 'rgba(255, 255, 255, 0.3)'}`,
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    position: 'relative',
                                    minHeight: '120px',
                                    cursor: index === currentCardIndex ? 'pointer' : 'default'
                                }}
                                onClick={() => index === currentCardIndex && !isFlipping && null}
                            >
                                <motion.div
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        height: '100%'
                                    }}
                                    animate={{
                                        rotateY: isFlipping && index === currentCardIndex ? 180 : 0
                                    }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {/* Front of card */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        {index === currentCardIndex ? (
                                            <div>
                                                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                                    <span style={{ color: '#FCD34D', fontWeight: 'bold' }}>
                                                        {currentVerb}
                                                    </span>
                                                    {card.broken.replace(currentVerb, '')}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.7, fontStyle: 'italic' }}>
                                                    Click the correct tense below
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                                    {fixedCards.includes(index) ? (
                                                        <span style={{ color: '#10B981' }}>
                                                            ✓ {card.broken.replace(extractVerb(card.broken), card.correct)}
                                                        </span>
                                                    ) : (
                                                        <span style={{ opacity: 0.6 }}>
                                                            Card {index + 1}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Back of card */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                                            {card.image}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                            {card.description}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Tense Options & Score */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Choose the Correct Tense
                    </h3>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
                            Fix the verb: <span style={{ color: '#FCD34D', fontWeight: 'bold' }}>{currentVerb}</span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => selectTense(option)}
                                    disabled={isFlipping}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        cursor: isFlipping ? 'not-allowed' : 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        textAlign: 'center'
                                    }}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Score Progress */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FCD34D' }}>
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
                                        All history fixed!
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
                        
                        <button
                            onClick={resetGame}
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
                            <RotateCcw size={16} /> Reset History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenseTransformer;
