import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Square, Triangle, Grid3X3, Zap, CheckCircle, AlertCircle, Trophy, RotateCcw, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaArchitect = ({ onComplete, onUnlockNext }) => {
    const [gridSize] = useState({ width: 10, height: 8 });
    const [placedShapes, setPlacedShapes] = useState([]);
    const [selectedShape, setSelectedShape] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [targetArea] = useState(40);
    const [currentArea, setCurrentArea] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);

    // Available shapes with their areas
    const availableShapes = [
        { id: 'rect1', type: 'rectangle', width: 4, height: 5, color: '#60A5FA', area: 20 },
        { id: 'square1', type: 'rectangle', width: 2, height: 2, color: '#FCD34D', area: 4 },
        { id: 'triangle1', type: 'triangle', base: 4, height: 5, color: '#10B981', area: 10 },
        { id: 'rect2', type: 'rectangle', width: 3, height: 3, color: '#F59E0B', area: 9 },
        { id: 'triangle2', type: 'triangle', base: 6, height: 4, color: '#EF4444', area: 12 }
    ];

    // Calculate total area whenever shapes change
    useEffect(() => {
        const total = placedShapes.reduce((sum, shape) => sum + shape.area, 0);
        setCurrentArea(total);

        if (total === targetArea && placedShapes.length > 0) {
            setShowSuccess(true);
            setTimeout(() => {
                onComplete?.();
                onUnlockNext?.('chemical-catalyst');
            }, 2000);
        }

        // Add to history
        if (placedShapes.length > 0) {
            setHistory(prev => [...prev.slice(-9), {
                attempt: attempts + 1,
                shapes: placedShapes.length,
                area: total,
                perfect: total === targetArea
            }]);
            setAttempts(prev => prev + 1);
        }
    }, [placedShapes]);

    const handleShapeSelect = (shape) => {
        setSelectedShape(shape);
        setIsDragging(true);
    };

    const handleGridClick = (x, y) => {
        if (selectedShape && !isOverlapping(x, y, selectedShape)) {
            const newShape = {
                ...selectedShape,
                id: `${selectedShape.id}-${Date.now()}`,
                x,
                y,
                placed: true
            };
            setPlacedShapes(prev => [...prev, newShape]);
            setSelectedShape(null);
            setIsDragging(false);
        }
    };

    const isOverlapping = (x, y, shape) => {
        return placedShapes.some(placed => {
            const overlap = !(
                x + shape.width <= placed.x ||
                x >= placed.x + placed.width ||
                y + shape.height <= placed.y ||
                y >= placed.y + placed.height
            );
            return overlap;
        });
    };

    const removeShape = (shapeId) => {
        setPlacedShapes(prev => prev.filter(shape => shape.id !== shapeId));
    };

    const resetGrid = () => {
        setPlacedShapes([]);
        setSelectedShape(null);
        setIsDragging(false);
        setCurrentArea(0);
        setShowSuccess(false);
    };

    const renderShape = (shape, isPreview = false) => {
        if (shape.type === 'rectangle') {
            return (
                <motion.div
                    style={{
                        position: 'absolute',
                        left: `${shape.x * 40}px`,
                        top: `${shape.y * 40}px`,
                        width: `${shape.width * 40}px`,
                        height: `${shape.height * 40}px`,
                        background: shape.color,
                        border: isPreview ? '2px dashed white' : 'none',
                        opacity: isPreview ? 0.7 : 0.8,
                        borderRadius: '4px',
                        cursor: isPreview ? 'pointer' : 'move',
                        zIndex: isPreview ? 1000 : shape.placed ? 10 : 1
                    }}
                    whileHover={{ scale: isPreview ? 1.05 : 1.02 }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}>
                        {shape.area}
                    </div>
                </motion.div>
            );
        } else if (shape.type === 'triangle') {
            return (
                <motion.div
                    style={{
                        position: 'absolute',
                        left: `${shape.x * 40}px`,
                        top: `${shape.y * 40}px`,
                        width: 0,
                        height: 0,
                        borderLeft: `${shape.base * 20}px solid transparent`,
                        borderRight: `${shape.base * 20}px solid transparent`,
                        borderBottom: `${shape.height * 40}px solid ${shape.color}`,
                        opacity: isPreview ? 0.7 : 0.8,
                        cursor: isPreview ? 'pointer' : 'move',
                        zIndex: isPreview ? 1000 : shape.placed ? 10 : 1
                    }}
                    whileHover={{ scale: isPreview ? 1.05 : 1.02 }}
                >
                    <div style={{
                        position: 'absolute',
                        top: `${shape.height * 20}px`,
                        left: `-${shape.base * 20}px`,
                        width: `${shape.base * 40}px`,
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}>
                        {shape.area}
                    </div>
                </motion.div>
            );
        }
        return null;
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
                                Landing Pad Complete!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect area: {currentArea} square units
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +100 Explorer Points • Landing Pad Blueprint
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Grid3X3 size={32} color="#60A5FA" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Area Architect
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Design a landing pad with exactly {targetArea} square units
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Shape Palette */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Square size={18} color="#60A5FA" />
                        Shape Blocks
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {availableShapes.map(shape => (
                            <motion.div
                                key={shape.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleShapeSelect(shape)}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: shape.color,
                                    borderRadius: shape.type === 'rectangle' ? '4px' : '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem'
                                }}>
                                    {shape.type === 'triangle' ? '▲' : '■'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                        {shape.type === 'rectangle' ? `${shape.width}×${shape.height}` : `△ ${shape.base}×${shape.height}`}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                        Area: {shape.area} units²
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Center: Design Grid */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Grid3X3 size={18} color="#FCD34D" />
                        Landing Pad Blueprint
                    </h3>
                    
                    {/* Grid */}
                    <div style={{
                        width: `${gridSize.width * 40}px`,
                        height: `${gridSize.height * 40}px`,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        position: 'relative',
                        cursor: isDragging ? 'crosshair' : 'default'
                    }}>
                        {/* Grid Lines */}
                        {Array.from({ length: gridSize.height + 1 }).map((_, i) => (
                            <div
                                key={`h-${i}`}
                                style={{
                                    position: 'absolute',
                                    top: `${i * 40}px`,
                                    left: 0,
                                    right: 0,
                                    height: '1px',
                                    background: 'rgba(255, 255, 255, 0.1)'
                                }}
                            />
                        ))}
                        {Array.from({ length: gridSize.width + 1 }).map((_, i) => (
                            <div
                                key={`v-${i}`}
                                style={{
                                    position: 'absolute',
                                    left: `${i * 40}px`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    background: 'rgba(255, 255, 255, 0.1)'
                                }}
                            />
                        ))}

                        {/* Placed Shapes */}
                        {placedShapes.map(shape => (
                            <div key={shape.id}>
                                {renderShape(shape)}
                                <button
                                    onClick={() => removeShape(shape.id)}
                                    style={{
                                        position: 'absolute',
                                        top: `${shape.y * 40 - 10}px`,
                                        left: `${shape.x * 40 + (shape.width * 40) - 30}px`,
                                        width: '24px',
                                        height: '24px',
                                        background: '#EF4444',
                                        border: 'none',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 20
                                    }}
                                >
                                    <Trash2 size={12} color="white" />
                                </button>
                            </div>
                        ))}

                        {/* Preview Shape */}
                        {isDragging && selectedShape && (
                            <div
                                style={{
                                    position: 'absolute',
                                    pointerEvents: 'none'
                                }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.parentElement.getBoundingClientRect();
                                    const x = Math.floor((e.clientX - rect.left) / 40);
                                    const y = Math.floor((e.clientY - rect.top) / 40);
                                    // Update preview position
                                }}
                            >
                                {renderShape(selectedShape, true)}
                            </div>
                        )}

                        {/* Grid Click Handler */}
                        {Array.from({ length: gridSize.height }).map((_, y) =>
                            Array.from({ length: gridSize.width }).map((_, x) => (
                                <div
                                    key={`${x}-${y}`}
                                    onClick={() => handleGridClick(x, y)}
                                    style={{
                                        position: 'absolute',
                                        left: `${x * 40}px`,
                                        top: `${y * 40}px`,
                                        width: '40px',
                                        height: '40px',
                                        cursor: isDragging ? 'crosshair' : 'default'
                                    }}
                                />
                            ))
                        )}
                    </div>

                    {/* Area Counter */}
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1rem', fontWeight: '600' }}>Current Area</span>
                            <span style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold',
                                color: currentArea === targetArea ? '#10B981' : currentArea > targetArea ? '#EF4444' : '#F59E0B'
                            }}>
                                {currentArea}
                            </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            Target: {targetArea} square units
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
                                    background: currentArea === targetArea ? '#10B981' : currentArea > targetArea ? '#EF4444' : '#F59E0B',
                                    borderRadius: '4px'
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min(100, (currentArea / targetArea) * 100)}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <button
                            onClick={resetGrid}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <RotateCcw size={16} /> Reset
                        </button>
                    </div>
                </div>

                {/* Right: Performance Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Design History
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
                                        background: 'rgba(30, 60, 114, 0.9)', 
                                        border: 'none', 
                                        borderRadius: '8px' 
                                    }}
                                />
                                <Bar 
                                    dataKey="area" 
                                    fill="#60A5FA"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {currentArea === targetArea ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Perfect area achieved!
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} color="#F59E0B" />
                                <span style={{ opacity: 0.8 }}>
                                    {currentArea > targetArea ? 'Too large!' : 'Keep building...'}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreaArchitect;
