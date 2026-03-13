import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Atom, Beaker, CheckCircle, AlertCircle, Trophy, RotateCcw, Droplets } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChemicalCatalyst = ({ onComplete, onUnlockNext }) => {
    const [molecules, setMolecules] = useState({
        H2: { count: 4, symbol: 'H₂', color: '#60A5FA', mass: 2 },
        O2: { count: 2, symbol: 'O₂', color: '#EF4444', mass: 32 },
        H2O: { count: 0, symbol: 'H₂O', color: '#10B981', mass: 18 }
    });
    const [catalystActive, setCatalystActive] = useState(false);
    const [reactionProgress, setReactionProgress] = useState(0);
    const [targetH2O] = useState(4);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [isReacting, setIsReacting] = useState(false);

    // Chemical reaction: 2H₂ + O₂ → 2H₂O
    useEffect(() => {
        if (catalystActive && molecules.H2.count >= 2 && molecules.O2.count >= 1) {
            setIsReacting(true);
            const reactionInterval = setInterval(() => {
                setMolecules(prev => {
                    const newMolecules = { ...prev };
                    
                    // Check if reaction can proceed
                    if (newMolecules.H2.count >= 2 && newMolecules.O2.count >= 1) {
                        // Consume reactants
                        newMolecules.H2.count -= 2;
                        newMolecules.O2.count -= 1;
                        // Produce products
                        newMolecules.H2O.count += 2;
                        
                        setReactionProgress(prev => Math.min(100, prev + 25));
                    } else {
                        setCatalystActive(false);
                        setIsReacting(false);
                    }
                    
                    return newMolecules;
                });
            }, 1000);

            return () => clearInterval(reactionInterval);
        }
    }, [catalystActive, molecules.H2.count, molecules.O2.count]);

    // Check success condition
    useEffect(() => {
        if (molecules.H2O.count === targetH2O && !isReacting) {
            setShowSuccess(true);
            setTimeout(() => {
                onComplete?.();
                onUnlockNext?.('force-field-generator');
            }, 2000);
        }

        // Add to history
        if (reactionProgress > 0) {
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                H2: molecules.H2.count,
                O2: molecules.O2.count,
                H2O: molecules.H2O.count,
                progress: reactionProgress
            }]);
            setAttempts(prev => prev + 1);
        }
    }, [molecules.H2O.count, reactionProgress]);

    const addMolecule = (type) => {
        if (!isReacting) {
            setMolecules(prev => ({
                ...prev,
                [type]: { ...prev[type], count: prev[type].count + 1 }
            }));
        }
    };

    const removeMolecule = (type) => {
        if (!isReacting && molecules[type].count > 0) {
            setMolecules(prev => ({
                ...prev,
                [type]: { ...prev[type], count: prev[type].count - 1 }
            }));
        }
    };

    const toggleCatalyst = () => {
        if (molecules.H2.count >= 2 && molecules.O2.count >= 1) {
            setCatalystActive(!catalystActive);
            if (!catalystActive) {
                setReactionProgress(0);
            }
        }
    };

    const resetReaction = () => {
        setMolecules({
            H2: { count: 4, symbol: 'H₂', color: '#60A5FA', mass: 2 },
            O2: { count: 2, symbol: 'O₂', color: '#EF4444', mass: 32 },
            H2O: { count: 0, symbol: 'H₂O', color: '#10B981', mass: 18 }
        });
        setCatalystActive(false);
        setReactionProgress(0);
        setIsReacting(false);
        setShowSuccess(false);
    };

    const canStartReaction = molecules.H2.count >= 2 && molecules.O2.count >= 1;

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
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
                                color: '#0f2027',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Reaction Complete!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect synthesis: {molecules.H2O.count} H₂O molecules
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +100 Explorer Points • Catalyst Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <FlaskConical size={32} color="#60A5FA" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Chemical Catalyst
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Create exactly {targetH2O} H₂O molecules using 2H₂ + O₂ → 2H₂O
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Molecule Controls */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Atom size={18} color="#60A5FA" />
                        Molecule Inventory
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.entries(molecules).map(([type, molecule]) => (
                            <motion.div
                                key={type}
                                whileHover={{ scale: 1.02 }}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: `2px solid ${molecule.color}`,
                                    borderRadius: '12px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: molecule.color,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}>
                                            {molecule.symbol}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{type === 'H2' ? 'Hydrogen' : type === 'O2' ? 'Oxygen' : 'Water'}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Mass: {molecule.mass}g/mol</div>
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: molecule.color
                                    }}>
                                        {molecule.count}
                                    </div>
                                </div>

                                {!isReacting && (type === 'H2' || type === 'O2') && (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => removeMolecule(type)}
                                            disabled={molecule.count === 0}
                                            style={{
                                                flex: 1,
                                                padding: '0.5rem',
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                border: 'none',
                                                borderRadius: '6px',
                                                color: 'white',
                                                cursor: molecule.count > 0 ? 'pointer' : 'not-allowed',
                                                opacity: molecule.count > 0 ? 1 : 0.5
                                            }}
                                        >
                                            -
                                        </button>
                                        <button
                                            onClick={() => addMolecule(type)}
                                            style={{
                                                flex: 1,
                                                padding: '0.5rem',
                                                background: molecule.color,
                                                border: 'none',
                                                borderRadius: '6px',
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Center: Reaction Chamber */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Beaker size={18} color="#FCD34D" />
                        Reaction Chamber
                    </h3>
                    
                    <div style={{
                        width: '100%',
                        height: '300px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Catalyst Status */}
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '1rem',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.25rem' }}>Catalyst</div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: catalystActive ? '#10B981' : '#4A5568',
                                borderRadius: '50%',
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {catalystActive && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <Atom size={20} color="white" />
                                    </motion.div>
                                )}
                            </div>
                            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {catalystActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>

                        {/* Molecule Visualization */}
                        <div style={{ padding: '2rem', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                                {/* Reactants */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>Reactants</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {Array.from({ length: Math.min(molecules.H2.count, 2) }).map((_, i) => (
                                            <motion.div
                                                key={`H2-${i}`}
                                                animate={isReacting ? { x: [0, 50], opacity: [1, 0] } : {}}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    background: '#60A5FA',
                                                    borderRadius: '50%',
                                                    margin: '0 auto'
                                                }}
                                            />
                                        ))}
                                        {Array.from({ length: Math.min(molecules.O2.count, 1) }).map((_, i) => (
                                            <motion.div
                                                key={`O2-${i}`}
                                                animate={isReacting ? { x: [0, 50], opacity: [1, 0] } : {}}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    background: '#EF4444',
                                                    borderRadius: '50%',
                                                    margin: '0 auto'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div style={{ fontSize: '2rem', opacity: 0.7 }}>→</div>

                                {/* Products */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>Products</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {Array.from({ length: molecules.H2O.count }).map((_, i) => (
                                            <motion.div
                                                key={`H2O-${i}`}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: i * 0.3 }}
                                                style={{
                                                    width: '35px',
                                                    height: '35px',
                                                    background: '#10B981',
                                                    borderRadius: '50%',
                                                    margin: '0 auto'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reaction Progress */}
                        {catalystActive && (
                            <div style={{
                                position: 'absolute',
                                bottom: '1rem',
                                left: '1rem',
                                right: '1rem'
                            }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>
                                    Reaction Progress: {reactionProgress}%
                                </div>
                                <div style={{
                                    height: '8px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    <motion.div
                                        style={{
                                            height: '100%',
                                            background: '#10B981',
                                            borderRadius: '4px'
                                        }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${reactionProgress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Catalyst Control */}
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                        <button
                            onClick={toggleCatalyst}
                            disabled={!canStartReaction || isReacting}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: canStartReaction && !isReacting ? '#10B981' : '#4A5568',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: canStartReaction && !isReacting ? 'pointer' : 'not-allowed',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Atom size={20} />
                            {catalystActive ? 'Stop Reaction' : 'Start Catalyst'}
                        </button>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem', textAlign: 'center' }}>
                            {canStartReaction ? 'Ready to react!' : 'Need at least 2 H₂ and 1 O₂'}
                        </div>
                    </div>
                </div>

                {/* Right: Performance Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Reaction History
                    </h3>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        height: '250px'
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={history}>
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
                                        background: 'rgba(15, 32, 39, 0.9)', 
                                        border: 'none', 
                                        borderRadius: '8px' 
                                    }}
                                />
                                <Bar 
                                    dataKey="H2O" 
                                    fill="#10B981"
                                    radius={[4, 4, 0, 0]}
                                    name="H₂O Molecules"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {molecules.H2O.count === targetH2O ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Perfect synthesis achieved!
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} color="#F59E0B" />
                                <span style={{ opacity: 0.8 }}>
                                    {molecules.H2O.count < targetH2O ? 'Keep reacting...' : 'Too many products!'}
                                </span>
                            </>
                        )}
                    </div>

                    <button
                        onClick={resetReaction}
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
                        <RotateCcw size={16} /> Reset Reaction
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChemicalCatalyst;
