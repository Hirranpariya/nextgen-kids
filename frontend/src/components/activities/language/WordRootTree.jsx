import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trees, CheckCircle, AlertCircle, Trophy, RotateCcw, Leaf, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WordRootTree = ({ onComplete, onUnlockNext }) => {
    const [currentRootIndex, setCurrentRootIndex] = useState(0);
    const [selectedPrefix, setSelectedPrefix] = useState(null);
    const [selectedSuffix, setSelectedSuffix] = useState(null);
    const [grownBranches, setGrownBranches] = useState([]);
    const [score, setScore] = useState(0);
    const [targetScore] = useState(100);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [isGrowing, setIsGrowing] = useState(false);

    const wordData = [
        {
            root: "HAPPY",
            correctPrefix: "UN",
            correctSuffix: "NESS",
            result: "UNHAPPINESS",
            meaning: "Not happy",
            points: 25
        },
        {
            root: "PLAY",
            correctPrefix: "RE",
            correctSuffix: "FUL",
            result: "REPLAYFUL",
            meaning: "Full of replaying",
            points: 20
        },
        {
            root: "KIND",
            correctPrefix: "",
            correctSuffix: "NESS",
            result: "KINDNESS",
            meaning: "Quality of being kind",
            points: 20
        },
        {
            root: "DO",
            correctPrefix: "RE",
            correctSuffix: "ABLE",
            result: "REDOABLE",
            meaning: "Can be done again",
            points: 25
        },
        {
            root: "CARE",
            correctPrefix: "UN",
            correctSuffix: "FUL",
            result: "UNCAREFUL",
            meaning: "Not careful",
            points: 20
        }
    ];

    const prefixOptions = ["UN", "RE", "DIS", ""];
    const suffixOptions = ["NESS", "FUL", "ABLE", "ING", "LY"];

    const getCurrentRoot = () => {
        return wordData[currentRootIndex];
    };

    const dropPrefix = (prefix) => {
        setSelectedPrefix(prefix);
    };

    const dropSuffix = (suffix) => {
        setSelectedSuffix(suffix);
    };

    const checkWord = () => {
        if (selectedPrefix === null || selectedSuffix === null) return;
        
        const currentRoot = getCurrentRoot();
        const isCorrect = selectedPrefix === currentRoot.correctPrefix && selectedSuffix === currentRoot.correctSuffix;
        
        setIsGrowing(true);
        
        setTimeout(() => {
            if (isCorrect) {
                setGrownBranches(prev => [...prev, currentRootIndex]);
                setScore(prev => prev + currentRoot.points);
                
                setHistory(prev => [...prev.slice(-9), {
                    attempt: attempts + 1,
                    root: currentRoot.root,
                    prefix: selectedPrefix,
                    suffix: selectedSuffix,
                    result: currentRoot.result,
                    correct: true,
                    points: currentRoot.points,
                    total: score + currentRoot.points
                }]);
                setAttempts(prev => prev + 1);
                
                if (currentRootIndex < wordData.length - 1) {
                    setCurrentRootIndex(prev => prev + 1);
                    setSelectedPrefix(null);
                    setSelectedSuffix(null);
                } else if (score + currentRoot.points >= targetScore) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        onComplete?.();
                        onUnlockNext?.('pattern-master');
                    }, 2000);
                }
            } else {
                setHistory(prev => [...prev.slice(-9), {
                    attempt: attempts + 1,
                    root: currentRoot.root,
                    prefix: selectedPrefix,
                    suffix: selectedSuffix,
                    result: `${selectedPrefix}${currentRoot.root}${selectedSuffix}`,
                    correct: false,
                    points: 0,
                    total: score
                }]);
                setAttempts(prev => prev + 1);
                setSelectedPrefix(null);
                setSelectedSuffix(null);
            }
            setIsGrowing(false);
        }, 1000);
    };

    const resetTree = () => {
        setCurrentRootIndex(0);
        setSelectedPrefix(null);
        setSelectedSuffix(null);
        setGrownBranches([]);
        setScore(0);
        setShowSuccess(false);
    };

    const currentRoot = getCurrentRoot();

    return (
        <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
                                color: '#10b981',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Tree Fully Grown!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect vocabulary: {score} points
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

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Trees size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Word-Root Tree
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Help the Word Tree grow with correct prefixes and suffixes
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                
                {/* Left: Word Tree */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trees size={18} color="#FCD34D" />
                        Word Tree
                    </h3>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '2rem',
                        minHeight: '400px',
                        position: 'relative'
                    }}>
                        {/* Tree Trunk */}
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60px',
                            height: '120px',
                            background: '#8B4513',
                            borderRadius: '10px'
                        }} />
                        
                        {/* Root Word */}
                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(252, 211, 77, 0.3)',
                            border: '2px solid #FCD34D',
                            borderRadius: '8px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: '#FCD34D'
                        }}>
                            {currentRoot.root}
                        </div>
                        
                        {/* Prefix and Suffix Areas */}
                        <div style={{
                            position: 'absolute',
                            top: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center'
                        }}>
                            {/* Prefix Area */}
                            <div style={{
                                padding: '1rem',
                                background: selectedPrefix ? 'rgba(252, 211, 77, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                                border: `2px solid ${selectedPrefix ? '#FCD34D' : 'rgba(255, 255, 255, 0.3)'}`,
                                borderRadius: '8px',
                                minWidth: '80px',
                                textAlign: 'center',
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}>
                                {selectedPrefix || "PREFIX"}
                            </div>
                            
                            {/* Root Display */}
                            <div style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}>
                                {currentRoot.root}
                            </div>
                            
                            {/* Suffix Area */}
                            <div style={{
                                padding: '1rem',
                                background: selectedSuffix ? 'rgba(252, 211, 77, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                                border: `2px solid ${selectedSuffix ? '#FCD34D' : 'rgba(255, 255, 255, 0.3)'}`,
                                borderRadius: '8px',
                                minWidth: '80px',
                                textAlign: 'center',
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}>
                                {selectedSuffix || "SUFFIX"}
                            </div>
                        </div>
                        
                        {/* Result Display */}
                        {(selectedPrefix || selectedSuffix) && (
                            <div style={{
                                position: 'absolute',
                                top: '5rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textAlign: 'center'
                            }}>
                                {selectedPrefix || ""}{currentRoot.root}{selectedSuffix || ""}
                            </div>
                        )}
                        
                        {/* Growing Animation */}
                        {isGrowing && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1.5 }}
                                exit={{ scale: 0 }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '3rem'
                                }}
                            >
                                🌱
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right: Leaves and Controls */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Falling Leaves
                    </h3>
                    
                    {/* Prefix Leaves */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Prefix Leaves:
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {prefixOptions.map((prefix, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => dropPrefix(prefix)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Leaf size={16} />
                                    {prefix || "NONE"}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Suffix Leaves */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Suffix Leaves:
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {suffixOptions.map((suffix, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => dropSuffix(suffix)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Leaf size={16} />
                                    {suffix}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Grow Button */}
                    <button
                        onClick={checkWord}
                        disabled={selectedPrefix === null || selectedSuffix === null || isGrowing}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: selectedPrefix !== null && selectedSuffix !== null && !isGrowing ? '#FCD34D' : '#4A5568',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: selectedPrefix !== null && selectedSuffix !== null && !isGrowing ? 'pointer' : 'not-allowed',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={20} />
                        {isGrowing ? 'Growing...' : 'Grow Branch'}
                    </button>
                    
                    {/* Score Progress */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginTop: '2rem'
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
                                        Tree fully grown!
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
                            onClick={resetTree}
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
                            <RotateCcw size={16} /> Reset Tree
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordRootTree;
