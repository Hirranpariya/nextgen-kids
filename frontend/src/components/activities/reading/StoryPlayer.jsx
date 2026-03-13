import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import Button from '../../ui/Button';
import StoryQuiz from './StoryQuiz';

const StoryPlayer = ({ story, onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            setIsPlaying(false);
            setCompleted(true);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleRestart = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
        setCurrentTime(0);
        setCompleted(false);
        setShowQuiz(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (showQuiz) {
        return <StoryQuiz story={story} onBack={() => setShowQuiz(false)} onRestart={handleRestart} />;
    }

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Button variant="ghost" onClick={onBack}>
                    <ArrowLeft size={16} />
                </Button>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748' }}>
                        {story.title}
                    </h2>
                    <p style={{ color: '#718096', fontSize: '0.9rem' }}>{story.description}</p>
                </div>
            </div>

            {/* Audio Player */}
            <div style={{ marginBottom: '2rem' }}>
                <audio ref={audioRef} src={story.audioUrl} preload="metadata" />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button
                        onClick={togglePlay}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: '#DD6B20',
                            border: 'none',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1.5rem'
                        }}
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    <div style={{ flex: 1 }}>
                        <div style={{
                            width: '100%',
                            height: '6px',
                            background: '#EDF2F7',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                                height: '100%',
                                background: '#DD6B20',
                                borderRadius: '3px'
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#718096' }}>
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleRestart}
                        style={{
                            padding: '0.5rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: '#EDF2F7',
                            color: '#4A5568',
                            cursor: 'pointer'
                        }}
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Story Text */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2D3748', marginBottom: '1rem' }}>
                    Story Text
                </h3>
                <div style={{
                    background: '#F7FAFC',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    lineHeight: '1.6',
                    color: '#2D3748'
                }}>
                    {story.text}
                </div>
            </div>

            {/* Completion Actions */}
            {completed && (
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        background: '#C6F6D5',
                        color: '#22543D',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        fontWeight: '600'
                    }}>
                        🎉 Story Complete! Ready for the quiz?
                    </div>
                    <Button onClick={() => setShowQuiz(true)} style={{ background: '#38A169', color: 'white' }}>
                        Take Quiz
                    </Button>
                </div>
            )}
        </div>
    );
};

export default StoryPlayer;