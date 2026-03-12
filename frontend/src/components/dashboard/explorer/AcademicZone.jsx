import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Calculator, Cpu, Globe, ArrowRight, X, Beaker } from 'lucide-react';
import FuelMixer from '../../activities/math/FuelMixer';
import BalanceBeam from '../../activities/math/BalanceBeam';
import AreaArchitect from '../../activities/math/AreaArchitect';
import { AuthContext } from '../../../context/AuthContext';

const SubjectModule = ({ title, icon: Icon, progress, color }) => (
    <motion.div
        whileHover={{ y: -2 }}
        style={{
            background: 'white', border: '1px solid #E2E8F0', borderRadius: '10px',
            padding: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: `${color}15`, borderRadius: '8px', color: color }}>
                    <Icon size={18} />
                </div>
                <span style={{ fontWeight: '600', color: '#2D3748', fontSize: '0.9rem' }}>{title}</span>
            </div>
            <ArrowRight size={14} color="#A0AEC0" />
        </div>
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: '#718096' }}>
                <span>Progress</span>
                <span>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: '#EDF2F7', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: '2px' }} />
            </div>
        </div>
    </motion.div>
);

const AcademicZone = () => {
    const [showFuelMixer, setShowFuelMixer] = useState(false);
    const [showBalanceBeam, setShowBalanceBeam] = useState(false);
    const [showAreaArchitect, setShowAreaArchitect] = useState(false);
    const [activeSubject, setActiveSubject] = useState(null);
    const { completeActivity, addToInventory, addExplorerPoints, unlockActivity, inventory, unlockedActivities, explorerPoints } = useContext(AuthContext);

    const handleFuelMixerComplete = () => {
        const reward = {
            item: { id: 'full-tank', name: 'Full Tank', icon: '⛽', rarity: 'common' },
            points: 50,
            unlocksNext: 'balance-beam'
        };
        completeActivity('fuel-mixer', reward);
        console.log('Fuel Mixer completed! +50 Explorer Points, Full Tank added to inventory');
    };

    const handleBalanceBeamComplete = () => {
        const reward = {
            item: { id: 'blueprint', name: 'Landing Pad Blueprint', icon: '📐', rarity: 'rare' },
            points: 75,
            unlocksNext: 'area-architect'
        };
        completeActivity('balance-beam', reward);
        console.log('Balance Beam completed! +75 Explorer Points, Blueprint added to inventory');
    };

    const handleAreaArchitectComplete = () => {
        const reward = {
            item: { id: 'landing-pad', name: 'Landing Pad', icon: '🛬', rarity: 'epic' },
            points: 100,
            unlocksNext: 'power-grid'
        };
        completeActivity('area-architect', reward);
        console.log('Area Architect completed! +100 Explorer Points, Landing Pad added to inventory');
    };

    const handleUnlockNext = (nextActivity) => {
        unlockActivity(nextActivity);
        console.log(`Unlocked: ${nextActivity}`);
    };

    const MathMissionHub = () => (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            {/* Back Button */}
            <button
                onClick={() => setActiveSubject(null)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: '#F7FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    color: '#4A5568',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '1.5rem'
                }}
            >
                ← Back to Subjects
            </button>

            {/* Mission List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2D3748', marginBottom: '0.5rem' }}>
                    Math Missions
                </h3>

                {/* Mission 1: Fuel Mixer */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                        background: 'white',
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{ padding: '0.5rem', background: '#EBF8FF', borderRadius: '8px', color: '#3182CE' }}>
                                    <Beaker size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        1. The Fuel Mixer
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Master ratios to power Ion-Engine
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowFuelMixer(true)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '0.875rem'
                            }}
                        >
                            Launch
                        </button>
                    </div>
                </motion.div>

                {/* Mission 2: Balance Beam */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                        background: unlockedActivities.includes('balance-beam') ? 'white' : '#F7FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        cursor: unlockedActivities.includes('balance-beam') ? 'pointer' : 'not-allowed',
                        opacity: unlockedActivities.includes('balance-beam') ? 1 : 0.7,
                        position: 'relative'
                    }}
                >
                    {!unlockedActivities.includes('balance-beam') && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                background: '#FED7D7',
                                color: '#C53030',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}>
                                🔒 Locked
                            </span>
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('balance-beam') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('balance-beam') ? '#3182CE' : '#C53030' }}>
                                    <Calculator size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        2. Balance Beam
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Solve algebraic equations with visual balance
                                    </p>
                                </div>
                            </div>
                        </div>
                        {unlockedActivities.includes('balance-beam') && (
                            <button
                                onClick={() => setShowBalanceBeam(true)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Launch
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Mission 3: Area Architect */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                        background: unlockedActivities.includes('area-architect') ? 'white' : '#F7FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        cursor: unlockedActivities.includes('area-architect') ? 'pointer' : 'not-allowed',
                        opacity: unlockedActivities.includes('area-architect') ? 1 : 0.7,
                        position: 'relative'
                    }}
                >
                    {!unlockedActivities.includes('area-architect') && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                background: '#FED7D7',
                                color: '#C53030',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}>
                                🔒 Locked
                            </span>
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('area-architect') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('area-architect') ? '#3182CE' : '#C53030' }}>
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        3. Area Architect
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Design landing pads with geometry
                                    </p>
                                </div>
                            </div>
                        </div>
                        {unlockedActivities.includes('area-architect') && (
                            <button
                                onClick={() => setShowAreaArchitect(true)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Launch
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', height: '100%' }}>
            {/* Header with Inventory - Always Visible */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Book size={18} color="#805AD5" /> Academic Zone
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#3182CE', fontWeight: '600' }}>
                        🏆 {explorerPoints} Points
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#3182CE', fontWeight: '600', cursor: 'pointer' }}>View All</div>
                </div>
            </div>

            {/* Inventory Display - Always Visible */}
            {inventory.length > 0 && (
                <div style={{ marginBottom: '1.5rem', padding: '0.75rem', background: '#F0FFF4', borderRadius: '8px', border: '1px solid #C6F6D5' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#22543D', marginBottom: '0.5rem' }}>🎒 Inventory</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {inventory.map((item, index) => (
                            <div key={index} style={{
                                padding: '0.25rem 0.5rem',
                                background: 'white',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                color: '#2D3748',
                                border: '1px solid #E2E8F0'
                            }}>
                                {item.icon} {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Conditional Content with Animations */}
            <AnimatePresence mode="wait">
                {activeSubject === null ? (
                    <motion.div
                        key="subjects-grid"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Subject Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <motion.div
                                whileHover={{ y: -2 }}
                                onClick={() => setActiveSubject('math')}
                                style={{
                                    background: 'white', 
                                    border: '1px solid #E2E8F0', 
                                    borderRadius: '10px',
                                    padding: '1rem', 
                                    cursor: 'pointer', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '0.75rem'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ padding: '0.5rem', background: '#EBF8FF', borderRadius: '8px', color: '#3182CE' }}>
                                            <Calculator size={18} />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#2D3748', fontSize: '0.9rem' }}>Mathematics</span>
                                    </div>
                                    <ArrowRight size={14} color="#A0AEC0" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: '#718096' }}>
                                        <span>Progress</span>
                                        <span>75%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#EDF2F7', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: '75%', height: '100%', background: '#3182CE', borderRadius: '2px' }} />
                                    </div>
                                </div>
                            </motion.div>

                            <SubjectModule title="Science" icon={Cpu} progress={60} color="#38A169" />
                            <SubjectModule title="Language Arts" icon={Book} progress={85} color="#D69E2E" />
                            <SubjectModule title="Logic & Reasoning" icon={Globe} progress={40} color="#805AD5" />
                        </div>

                        {/* Daily Challenge */}
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#F7FAFC', borderRadius: '10px', border: '1px solid #EDF2F7' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.5rem' }}>Daily Challenge 🧠</div>
                            <div style={{ fontSize: '0.8rem', color: '#4A5568', marginBottom: '0.5rem' }}>
                                "If a train leaves Station A at 60mph..."
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#3182CE', fontWeight: '600', cursor: 'pointer' }}>Solve Now &rarr;</div>
                        </div>
                    </motion.div>
                ) : activeSubject === 'math' ? (
                    <MathMissionHub key="math-hub" />
                ) : null}
            </AnimatePresence>

            {/* Fuel Mixer Modal */}
            <AnimatePresence>
                {showFuelMixer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => setShowFuelMixer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '1200px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowFuelMixer(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <X size={20} color="white" />
                            </button>
                            <FuelMixer 
                                onComplete={handleFuelMixerComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Balance Beam Modal */}
                {showBalanceBeam && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => setShowBalanceBeam(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '1200px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowBalanceBeam(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <X size={20} color="white" />
                            </button>
                            <BalanceBeam 
                                onComplete={handleBalanceBeamComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Area Architect Modal */}
                {showAreaArchitect && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => setShowAreaArchitect(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '1200px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowAreaArchitect(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <X size={20} color="white" />
                            </button>
                            <AreaArchitect 
                                onComplete={handleAreaArchitectComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AcademicZone;
