import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Calculator, Cpu, Globe, ArrowRight, X, Beaker, CircuitBoard, FlaskConical, Magnet, BookOpen, Type, Brain, Code, Navigation, Triangle } from 'lucide-react';
import FuelMixer from '../../activities/math/FuelMixer';
import BalanceBeam from '../../activities/math/BalanceBeam';
import AreaArchitect from '../../activities/math/AreaArchitect';
import PowerGrid from '../../activities/science/PowerGrid';
import ChemicalCatalyst from '../../activities/science/ChemicalCatalyst';
import ForceFieldGenerator from '../../activities/science/ForceFieldGenerator';
import StoryWeaver from '../../activities/language/StoryWeaver';
import WordForge from '../../activities/language/WordForge';
import LogicBridge from '../../activities/language/LogicBridge';
import FormalFlyer from '../../activities/language/FormalFlyer';
import TenseTransformer from '../../activities/language/TenseTransformer';
import WordRootTree from '../../activities/language/WordRootTree';
import PatternCode from '../../activities/logic/PatternCode';
import DirectionDetective from '../../activities/logic/DirectionDetective';
import NumberPyramid from '../../activities/logic/NumberPyramid';
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
    const [showPowerGrid, setShowPowerGrid] = useState(false);
    const [showChemicalCatalyst, setShowChemicalCatalyst] = useState(false);
    const [showForceField, setShowForceField] = useState(false);
    const [showStoryWeaver, setShowStoryWeaver] = useState(false);
    const [showWordForge, setShowWordForge] = useState(false);
    const [showLogicBridge, setShowLogicBridge] = useState(false);
    const [showFormalFlyer, setShowFormalFlyer] = useState(false);
    const [showTenseTransformer, setShowTenseTransformer] = useState(false);
    const [showWordRootTree, setShowWordRootTree] = useState(false);
    const [showPatternCode, setShowPatternCode] = useState(false);
    const [showDirectionDetective, setShowDirectionDetective] = useState(false);
    const [showNumberPyramid, setShowNumberPyramid] = useState(false);
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

    const handlePowerGridComplete = () => {
        const reward = {
            item: { id: 'circuit-board', name: 'Circuit Board', icon: '🔌', rarity: 'rare' },
            points: 75,
            unlocksNext: 'chemical-catalyst'
        };
        completeActivity('power-grid', reward);
        console.log('Power Grid completed! +75 Explorer Points, Circuit Board added to inventory');
    };

    const handleChemicalCatalystComplete = () => {
        const reward = {
            item: { id: 'catalyst', name: 'Chemical Catalyst', icon: '⚗️', rarity: 'epic' },
            points: 100,
            unlocksNext: 'force-field-generator'
        };
        completeActivity('chemical-catalyst', reward);
        console.log('Chemical Catalyst completed! +100 Explorer Points, Catalyst added to inventory');
    };

    const handleForceFieldComplete = () => {
        const reward = {
            item: { id: 'force-field', name: 'Force Field Generator', icon: '🛡️', rarity: 'legendary' },
            points: 125,
            unlocksNext: 'story-weaver'
        };
        completeActivity('force-field-generator', reward);
        console.log('Force Field Generator completed! +125 Explorer Points, Force Field Generator added to inventory');
    };

    const handleStoryWeaverComplete = () => {
        const reward = {
            item: { id: 'story-quill', name: 'Story Quill', icon: '🪶', rarity: 'epic' },
            points: 100,
            unlocksNext: 'word-forge'
        };
        completeActivity('story-weaver', reward);
        console.log('Story Weaver completed! +100 Explorer Points, Story Quill added to inventory');
    };

    const handleWordForgeComplete = () => {
        const reward = {
            item: { id: 'word-hammer', name: 'Word Hammer', icon: '🔨', rarity: 'rare' },
            points: 75,
            unlocksNext: 'logic-bridge'
        };
        completeActivity('word-forge', reward);
        console.log('Word Forge completed! +75 Explorer Points, Word Hammer added to inventory');
    };

    const handleLogicBridgeComplete = () => {
        const reward = {
            item: { id: 'logic-key', name: 'Logic Key', icon: '🗝️', rarity: 'legendary' },
            points: 150,
            unlocksNext: 'pattern-master'
        };
        completeActivity('logic-bridge', reward);
        console.log('Logic Bridge completed! +150 Explorer Points, Logic Key added to inventory');
    };

    const handleFormalFlyerComplete = () => {
        const reward = {
            item: { id: 'formal-pen', name: 'Formal Pen', icon: '🖋️', rarity: 'epic' },
            points: 100,
            unlocksNext: 'tense-transformer'
        };
        completeActivity('formal-flyer', reward);
        console.log('Formal Flyer completed! +100 Explorer Points, Formal Pen added to inventory');
    };

    const handleTenseTransformerComplete = () => {
        const reward = {
            item: { id: 'time-clock', name: 'Time Clock', icon: '⏰', rarity: 'rare' },
            points: 100,
            unlocksNext: 'word-root-tree'
        };
        completeActivity('tense-transformer', reward);
        console.log('Tense Transformer completed! +100 Explorer Points, Time Clock added to inventory');
    };

    const handleWordRootTreeComplete = () => {
        const reward = {
            item: { id: 'vocabulary-seed', name: 'Vocabulary Seed', icon: '🌱', rarity: 'legendary' },
            points: 100,
            unlocksNext: 'pattern-code'
        };
        completeActivity('word-root-tree', reward);
        console.log('Word Root Tree completed! +100 Explorer Points, Vocabulary Seed added to inventory');
    };

    const handlePatternCodeComplete = () => {
        const reward = {
            item: { id: 'codebreaker-badge', name: 'Codebreaker Badge', icon: '🏷️', rarity: 'epic' },
            points: 100,
            unlocksNext: 'direction-detective'
        };
        completeActivity('pattern-code', reward);
        console.log('Pattern Code completed! +100 Explorer Points, Codebreaker Badge added to inventory');
    };

    const handleDirectionDetectiveComplete = () => {
        const reward = {
            item: { id: 'master-navigator', name: 'Master Navigator', icon: '🧭', rarity: 'rare' },
            points: 100,
            unlocksNext: 'number-pyramid'
        };
        completeActivity('direction-detective', reward);
        console.log('Direction Detective completed! +100 Explorer Points, Master Navigator added to inventory');
    };

    const handleNumberPyramidComplete = () => {
        const reward = {
            item: { id: 'pyramid-master', name: 'Pyramid Master', icon: '🔺', rarity: 'legendary' },
            points: 100,
            unlocksNext: 'pattern-master'
        };
        completeActivity('number-pyramid', reward);
        console.log('Number Pyramid completed! +100 Explorer Points, Pyramid Master added to inventory');
    };

    const handleUnlockNext = (nextActivity) => {
        unlockActivity(nextActivity);
        console.log(`Unlocked: ${nextActivity}`);
    };

    const ScienceMissionHub = () => (
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
                    Science Missions
                </h3>

                {/* Mission 1: Power Grid */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('power-grid') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('power-grid') ? '#3182CE' : '#C53030' }}>
                                    <CircuitBoard size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        1. Power Grid
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Master Ohm's Law to power the station
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowPowerGrid(true)}
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

                {/* Mission 2: Chemical Catalyst */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('chemical-catalyst') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('chemical-catalyst') ? '#3182CE' : '#C53030' }}>
                                    <FlaskConical size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        2. Chemical Catalyst
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Create water molecules with chemical reactions
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowChemicalCatalyst(true)}
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

                {/* Mission 3: Force Field Generator */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('force-field-generator') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('force-field-generator') ? '#3182CE' : '#C53030' }}>
                                    <Magnet size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        3. Force Field Generator
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Balance forces to achieve equilibrium
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowForceField(true)}
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
            </div>
        </motion.div>
    );

    const LanguageMissionHub = () => (
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
                    Language Arts Missions
                </h3>

                {/* Mission 1: Formal Flyer */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('formal-flyer') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('formal-flyer') ? '#3182CE' : '#C53030' }}>
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        1. The Formal Flyer
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Write a polite formal letter to your Principal
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowFormalFlyer(true)}
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

                {/* Mission 2: Tense Transformer */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('tense-transformer') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('tense-transformer') ? '#3182CE' : '#C53030' }}>
                                    <Type size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        2. The Tense Transformer
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Fix History Robot's tense mistakes
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowTenseTransformer(true)}
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

                {/* Mission 3: Word Root Tree */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('word-root-tree') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('word-root-tree') ? '#3182CE' : '#C53030' }}>
                                    <Brain size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        3. The Word-Root Tree
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Grow words with prefixes and suffixes
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowWordRootTree(true)}
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
            </div>
        </motion.div>
    );

    const LogicMissionHub = () => (
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
                    Logic & Reasoning Missions
                </h3>

                {/* Mission 1: Pattern Code */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('pattern-code') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('pattern-code') ? '#3182CE' : '#C53030' }}>
                                    <Code size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        1. The Pattern Code
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Decode enemy's scrambled transmission
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowPatternCode(true)}
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

                {/* Mission 2: Direction Detective */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('direction-detective') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('direction-detective') ? '#3182CE' : '#C53030' }}>
                                    <Navigation size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        2. The Direction Detective
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Navigate map to find your lost friend
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowDirectionDetective(true)}
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

                {/* Mission 3: Number Pyramid */}
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
                                <div style={{ padding: '0.5rem', background: unlockedActivities.includes('number-pyramid') ? '#EBF8FF' : '#FED7D7', borderRadius: '8px', color: unlockedActivities.includes('number-pyramid') ? '#3182CE' : '#C53030' }}>
                                    <Triangle size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', margin: 0 }}>
                                        3. The Number Pyramid
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: '#718096', margin: '0.25rem 0' }}>
                                        Solve ancient pyramid mathematical puzzle
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowNumberPyramid(true)}
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
            </div>
        </motion.div>
    );

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

                {/* Mission 1: Balance Beam */}
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
                    </div>
                </motion.div>

                {/* Mission 2: Area Architect */}
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

                            <motion.div
                                whileHover={{ y: -2 }}
                                onClick={() => setActiveSubject('science')}
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
                                        <div style={{ padding: '0.5rem', background: '#C6F6D5', borderRadius: '8px', color: '#38A169' }}>
                                            <Cpu size={18} />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#2D3748', fontSize: '0.9rem' }}>Science</span>
                                    </div>
                                    <ArrowRight size={14} color="#A0AEC0" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: '#718096' }}>
                                        <span>Progress</span>
                                        <span>60%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#EDF2F7', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: '60%', height: '100%', background: '#38A169', borderRadius: '2px' }} />
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -2 }}
                                onClick={() => setActiveSubject('language')}
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
                                        <div style={{ padding: '0.5rem', background: '#FEF3C7', borderRadius: '8px', color: '#D69E2E' }}>
                                            <Book size={18} />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#2D3748', fontSize: '0.9rem' }}>Language Arts</span>
                                    </div>
                                    <ArrowRight size={14} color="#A0AEC0" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: '#718096' }}>
                                        <span>Progress</span>
                                        <span>85%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#EDF2F7', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: '85%', height: '100%', background: '#D69E2E', borderRadius: '2px' }} />
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -2 }}
                                onClick={() => setActiveSubject('logic')}
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
                                        <div style={{ padding: '0.5rem', background: '#F3E8FF', borderRadius: '8px', color: '#805AD5' }}>
                                            <Brain size={18} />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#2D3748', fontSize: '0.9rem' }}>Logic & Reasoning</span>
                                    </div>
                                    <ArrowRight size={14} color="#A0AEC0" />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: '#718096' }}>
                                        <span>Progress</span>
                                        <span>40%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#EDF2F7', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: '40%', height: '100%', background: '#805AD5', borderRadius: '2px' }} />
                                    </div>
                                </div>
                            </motion.div>
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
                ) : activeSubject === 'science' ? (
                    <ScienceMissionHub key="science-hub" />
                ) : activeSubject === 'language' ? (
                    <LanguageMissionHub key="language-hub" />
                ) : activeSubject === 'logic' ? (
                    <LogicMissionHub key="logic-hub" />
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

                {/* Power Grid Modal */}
                {showPowerGrid && (
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
                        onClick={() => setShowPowerGrid(false)}
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
                                onClick={() => setShowPowerGrid(false)}
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
                            <PowerGrid 
                                onComplete={handlePowerGridComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Chemical Catalyst Modal */}
                {showChemicalCatalyst && (
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
                        onClick={() => setShowChemicalCatalyst(false)}
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
                                onClick={() => setShowChemicalCatalyst(false)}
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
                            <ChemicalCatalyst 
                                onComplete={handleChemicalCatalystComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Force Field Generator Modal */}
                {showForceField && (
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
                        onClick={() => setShowForceField(false)}
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
                                onClick={() => setShowForceField(false)}
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
                            <ForceFieldGenerator 
                                onComplete={handleForceFieldComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Story Weaver Modal */}
                {showStoryWeaver && (
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
                        onClick={() => setShowStoryWeaver(false)}
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
                                onClick={() => setShowStoryWeaver(false)}
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
                            <StoryWeaver 
                                onComplete={handleStoryWeaverComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Word Forge Modal */}
                {showWordForge && (
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
                        onClick={() => setShowWordForge(false)}
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
                                onClick={() => setShowWordForge(false)}
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
                            <WordForge 
                                onComplete={handleWordForgeComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Logic Bridge Modal */}
                {showLogicBridge && (
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
                        onClick={() => setShowLogicBridge(false)}
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
                                onClick={() => setShowLogicBridge(false)}
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
                            <LogicBridge 
                                onComplete={handleLogicBridgeComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Formal Flyer Modal */}
                {showFormalFlyer && (
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
                        onClick={() => setShowFormalFlyer(false)}
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
                                onClick={() => setShowFormalFlyer(false)}
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
                            <FormalFlyer 
                                onComplete={handleFormalFlyerComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Tense Transformer Modal */}
                {showTenseTransformer && (
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
                        onClick={() => setShowTenseTransformer(false)}
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
                                onClick={() => setShowTenseTransformer(false)}
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
                            <TenseTransformer 
                                onComplete={handleTenseTransformerComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Word Root Tree Modal */}
                {showWordRootTree && (
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
                        onClick={() => setShowWordRootTree(false)}
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
                                onClick={() => setShowWordRootTree(false)}
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
                            <WordRootTree 
                                onComplete={handleWordRootTreeComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Pattern Code Modal */}
                {showPatternCode && (
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
                        onClick={() => setShowPatternCode(false)}
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
                                onClick={() => setShowPatternCode(false)}
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
                            <PatternCode 
                                onComplete={handlePatternCodeComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Direction Detective Modal */}
                {showDirectionDetective && (
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
                        onClick={() => setShowDirectionDetective(false)}
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
                                onClick={() => setShowDirectionDetective(false)}
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
                            <DirectionDetective 
                                onComplete={handleDirectionDetectiveComplete}
                                onUnlockNext={handleUnlockNext}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Number Pyramid Modal */}
                {showNumberPyramid && (
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
                        onClick={() => setShowNumberPyramid(false)}
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
                                onClick={() => setShowNumberPyramid(false)}
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
                            <NumberPyramid 
                                onComplete={handleNumberPyramidComplete}
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
