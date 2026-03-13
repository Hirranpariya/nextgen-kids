import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Battery, Lightbulb, CheckCircle, AlertCircle, Trophy, Power, CircuitBoard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PowerGrid = ({ onComplete, onUnlockNext }) => {
    const [circuits, setCircuits] = useState([
        { id: 1, voltage: 0, current: 0, resistance: 10, power: 0, connected: false },
        { id: 2, voltage: 0, current: 0, resistance: 5, power: 0, connected: false },
        { id: 3, voltage: 0, current: 0, resistance: 20, power: 0, connected: false }
    ]);
    const [totalPower, setTotalPower] = useState(0);
    const [targetPower] = useState(100);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [selectedCircuit, setSelectedCircuit] = useState(null);

    // Calculate power using P = V²/R and I = V/R
    useEffect(() => {
        const newCircuits = circuits.map(circuit => {
            if (circuit.connected && circuit.voltage > 0) {
                const current = circuit.voltage / circuit.resistance;
                const power = (circuit.voltage * circuit.voltage) / circuit.resistance;
                return { ...circuit, current, power };
            }
            return { ...circuit, current: 0, power: 0 };
        });

        setCircuits(newCircuits);
        
        const total = newCircuits.reduce((sum, circuit) => sum + circuit.power, 0);
        setTotalPower(total);

        // Add to history
        if (newCircuits.some(c => c.connected)) {
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                total: total,
                circuits: newCircuits.filter(c => c.connected).length,
                perfect: Math.abs(total - targetPower) < 5
            }]);
            setAttempts(prev => prev + 1);
        }

        // Success handling
        if (Math.abs(total - targetPower) < 5 && newCircuits.every(c => c.connected)) {
            setShowSuccess(true);
            setTimeout(() => {
                onComplete?.();
                onUnlockNext?.('chemical-catalyst');
            }, 2000);
        }
    }, [circuits.map(c => `${c.voltage}-${c.connected}`).join('-')]);

    const adjustVoltage = (circuitId, delta) => {
        setCircuits(prev => prev.map(circuit => 
            circuit.id === circuitId 
                ? { ...circuit, voltage: Math.max(0, Math.min(24, circuit.voltage + delta)) }
                : circuit
        ));
    };

    const toggleCircuit = (circuitId) => {
        setCircuits(prev => prev.map(circuit => 
            circuit.id === circuitId 
                ? { ...circuit, connected: !circuit.connected }
                : circuit
        ));
    };

    const resetGrid = () => {
        setCircuits(prev => prev.map(circuit => ({
            ...circuit,
            voltage: 0,
            current: 0,
            power: 0,
            connected: false
        })));
        setTotalPower(0);
        setShowSuccess(false);
    };

    const getCircuitColor = (circuit) => {
        if (!circuit.connected) return '#4A5568';
        if (circuit.power > 20) return '#EF4444'; // Overloaded
        if (circuit.power > 10) return '#F59E0B'; // Warning
        return '#10B981'; // Normal
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
                                color: '#1a1a2e',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Power Grid Optimized!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect power: {totalPower.toFixed(1)}W
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +75 Explorer Points • Circuit Board Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <CircuitBoard size={32} color="#60A5FA" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Power Grid
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Power the station with exactly {targetPower}W using Ohm's Law
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Circuit Controls */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Battery size={18} color="#60A5FA" />
                        Circuit Controls
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {circuits.map((circuit, index) => (
                            <motion.div
                                key={circuit.id}
                                whileHover={{ scale: 1.02 }}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: `2px solid ${getCircuitColor(circuit)}`,
                                    borderRadius: '12px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedCircuit(circuit.id)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: circuit.connected ? getCircuitColor(circuit) : '#4A5568'
                                        }} />
                                        <span style={{ fontWeight: '600' }}>Circuit {circuit.id}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCircuit(circuit.id);
                                        }}
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            background: circuit.connected ? '#EF4444' : '#10B981',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {circuit.connected ? 'OFF' : 'ON'}
                                    </button>
                                </div>

                                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>
                                    Resistance: {circuit.resistance}Ω
                                </div>

                                {circuit.connected && (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    adjustVoltage(circuit.id, -2);
                                                }}
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
                                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Voltage</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{circuit.voltage}V</div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    adjustVoltage(circuit.id, 2);
                                                }}
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
                                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                                            Current: {circuit.current.toFixed(2)}A | Power: {circuit.power.toFixed(1)}W
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Center: Power Grid Visualization */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Power size={18} color="#FCD34D" />
                        Power Distribution
                    </h3>
                    
                    <div style={{
                        width: '100%',
                        height: '300px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        position: 'relative',
                        padding: '1rem'
                    }}>
                        {/* Power Meter */}
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '1rem',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.25rem' }}>Total Power</div>
                            <div style={{ 
                                fontSize: '2rem', 
                                fontWeight: 'bold',
                                color: Math.abs(totalPower - targetPower) < 5 ? '#10B981' : '#F59E0B'
                            }}>
                                {totalPower.toFixed(1)}
                            </div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Watts</div>
                        </div>

                        {/* Circuit Visualizations */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
                            {circuits.map((circuit, index) => (
                                <div key={circuit.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '40px',
                                        background: circuit.connected ? getCircuitColor(circuit) : '#4A5568',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        {circuit.connected && (
                                            <motion.div
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'rgba(255, 255, 255, 0.3)',
                                                    transform: `translateX(${(circuit.voltage / 24) * 100}%)`
                                                }}
                                                animate={{ x: [0, (circuit.voltage / 24) * 100] }}
                                                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                                            />
                                        )}
                                        <Lightbulb size={20} color={circuit.connected ? 'white' : '#4A5568'} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Circuit {circuit.id}</div>
                                        {circuit.connected && (
                                            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                                {circuit.power.toFixed(1)}W @ {circuit.voltage}V
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Power Target Indicator */}
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1rem', fontWeight: '600' }}>Target Power</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{targetPower}W</span>
                        </div>
                        <div style={{
                            marginTop: '0.5rem',
                            height: '8px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: Math.abs(totalPower - targetPower) < 5 ? '#10B981' : '#F59E0B',
                                    borderRadius: '4px'
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min(100, (totalPower / targetPower) * 100)}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>
                            Difference: {Math.abs(totalPower - targetPower).toFixed(1)}W
                        </div>
                    </div>
                </div>

                {/* Right: Performance Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Power History
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
                                        background: 'rgba(26, 26, 46, 0.9)', 
                                        border: 'none', 
                                        borderRadius: '8px' 
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="total" 
                                    stroke="#60A5FA" 
                                    strokeWidth={2}
                                    dot={{ fill: '#60A5FA', r: 4 }}
                                    name="Total Power (W)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {Math.abs(totalPower - targetPower) < 5 && circuits.every(c => c.connected) ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Perfect power achieved!
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} color="#F59E0B" />
                                <span style={{ opacity: 0.8 }}>
                                    {totalPower > targetPower ? 'Too much power!' : 'Adjust circuits...'}
                                </span>
                            </>
                        )}
                    </div>

                    <button
                        onClick={resetGrid}
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
                        Reset Grid
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PowerGrid;
