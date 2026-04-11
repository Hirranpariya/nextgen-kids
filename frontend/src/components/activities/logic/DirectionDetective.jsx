import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../../ui/BackButton';
import { Compass, Navigation, CheckCircle, AlertCircle, Trophy, RotateCcw, Clock, Zap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DirectionDetective = ({ onComplete, onUnlockNext }) => {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [characterPosition, setCharacterPosition] = useState({ x: 2, y: 2 });
    const [characterDirection, setCharacterDirection] = useState('NORTH');
    const [showSuccess, setShowSuccess] = useState(false);
    const [score, setScore] = useState(0);
    const [targetScore] = useState(100);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [speedBonus, setSpeedBonus] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    const puzzles = [
        {
            instructions: "Walk 3 steps North, turn Left, walk 2 steps, turn Right, walk 1 step",
            startPosition: { x: 2, y: 2 },
            finalDirection: 'EAST',
            hint: "Track each turn carefully",
            gridSize: 5
        },
        {
            instructions: "Walk 2 steps East, turn Right, walk 3 steps, turn Right, walk 1 step, turn Left",
            startPosition: { x: 1, y: 1 },
            finalDirection: 'NORTH',
            hint: "Right turns change direction clockwise",
            gridSize: 6
        },
        {
            instructions: "Walk 4 steps North, turn Left, walk 2 steps, turn Left, walk 1 step, turn Left",
            startPosition: { x: 3, y: 0 },
            finalDirection: 'SOUTH',
            hint: "Left turns change direction counter-clockwise",
            gridSize: 5
        },
        {
            instructions: "Walk 1 step East, turn Right, walk 2 steps, turn Right, walk 2 steps, turn Right, walk 3 steps",
            startPosition: { x: 0, y: 2 },
            finalDirection: 'WEST',
            hint: "Four right turns make a full circle",
            gridSize: 6
        },
        {
            instructions: "Walk 2 steps North, turn Left, walk 1 step, turn Right, walk 3 steps, turn Left, walk 1 step",
            startPosition: { x: 2, y: 1 },
            finalDirection: 'WEST',
            hint: "Alternating turns can be tricky",
            gridSize: 5
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

    const moveCharacter = (direction) => {
        if (!isTimerRunning && timeElapsed === 0) {
            startPuzzle();
        }

        setIsMoving(true);
        setTimeout(() => setIsMoving(false), 300);

        const newPos = { ...characterPosition };
        const gridSize = currentPuzzle.gridSize;

        switch (direction) {
            case 'NORTH':
                if (newPos.y > 0) newPos.y--;
                break;
            case 'SOUTH':
                if (newPos.y < gridSize - 1) newPos.y++;
                break;
            case 'EAST':
                if (newPos.x < gridSize - 1) newPos.x++;
                break;
            case 'WEST':
                if (newPos.x > 0) newPos.x--;
                break;
        }

        setCharacterPosition(newPos);
    };

    const turnCharacter = (turnDirection) => {
        if (!isTimerRunning && timeElapsed === 0) {
            startPuzzle();
        }

        const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        const currentIndex = directions.indexOf(characterDirection);
        
        if (turnDirection === 'LEFT') {
            setCharacterDirection(directions[(currentIndex - 1 + 4) % 4]);
        } else {
            setCharacterDirection(directions[(currentIndex + 1) % 4]);
        }
    };

    const checkFinalDirection = (direction) => {
        if (direction === currentPuzzle.finalDirection) {
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
                    setCharacterPosition(currentPuzzles[currentPuzzleIndex + 1].startPosition);
                    setCharacterDirection('NORTH');
                    setShowSuccess(false);
                    setTimeElapsed(0);
                    setSpeedBonus(false);
                    setShowHint(false);
                }, 2000);
            } else if (score + points >= targetScore) {
                setTimeout(() => {
                    onComplete?.();
                    onUnlockNext?.('number-pyramid');
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
        setCharacterPosition(currentPuzzle.startPosition);
        setCharacterDirection('NORTH');
        setTimeElapsed(0);
        setIsTimerRunning(false);
        setSpeedBonus(false);
        setShowHint(false);
    };

    const getDirectionIcon = (direction) => {
        switch (direction) {
            case 'NORTH': return <ArrowUp size={20} />;
            case 'SOUTH': return <ArrowDown size={20} />;
            case 'EAST': return <ArrowRight size={20} />;
            case 'WEST': return <ArrowLeft size={20} />;
            default: return <ArrowUp size={20} />;
        }
    };

    const getRotationAngle = (direction) => {
        switch (direction) {
            case 'NORTH': return 0;
            case 'EAST': return 90;
            case 'SOUTH': return 180;
            case 'WEST': return 270;
            default: return 0;
        }
    };

    useEffect(() => {
        setCharacterPosition(currentPuzzle.startPosition);
        setCharacterDirection('NORTH');
    }, [currentPuzzleIndex]);

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
                                Mission Complete!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect navigation: {score + (speedBonus ? 25 : 20)} points
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
                                +100 Explorer Points • Number Pyramid Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <BackButton theme="explorer" onClick={() => onComplete?.()} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Navigation size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Direction Detective
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Find your lost friend by following directions
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
                
                {/* Left: Map and Controls */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Navigation Map
                    </h3>
                    
                    {/* Instructions */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        <strong>Instructions:</strong> {currentPuzzle.instructions}
                    </div>
                    
                    {/* Grid Map */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${currentPuzzle.gridSize}, 1fr)`,
                            gap: '2px',
                            marginBottom: '1rem'
                        }}>
                            {Array.from({ length: currentPuzzle.gridSize * currentPuzzle.gridSize }).map((_, index) => {
                                const x = index % currentPuzzle.gridSize;
                                const y = Math.floor(index / currentPuzzle.gridSize);
                                const isCharacter = x === characterPosition.x && y === characterPosition.y;
                                
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: isCharacter ? '#FCD34D' : 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}
                                    >
                                        {isCharacter && (
                                            <motion.div
                                                animate={{ rotate: getRotationAngle(characterDirection) }}
                                                transition={{ duration: 0.3 }}
                                                style={{
                                                    fontSize: '1.5rem',
                                                    transformOrigin: 'center'
                                                }}
                                            >
                                                🧭
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Movement Controls */}
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                            Movement Controls:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', width: '200px' }}>
                            <div></div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => moveCharacter('NORTH')}
                                style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                            >
                                <ArrowUp size={20} />
                            </motion.button>
                            <div></div>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => moveCharacter('WEST')}
                                style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                            >
                                <ArrowLeft size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => moveCharacter('SOUTH')}
                                style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                            >
                                <ArrowDown size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => moveCharacter('EAST')}
                                style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                            >
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </div>
                    
                    {/* Turn Controls */}
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                            Turn Controls:
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => turnCharacter('LEFT')}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Turn Left ↺
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => turnCharacter('RIGHT')}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Turn Right ↻
                            </motion.button>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
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

                {/* Right: Compass and Final Direction */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Direction Finder
                    </h3>
                    
                    {/* Compass */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '2rem',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.7 }}>
                            Current Direction:
                        </div>
                        <motion.div
                            animate={{ rotate: getRotationAngle(characterDirection) }}
                            transition={{ duration: 0.3 }}
                            style={{
                                width: '120px',
                                height: '120px',
                                margin: '0 auto',
                                position: 'relative',
                                background: 'rgba(252, 211, 77, 0.2)',
                                borderRadius: '50%',
                                border: '2px solid #FCD34D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                N
                            </div>
                            <div style={{
                                position: 'absolute',
                                right: '10px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                E
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                S
                            </div>
                            <div style={{
                                position: 'absolute',
                                left: '10px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                W
                            </div>
                            <motion.div
                                animate={{ rotate: 0 }}
                                style={{
                                    fontSize: '2rem',
                                    transformOrigin: 'center'
                                }}
                            >
                                🧭
                            </motion.div>
                        </motion.div>
                    </div>
                    
                    {/* Final Direction Selection */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                            What's the final direction?
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            {['NORTH', 'EAST', 'SOUTH', 'WEST'].map(direction => (
                                <motion.button
                                    key={direction}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => checkFinalDirection(direction)}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {getDirectionIcon(direction)}
                                    {direction}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Progress */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.5rem'
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
                                        Master Navigator!
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
                        textAlign: 'center',
                        marginTop: '1rem'
                    }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            🧭 Master Navigator
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            Complete all direction puzzles to earn
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectionDetective;
