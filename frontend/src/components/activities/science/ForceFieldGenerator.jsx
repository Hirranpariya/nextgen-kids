import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnet, Zap, Shield, CheckCircle, AlertCircle, Trophy, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ForceFieldGenerator = ({ onComplete, onUnlockNext }) => {
    const [forces, setForces] = useState([
        { id: 1, type: 'gravity', magnitude: 9.8, direction: 'down', color: '#EF4444' },
        { id: 2, type: 'magnetic', magnitude: 0, direction: 'up', color: '#60A5FA' },
        { id: 3, type: 'electric', magnitude: 0, direction: 'up', color: '#FCD34D' }
    ]);
    const [netForce, setNetForce] = useState(9.8);
    const [targetForce] = useState(0); // Equilibrium
    const [fieldStrength, setFieldStrength] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Calculate net force
    useEffect(() => {
        const total = forces.reduce((sum, force) => {
            return sum + (force.direction === 'up' ? -force.magnitude : force.magnitude);
        }, 0);
        setNetForce(Math.abs(total));
        
        // Calculate field strength based on balance
        const balance = 100 - (Math.abs(total) / 10) * 100;
        setFieldStrength(Math.max(0, Math.min(100, balance)));

        // Add to history
        if (forces.some(f => f.magnitude > 0 && f.type !== 'gravity')) {
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                netForce: Math.abs(total),
                fieldStrength: balance,
                balanced: Math.abs(total) < 0.5
            }]);
            setAttempts(prev => prev + 1);
        }

        // Success handling
        if (Math.abs(total) < 0.5 && forces.some(f => f.magnitude > 0 && f.type !== 'gravity')) {
            setShowSuccess(true);
            setTimeout(() => {
                onComplete?.();
                onUnlockNext?.('story-weaver');
            }, 2000);
        }
    }, [forces.map(f => f.magnitude).join('-')]);

    const adjustForce = (forceId, delta) => {
        setForces(prev => prev.map(force => 
            force.id === forceId && force.type !== 'gravity'
                ? { ...force, magnitude: Math.max(0, Math.min(20, force.magnitude + delta)) }
                : force
        ));
    };

    const toggleDirection = (forceId) => {
        setForces(prev => prev.map(force => 
            force.id === forceId && force.type !== 'gravity'
                ? { ...force, direction: force.direction === 'up' ? 'down' : 'up' }
                : force
        ));
    };

    const resetField = () => {
        setForces([
            { id: 1, type: 'gravity', magnitude: 9.8, direction: 'down', color: '#EF4444' },
            { id: 2, type: 'magnetic', magnitude: 0, direction: 'up', color: '#60A5FA' },
            { id: 3, type: 'electric', magnitude: 0, direction: 'up', color: '#FCD34D' }
        ]);
        setNetForce(9.8);
        setFieldStrength(0);
        setShowSuccess(false);
        setIsGenerating(false);
    };

    const activateField = () => {
        setIsGenerating(true);
        // Simulate field generation
        setTimeout(() => {
            setIsGenerating(false);
        }, 2000);
    };

    const isBalanced = netForce < 0.5;

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
                                Force Field Active!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect equilibrium: {netForce.toFixed(2)}N net force
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +125 Explorer Points • Force Field Generator
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Magnet size={32} color="#60A5FA" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Force Field Generator
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Balance all forces to achieve equilibrium (0N net force)
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Force Controls */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={18} color="#60A5FA" />
                        Force Controls
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {forces.map((force, index) => (
                            <motion.div
                                key={force.id}
                                whileHover={{ scale: 1.02 }}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: `2px solid ${force.color}`,
                                    borderRadius: '12px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: force.color,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {force.type === 'gravity' ? '⬇️' : force.direction === 'up' ? '⬆️' : '⬇️'}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                                                {force.type === 'gravity' ? 'Gravity' : force.type === 'magnetic' ? 'Magnetic' : 'Electric'}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                                {force.direction === 'down' ? 'Downward' : 'Upward'}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: force.color
                                    }}>
                                        {force.magnitude.toFixed(1)}
                                    </div>
                                </div>

                                {force.type !== 'gravity' && (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <button
                                                onClick={() => adjustForce(force.id, -1)}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    color: 'white',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                -
                                            </button>
                                            <div style={{ flex: 1, textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Force (N)</div>
                                            </div>
                                            <button
                                                onClick={() => adjustForce(force.id, 1)}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    color: 'white',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => toggleDirection(force.id)}
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                border: 'none',
                                                borderRadius: '6px',
                                                color: 'white',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            Flip Direction
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Center: Field Visualization */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={18} color="#FCD34D" />
                        Force Field Status
                    </h3>
                    
                    <div style={{
                        width: '100%',
                        height: '300px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Field Strength Indicator */}
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '1rem',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.25rem' }}>Field Strength</div>
                            <div style={{ 
                                fontSize: '2rem', 
                                fontWeight: 'bold',
                                color: isBalanced ? '#10B981' : '#F59E0B'
                            }}>
                                {fieldStrength.toFixed(0)}%
                            </div>
                        </div>

                        {/* Force Vectors */}
                        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                            {forces.map((force, index) => (
                                <motion.div
                                    key={force.id}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <motion.div
                                        style={{
                                            width: `${Math.max(20, force.magnitude * 5)}px`,
                                            height: '4px',
                                            background: force.color,
                                            borderRadius: '2px',
                                            transform: force.direction === 'up' ? 'rotate(-90deg)' : 'rotate(90deg)',
                                            transformOrigin: 'center'
                                        }}
                                        animate={force.magnitude > 0 ? {
                                            scale: [1, 1.2, 1],
                                            opacity: [0.7, 1, 0.7]
                                        } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <div style={{
                                        fontSize: '0.7rem',
                                        marginTop: '0.5rem',
                                        color: force.color,
                                        fontWeight: 'bold'
                                    }}>
                                        {force.magnitude.toFixed(1)}N
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Equilibrium Indicator */}
                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '1rem',
                            right: '1rem'
                        }}>
                            <div style={{
                                padding: '0.75rem',
                                background: isBalanced ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                border: `1px solid ${isBalanced ? '#10B981' : '#F59E0B'}`,
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                    Net Force: {netForce.toFixed(2)}N
                                </div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                                    {isBalanced ? '✓ Equilibrium Achieved' : '⚖ Unbalanced'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Field Control */}
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                        <button
                            onClick={activateField}
                            disabled={!isBalanced || isGenerating}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: isBalanced && !isGenerating ? '#10B981' : '#4A5568',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: isBalanced && !isGenerating ? 'pointer' : 'not-allowed',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Shield size={20} />
                            {isGenerating ? 'Generating...' : 'Activate Field'}
                        </button>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem', textAlign: 'center' }}>
                            {isBalanced ? 'Ready to generate field!' : 'Balance forces first'}
                        </div>
                    </div>
                </div>

                {/* Right: Performance Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Force History
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
                                    dataKey="netForce" 
                                    stroke="#60A5FA" 
                                    strokeWidth={2}
                                    dot={{ fill: '#60A5FA', r: 4 }}
                                    name="Net Force (N)"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="fieldStrength" 
                                    stroke="#10B981" 
                                    strokeWidth={2}
                                    dot={{ fill: '#10B981', r: 4 }}
                                    name="Field Strength (%)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isBalanced ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Perfect equilibrium!
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} color="#F59E0B" />
                                <span style={{ opacity: 0.8 }}>
                                    Adjust forces to balance
                                </span>
                            </>
                        )}
                    </div>

                    <button
                        onClick={resetField}
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
                        <RotateCcw size={16} /> Reset Field
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForceFieldGenerator;
