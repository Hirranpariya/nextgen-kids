import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Package, Zap, CheckCircle, AlertCircle, Trophy, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceBeam = ({ onComplete, onUnlockNext }) => {
    const [leftWeights, setLeftWeights] = useState({ x: 3, constant: 4 });
    const [rightWeights, setRightWeights] = useState({ total: 16 });
    const [isBalanced, setIsBalanced] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [step, setStep] = useState(1); // 1: Remove constants, 2: Solve for x
    const [xValue, setXValue] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);

    // Check balance whenever weights change
    useEffect(() => {
        const leftTotal = (leftWeights.x * (xValue || 0)) + leftWeights.constant;
        const rightTotal = rightWeights.total;
        const balanced = Math.abs(leftTotal - rightTotal) < 0.1;
        setIsBalanced(balanced);

        // Add to history
        if (xValue !== '') {
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                x: xValue,
                left: leftTotal,
                right: rightTotal,
                balanced: balanced
            }]);
            setAttempts(prev => prev + 1);
        }

        // Success handling
        if (balanced && xValue !== '' && step === 2) {
            setShowSuccess(true);
            setTimeout(() => {
                onComplete?.();
                onUnlockNext?.('area-architect');
            }, 2000);
        }
    }, [leftWeights, rightWeights, xValue, step]);

    const removeConstants = () => {
        if (step === 1) {
            setLeftWeights(prev => ({ ...prev, constant: 0 }));
            setRightWeights(prev => ({ total: prev.total - 4 }));
            setStep(2);
        }
    };

    const resetPuzzle = () => {
        setLeftWeights({ x: 3, constant: 4 });
        setRightWeights({ total: 16 });
        setStep(1);
        setXValue('');
        setIsBalanced(false);
        setShowSuccess(false);
    };

    const getBalanceAngle = () => {
        const leftTotal = (leftWeights.x * (xValue || 0)) + leftWeights.constant;
        const rightTotal = rightWeights.total;
        const difference = leftTotal - rightTotal;
        const maxDifference = 10;
        return Math.max(-15, Math.min(15, (difference / maxDifference) * 15));
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                                color: '#764ba2',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Equation Balanced!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                x = {xValue} • Balance achieved!
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +75 Explorer Points • Blueprint Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Scale size={32} color="#60A5FA" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Balance Beam
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Balance the cargo elevator equation: 3x + 4 = 16
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Interactive Scale */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Package size={18} color="#60A5FA" />
                        Equation Balance
                    </h3>
                    
                    {/* Visual Scale */}
                    <div style={{
                        width: '100%',
                        height: '200px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        {/* Balance Beam */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10%',
                                right: '10%',
                                height: '4px',
                                background: 'white',
                                borderRadius: '2px',
                                transformOrigin: 'center center'
                            }}
                            animate={{ rotate: getBalanceAngle() }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Center Fulcrum */}
                            <div style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '0',
                                height: '0',
                                borderLeft: '10px solid transparent',
                                borderRight: '10px solid transparent',
                                borderBottom: '20px solid white'
                            }} />
                        </motion.div>

                        {/* Left Side Weights */}
                        <div style={{
                            position: 'absolute',
                            left: '15%',
                            top: '30%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            {/* X Variables */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <motion.div
                                    animate={{ scale: step === 1 ? [1, 1.1, 1] : 1 }}
                                    transition={{ duration: 1, repeat: step === 1 ? Infinity : 0 }}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        background: '#60A5FA',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {leftWeights.x}x
                                </motion.div>
                            </div>
                            
                            {/* Constants */}
                            {leftWeights.constant > 0 && (
                                <motion.div
                                    initial={{ opacity: 1, scale: 1 }}
                                    animate={{ opacity: step === 1 ? 1 : 0, scale: step === 1 ? 1 : 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        background: '#FCD34D',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {leftWeights.constant}
                                </motion.div>
                            )}
                        </div>

                        {/* Right Side Weights */}
                        <div style={{
                            position: 'absolute',
                            right: '15%',
                            top: '30%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <motion.div
                                animate={{ scale: step === 1 ? [1, 1.1, 1] : 1 }}
                                transition={{ duration: 1, repeat: step === 1 ? Infinity : 0 }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#10B981',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                {rightWeights.total}
                            </motion.div>
                        </div>

                        {/* Balance Indicator */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                padding: '0.5rem 1rem',
                                background: isBalanced ? '#10B981' : '#F59E0B',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                {isBalanced ? '✓ BALANCED' : '⚖ UNBALANCED'}
                            </div>
                        </div>
                    </div>

                    {/* Step Instructions */}
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Step {step}: {step === 1 ? 'Remove constants from both sides' : 'Find the value of x'}
                        </div>
                        {step === 1 ? (
                            <button
                                onClick={removeConstants}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: '#60A5FA',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove 4 from both sides
                            </button>
                        ) : (
                            <div>
                                <div style={{ fontSize: '0.8rem', marginBottom: '1rem', opacity: 0.9 }}>
                                    Equation: 3x = 12<br />
                                    Divide both sides by 3
                                </div>
                                <input
                                    type="number"
                                    value={xValue}
                                    onChange={(e) => setXValue(e.target.value)}
                                    placeholder="Enter value of x"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Center: Solution Steps */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowRight size={18} color="#FCD34D" />
                        Solution Steps
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            padding: '1rem',
                            background: step >= 1 ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            border: step >= 1 ? '1px solid #60A5FA' : '1px solid rgba(255, 255, 255, 0.3)'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Step 1: Original Equation</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>3x + 4 = 16</div>
                        </div>

                        <div style={{
                            padding: '1rem',
                            background: step >= 2 ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            border: step >= 2 ? '1px solid #60A5FA' : '1px solid rgba(255, 255, 255, 0.3)'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Step 2: Remove Constants</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>3x = 12</div>
                        </div>

                        <div style={{
                            padding: '1rem',
                            background: step >= 2 && xValue !== '' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            border: step >= 2 && xValue !== '' ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.3)'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Step 3: Solve for x</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>x = {xValue || '?'}</div>
                        </div>
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
                            marginTop: '1rem'
                        }}
                    >
                        Reset Equation
                    </button>
                </div>

                {/* Right: Performance Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Balance History
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
                                        background: 'rgba(102, 126, 234, 0.9)', 
                                        border: 'none', 
                                        borderRadius: '8px' 
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="left" 
                                    stroke="#60A5FA" 
                                    strokeWidth={2}
                                    dot={{ fill: '#60A5FA', r: 4 }}
                                    name="Left Side"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="right" 
                                    stroke="#10B981" 
                                    strokeWidth={2}
                                    dot={{ fill: '#10B981', r: 4 }}
                                    name="Right Side"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isBalanced && xValue !== '' ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Perfect balance achieved!
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} color="#F59E0B" />
                                <span style={{ opacity: 0.8 }}>
                                    Keep adjusting the equation
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceBeam;
