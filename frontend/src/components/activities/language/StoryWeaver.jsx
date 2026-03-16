import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PenTool, CheckCircle, AlertCircle, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StoryWeaver = ({ onComplete, onUnlockNext }) => {
    const [storyElements, setStoryElements] = useState({
        character: '',
        setting: '',
        conflict: '',
        resolution: ''
    });
    const [currentStory, setCurrentStory] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [targetWordCount] = useState(50);
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);
    const [isWriting, setIsWriting] = useState(false);

    const storyPrompts = {
        character: [
            "A brave space explorer",
            "A curious alien botanist", 
            "A wise old mathematician",
            "A young time traveler"
        ],
        setting: [
            "on a distant planet covered in crystal forests",
            "in an underwater research facility",
            "aboard a generation ship traveling to the stars",
            "in a library that exists between dimensions"
        ],
        conflict: [
            "discovers a mysterious signal from unknown origin",
            "must solve an impossible equation to save the crew",
            "finds a plant that can communicate through colors",
            "accidentally changes history and must fix it"
        ],
        resolution: [
            "uses their unique knowledge to decode the message",
            "discovers the equation represents a beautiful mathematical pattern",
            "learns the plant is trying to warn about cosmic danger",
            "works with their past self to restore the timeline"
        ]
    };

    const generateStoryPrompt = () => {
        const elements = {
            character: storyPrompts.character[Math.floor(Math.random() * storyPrompts.character.length)],
            setting: storyPrompts.setting[Math.floor(Math.random() * storyPrompts.setting.length)],
            conflict: storyPrompts.conflict[Math.floor(Math.random() * storyPrompts.conflict.length)],
            resolution: storyPrompts.resolution[Math.floor(Math.random() * storyPrompts.resolution.length)]
        };
        
        setStoryElements(elements);
        setCurrentStory('');
        setIsWriting(true);
    };

    const updateStoryElement = (element, value) => {
        setStoryElements(prev => ({
            ...prev,
            [element]: value
        }));
    };

    const generateStory = () => {
        if (!storyElements.character || !storyElements.setting || !storyElements.conflict || !storyElements.resolution) {
            return;
        }

        const story = `${storyElements.character} ${storyElements.setting}. One day, they ${storyElements.conflict}. In the end, ${storyElements.resolution}.`;
        setCurrentStory(story);
        setIsWriting(false);
        
        const words = story.split(' ').length;
        setWordCount(words);
        
        // Add to history
        setHistory(prev => [...prev.slice(-9), {
            attempt: attempts + 1,
            wordCount: words,
            target: targetWordCount,
            complete: words >= targetWordCount
        }]);
        setAttempts(prev => prev + 1);
    };

    useEffect(() => {
        if (wordCount >= targetWordCount && currentStory && !isWriting) {
            setShowSuccess(true);
            setTimeout(() => {
                onComplete?.();
                onUnlockNext?.('word-forge');
            }, 2000);
        }
    }, [wordCount, currentStory, isWriting]);

    const resetStory = () => {
        setStoryElements({
            character: '',
            setting: '',
            conflict: '',
            resolution: ''
        });
        setCurrentStory('');
        setWordCount(0);
        setShowSuccess(false);
        setIsWriting(false);
    };

    const getElementColor = (element) => {
        return storyElements[element] ? '#10B981' : '#4A5568';
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
                                color: '#667eea',
                                padding: '3rem',
                                borderRadius: '20px'
                            }}
                        >
                            <Trophy size={60} color="#FFD700" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                Story Complete!
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Perfect story: {wordCount} words
                            </p>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'inline-block',
                                fontWeight: 'bold'
                            }}>
                                +100 Explorer Points • Story Quill Unlocked
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <BookOpen size={32} color="#FCD34D" />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            The Story Weaver
                        </h2>
                        <p style={{ opacity: 0.9, margin: 0 }}>
                            Mission: Craft a compelling story using story elements
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left: Story Elements */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PenTool size={18} color="#FCD34D" />
                        Story Elements
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.keys(storyElements).map((element) => (
                            <motion.div
                                key={element}
                                whileHover={{ scale: 1.02 }}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: `2px solid ${getElementColor(element)}`,
                                    borderRadius: '12px'
                                }}
                            >
                                <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                                    {element}
                                </div>
                                {!isWriting ? (
                                    <textarea
                                        value={storyElements[element]}
                                        onChange={(e) => updateStoryElement(element, e.target.value)}
                                        placeholder={`Enter ${element}...`}
                                        style={{
                                            width: '100%',
                                            minHeight: '60px',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                            padding: '0.5rem',
                                            fontSize: '0.9rem',
                                            resize: 'vertical'
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        padding: '0.5rem',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        fontStyle: 'italic',
                                        opacity: 0.8
                                    }}>
                                        {storyElements[element] || `Generated ${element}...`}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={generateStoryPrompt}
                        disabled={isWriting}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: isWriting ? '#4A5568' : '#FCD34D',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: isWriting ? 'not-allowed' : 'pointer',
                            fontSize: '0.9rem',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Sparkles size={16} />
                        {isWriting ? 'Writing...' : 'Generate Prompt'}
                    </button>
                </div>

                {/* Center: Story Display */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Your Story
                    </h3>
                    
                    <div style={{
                        width: '100%',
                        minHeight: '300px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        position: 'relative'
                    }}>
                        {currentStory ? (
                            <div>
                                <div style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    {currentStory}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px'
                                }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                        Word Count: {wordCount}
                                    </span>
                                    <span style={{ 
                                        fontSize: '0.9rem', 
                                        fontWeight: '600',
                                        color: wordCount >= targetWordCount ? '#10B981' : '#F59E0B'
                                    }}>
                                        Target: {targetWordCount}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '200px',
                                opacity: 0.7
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <BookOpen size={40} style={{ margin: '0 auto 1rem' }} />
                                    <p style={{ fontSize: '0.9rem' }}>
                                        Generate story elements to begin writing
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {storyElements.character && storyElements.setting && storyElements.conflict && storyElements.resolution && (
                        <button
                            onClick={generateStory}
                            disabled={isWriting}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#10B981',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: isWriting ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                marginTop: '1rem'
                            }}
                        >
                            {isWriting ? 'Generating...' : 'Weave Story'}
                        </button>
                    )}
                </div>

                {/* Right: Performance Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Writing Progress
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
                                    dataKey="wordCount" 
                                    stroke="#FCD34D" 
                                    strokeWidth={2}
                                    dot={{ fill: '#FCD34D', r: 4 }}
                                    name="Word Count"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="target" 
                                    stroke="#10B981" 
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: '#10B981', r: 4 }}
                                    name="Target"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {wordCount >= targetWordCount && currentStory ? (
                            <>
                                <CheckCircle size={20} color="#10B981" />
                                <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                    Story complete!
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle size={20} color="#F59E0B" />
                                <span style={{ opacity: 0.8 }}>
                                    {currentStory ? 'Keep writing...' : 'Begin your story'}
                                </span>
                            </>
                        )}
                    </div>

                    <button
                        onClick={resetStory}
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
                        <RotateCcw size={16} /> New Story
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryWeaver;
