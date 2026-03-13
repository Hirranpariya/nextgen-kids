import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Droplet, Zap, CheckCircle, AlertCircle, Trophy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

const FuelMixer = ({ onComplete, onUnlockNext }) => {
    const [blueLevel, setBlueLevel] = useState(0);
    const [yellowLevel, setYellowLevel] = useState(0);
    const [isStable, setIsStable] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);

    // Target ratio: 3:2 (Blue:Yellow)
    const targetRatio = { blue: 3, yellow: 2 };
    
    // Simplify ratio function
    const simplifyRatio = (num, den) => {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(num, den);
        return {
            simplified: { blue: num / divisor, yellow: den / divisor },
            isCorrect: (num / divisor) === targetRatio.blue && (den / divisor) === targetRatio.yellow
        };
    };

    // Check ratio whenever levels change
    useEffect(() => {
        if (blueLevel > 0 && yellowLevel > 0) {
            const result = simplifyRatio(blueLevel, yellowLevel);
            setIsStable(result.isCorrect);
            
            // Add to history for chart
            if (blueLevel > 0 && yellowLevel > 0) {
                setHistory(prev => [...prev.slice(-9), {
                    attempt: attempts + 1,
                    blue: blueLevel,
                    yellow: yellowLevel,
                    ratio: `${(blueLevel / yellowLevel).toFixed(2)}:1`,
                    stable: result.isCorrect
                }]);
                setAttempts(prev => prev + 1);
            }

            // Success handling
            if (result.isCorrect && !showSuccess) {
                setShowSuccess(true);
                setTimeout(() => {
                    onComplete?.();
                    onUnlockNext?.('balance-beam');
                }, 2000);
            }
        } else {
            setIsStable(false);
        }
    }, [blueLevel, yellowLevel]);

    const resetMixer = () => {
        setBlueLevel(0);
        setYellowLevel(0);
        setIsStable(false);
        setShowSuccess(false);
    };

    const getStabilityPercentage = () => {
        if (blueLevel === 0 || yellowLevel === 0) return 0;
        const currentRatio = blueLevel / yellowLevel;
        const targetRatioValue = targetRatio.blue / targetRatio.yellow;
        const difference = Math.abs(currentRatio - targetRatioValue);
        const maxDifference = Math.max(targetRatioValue, 2);
        return Math.max(0, Math.min(100, (1 - difference / maxDifference) * 100));
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
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
                                color: '#1e3c72',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Mission Complete!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect ratio achieved: {blueLevel}:{yellowLevel}
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +50 Explorer Points • Full Tank Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Beaker size={32} color="#60A5FA" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Fuel Mixer
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Create the perfect 3:2 ratio for Ion-Engine fuel
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Fuel Tubes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Blue Ion Liquid */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Droplet size={18} color="#60A5FA" />
                            Blue Ion Liquid
                        </h3>
                        <div style={{
                            width: '80px',
                            height: '200px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '10px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    background: 'linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%)',
                                    borderRadius: '0 0 8px 8px'
                                }}
                                initial={{ height: '0%' }}
                                animate={{ height: `${(blueLevel / 20) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}>
                                {blueLevel}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button
                                onClick={() => setBlueLevel(Math.max(0, blueLevel - 1))}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                -
                            </button>
                            <button
                                onClick={() => setBlueLevel(Math.min(20, blueLevel + 1))}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Yellow Catalyst */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Droplet size={18} color="#FCD34D" />
                            Yellow Catalyst
                        </h3>
                        <div style={{
                            width: '80px',
                            height: '200px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '10px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    background: 'linear-gradient(180deg, #FCD34D 0%, #F59E0B 100%)',
                                    borderRadius: '0 0 8px 8px'
                                }}
                                initial={{ height: '0%' }}
                                animate={{ height: `${(yellowLevel / 20) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}>
                                {yellowLevel}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button
                                onClick={() => setYellowLevel(Math.max(0, yellowLevel - 1))}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                -
                            </button>
                            <button
                                onClick={() => setYellowLevel(Math.min(20, yellowLevel + 1))}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center: Stability Meter */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={18} color={isStable ? "#10B981" : "#F59E0B"} />
                        Stability Meter
                    </h3>
                    <div style={{
                        width: '200px',
                        height: '200px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '3px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        <motion.div
                            style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                background: `conic-gradient(from 180deg, 
                                    ${isStable ? '#10B981' : getStabilityPercentage() > 50 ? '#F59E0B' : '#EF4444'} 0deg, 
                                    ${isStable ? '#10B981' : getStabilityPercentage() > 50 ? '#F59E0B' : '#EF4444'} ${getStabilityPercentage() * 3.6}deg, 
                                    rgba(255, 255, 255, 0.2) ${getStabilityPercentage() * 3.6}deg)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            <div style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                background: 'rgba(30, 60, 114, 0.9)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                    {Math.round(getStabilityPercentage())}%
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                    {isStable ? 'STABLE' : 'ADJUSTING'}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            Current Ratio: {blueLevel}:{yellowLevel}
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            Target: 3:2 (Blue:Yellow)
                        </div>
                    </div>

                    <button
                        onClick={resetMixer}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        Reset Mixer
                    </button>
                </div>

                {/* Right: Performance Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Performance History
                    </h3>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        height: '250px'
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis 
                                    dataKey="attempt" 
                                    stroke="rgba(255,255,255,0.5)"
                                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                                />
                                <YAxis 
                                    stroke="rgba(255,255,255,0.5)"
                                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        background: 'rgba(30, 60, 114, 0.9)', 
                                        border: 'none', 
                                        borderRadius: '8px' 
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="blue" 
                                    stroke="#60A5FA" 
                                    strokeWidth={2}
                                    dot={{ fill: '#60A5FA', r: 4 }}
                                    name="Blue"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="yellow" 
                                    stroke="#FCD34D" 
                                    strokeWidth={2}
                                    dot={{ fill: '#FCD34D', r: 4 }}
                                    name="Yellow"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isStable ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Perfect ratio achieved!
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} color="#F59E0B" />
                                <span style={{ opacity: 0.8 }}>
                                    Keep adjusting the mixture
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FuelMixer;