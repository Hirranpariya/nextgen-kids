import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Sword, CheckCircle, AlertCircle, Trophy, RotateCcw, Zap, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WordForge = ({ onComplete, onUnlockNext }) => {
    const [letters, setLetters] = useState([
        { letter: 'A', points: 1, count: 3 },
        { letter: 'E', points: 1, count: 4 },
        { letter: 'I', points: 1, count: 2 },
        { letter: 'O', points: 1, count: 3 },
        { letter: 'N', points: 2, count: 2 },
        { letter: 'R', points: 2, count: 2 },
        { letter: 'T', points: 2, count: 2 }
    ]);
    const [currentWord, setCurrentWord] = useState('');
    const [targetWords] = useState(['TRAIN', 'RAIN', 'TIRE', 'RENT', 'RATE', 'TEAR']);
    const [foundWords, setFoundWords] = useState([]);
    const [score, setScore] = useState(0);
    const [targetScore] = useState(100);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);

    const addLetter = (index) => {
        if (letters[index].count > 0) {
            setCurrentWord(prev => prev + letters[index].letter);
            setLetters(prev => prev.map((letter, i) => 
                i === index ? { ...letter, count: letter.count - 1 } : letter
            ));
            setSelectedLetters(prev => [...prev, index]);
        }
    };

    const removeLetter = () => {
        if (currentWord.length > 0 && selectedLetters.length > 0) {
            const lastLetterIndex = selectedLetters[selectedLetters.length - 1];
            setCurrentWord(prev => prev.slice(0, -1));
            setLetters(prev => prev.map((letter, i) => 
                i === lastLetterIndex ? { ...letter, count: letter.count + 1 } : letter
            ));
            setSelectedLetters(prev => prev.slice(0, -1));
        }
    };

    const submitWord = () => {
        if (currentWord.length < 3) return;

        const isValidWord = targetWords.includes(currentWord.toUpperCase());
        const wordScore = currentWord.split('').reduce((sum, letter) => {
            const letterData = letters.find(l => l.letter === letter.toUpperCase());
            return sum + (letterData ? letterData.points : 0);
        }, 0);

        if (isValidWord && !foundWords.includes(currentWord.toUpperCase())) {
            setFoundWords(prev => [...prev, currentWord.toUpperCase()]);
            setScore(prev => prev + wordScore);
            
            // Add to history
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                word: currentWord.toUpperCase(),
                score: wordScore,
                total: score + wordScore
            }]);
            setAttempts(prev => prev + 1);
        }

        // Reset current word
        setCurrentWord('');
        setSelectedLetters([]);
        
        // Check success condition
        if (score + wordScore >= targetScore) {
            setShowSuccess(true);
            setTimeout(() => {
                onComplete?.();
                onUnlockNext?.('logic-bridge');
            }, 2000);
        }
    };

    const resetGame = () => {
        setLetters([
            { letter: 'A', points: 1, count: 3 },
            { letter: 'E', points: 1, count: 4 },
            { letter: 'I', points: 1, count: 2 },
            { letter: 'O', points: 1, count: 3 },
            { letter: 'N', points: 2, count: 2 },
            { letter: 'R', points: 2, count: 2 },
            { letter: 'T', points: 2, count: 2 }
        ]);
        setCurrentWord('');
        setFoundWords([]);
        setScore(0);
        setShowSuccess(false);
        setSelectedLetters([]);
    };

    const getLetterColor = (letter) => {
        const letterData = letters.find(l => l.letter === letter);
        return letterData ? `hsl(${letterData.points * 60}, 70%, 50%)` : '#4A5568';
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                                color: '#f093fb',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Words Forged!
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
                                +75 Explorer Points • Logic Bridge Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Type size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Word Forge
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Forge words from letters to reach {targetScore} points
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Letter Inventory */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sword size={18} color="#FCD34D" />
                        Letter Inventory
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                        {letters.map((letter, index) => (
                            <motion.button
                                key={letter.letter}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addLetter(index)}
                                disabled={letter.count === 0}
                                style={{
                                    padding: '1rem',
                                    background: letter.count > 0 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                    border: `2px solid ${getLetterColor(letter.letter)}`,
                                    borderRadius: '12px',
                                    cursor: letter.count > 0 ? 'pointer' : 'not-allowed',
                                    textAlign: 'center',
                                    opacity: letter.count > 0 ? 1 : 0.5
                                }}
                            >
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                    {letter.letter}
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                    {letter.count} left
                                </div>
                                <div style={{ 
                                    fontSize: '0.7rem', 
                                    color: getLetterColor(letter.letter),
                                    fontWeight: '600'
                                }}>
                                    {letter.points}pts
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Center: Word Building */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Forge Your Word
                    </h3>
                    
                    <div style={{
                        width: '100%',
                        minHeight: '120px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '0.25rem', marginBottom: '1rem' }}>
                            {currentWord || '_'.repeat(6)}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button
                                onClick={removeLetter}
                                disabled={currentWord.length === 0}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: 'white',
                                    cursor: currentWord.length > 0 ? 'pointer' : 'not-allowed'
                                }}
                            >
                                ← Back
                            </button>
                            
                            <button
                                onClick={submitWord}
                                disabled={currentWord.length < 3}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: currentWord.length >= 3 ? '#10B981' : '#4A5568',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: 'white',
                                    cursor: currentWord.length >= 3 ? 'pointer' : 'not-allowed',
                                    fontWeight: 'bold'
                                }}
                            >
                                Submit Word
                            </button>
                        </div>
                    </div>

                    {/* Target Words */}
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px'
                    }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Target Words:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {targetWords.map((word, index) => (
                                <div
                                    key={word}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        background: foundWords.includes(word) ? '#10B981' : 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        textDecoration: foundWords.includes(word) ? 'line-through' : 'none'
                                    }}
                                >
                                    {word}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Score & Progress */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Score Progress
                    </h3>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FCD34D' }}>
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
                        
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center' }}>
                            {Math.round((score / targetScore) * 100)}% Complete
                        </div>
                    </div>

                    {/* Found Words */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Found Words:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {foundWords.length > 0 ? (
                                foundWords.map((word, index) => (
                                    <div key={index} style={{
                                        padding: '0.5rem',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>{word}</span>
                                        <span style={{ color: '#FCD34D', fontWeight: 'bold' }}>
                                            +{word.split('').reduce((sum, letter) => {
                                                const letterData = letters.find(l => l.letter === letter);
                                                return sum + (letterData ? letterData.points : 0);
                                            }, 0)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center' }}>
                                    No words forged yet
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {score >= targetScore ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Target reached!
                                </span>
                            </>
                        ) : (
                            <>
                                <Target size={20} color="#F59E0B" />
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
                        <RotateCcw size={16} /> Reset Forge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WordForge;
