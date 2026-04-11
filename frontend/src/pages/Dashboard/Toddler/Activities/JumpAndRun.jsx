import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Timer, Play } from 'lucide-react';

const ACTIVITIES = [
    { id: 'warmup', title: "Warm Up!", instruction: "Stretch your arms up high!", duration: 8, speak: "Warm up! Stretch your arms up high!" },
    { id: 'jump', title: "Jump!", instruction: "Jump with the bunny!", duration: 10, speak: "Jump! Jump! Jump!" },
    { id: 'clap', title: "Clap Hands", instruction: "Clap your hands together!", duration: 8, speak: "Clap your hands! Great job!" },
    { id: 'spin', title: "Spin Around", instruction: "Spin like a top!", duration: 10, speak: "Spin around! Wheee!" },
    { id: 'touchToes', title: "Touch Toes", instruction: "Reach down to your toes!", duration: 8, speak: "Touch your toes! Reach down!" },
    { id: 'march', title: "March", instruction: "March in place!", duration: 10, speak: "March in place! Left, right, left, right!" },
    { id: 'wiggle', title: "Wiggle", instruction: "Wiggle your whole body!", duration: 8, speak: "Wiggle wiggle wiggle!" },
    { id: 'hop', title: "Hop", instruction: "Hop like a bunny!", duration: 10, speak: "Hop, hop, hop!" }
];

const TRANSITION_MESSAGES = ["Great Job!", "Awesome!", "You're Doing Great!", "Fantastic!", "Yay!"];

const KawaiiBunnyMascot = ({ activity, isPlaying }) => {
    // Exaggerated animations for the Premium Kawaii look
    const getBodyAnim = () => {
        if (!isPlaying) return { y: [0, 8, 0], scaleY: [1, 0.98, 1], transition: { duration: 2, repeat: Infinity } };
        switch (activity) {
            case 'jump': return { y: [0, -120, 0], scaleY: [1, 1.15, 0.85, 1], transition: { duration: 0.8, repeat: Infinity } };
            case 'hop': return { y: [0, -50, 0], scaleY: [1, 1.05, 0.95, 1], transition: { duration: 0.4, repeat: Infinity } };
            case 'spin': return { rotateY: [0, 360], transition: { duration: 1.2, repeat: Infinity, ease: 'linear' } };
            case 'wiggle': return { rotate: [-15, 15, -15], x: [-15, 15, -15], transition: { duration: 0.4, repeat: Infinity } };
            case 'touchToes': return { y: [0, 40, 0], scaleY: [1, 0.8, 1], transition: { duration: 1.5, repeat: Infinity } };
            case 'warmup': return { scaleY: [1, 1.1, 1], y: [0, -15, 0], transition: { duration: 2, repeat: Infinity } };
            case 'march': return { y: [-15, 0, -15, 0], rotate: [-8, 8, -8, 8], transition: { duration: 1, repeat: Infinity } };
            case 'clap': return { y: [0, -15, 0], transition: { duration: 0.5, repeat: Infinity } };
            default: return { y: [0, 8, 0], scaleY: [1, 0.98, 1], transition: { duration: 2, repeat: Infinity } };
        }
    };

    const getArmLAnim = () => {
        if (!isPlaying) return { rotate: [0, 15, 0], transition: { duration: 2, repeat: Infinity } };
        switch (activity) {
            case 'warmup': return { rotate: [-160, -170, -160], transition: { duration: 2, repeat: Infinity } };
            case 'jump': return { rotate: [-130, -160, -130], transition: { duration: 0.8, repeat: Infinity } };
            case 'clap': return { rotate: [-50, -10, -50], x: [0, 30, 0], transition: { duration: 0.5, repeat: Infinity } };
            case 'touchToes': return { rotate: [-50, -30, -50], y: [0, 40, 0], transition: { duration: 1.5, repeat: Infinity } };
            case 'march': return { rotate: [50, -50, 50], transition: { duration: 1, repeat: Infinity } };
            default: return { rotate: [0, -30, 0], transition: { duration: 1, repeat: Infinity } };
        }
    };

    const getArmRAnim = () => {
        if (!isPlaying) return { rotate: [0, -15, 0], transition: { duration: 2, repeat: Infinity } };
        switch (activity) {
            case 'warmup': return { rotate: [160, 170, 160], transition: { duration: 2, repeat: Infinity } };
            case 'jump': return { rotate: [130, 160, 130], transition: { duration: 0.8, repeat: Infinity } };
            case 'clap': return { rotate: [50, 10, 50], x: [0, -30, 0], transition: { duration: 0.5, repeat: Infinity } };
            case 'touchToes': return { rotate: [50, 30, 50], y: [0, 40, 0], transition: { duration: 1.5, repeat: Infinity } };
            case 'march': return { rotate: [-50, 50, -50], transition: { duration: 1, repeat: Infinity } };
            default: return { rotate: [0, 30, 0], transition: { duration: 1, repeat: Infinity } };
        }
    };

    const getLegLAnim = () => {
        if (!isPlaying) return {};
        switch (activity) {
            case 'march': return { y: [-30, 0, -30], transition: { duration: 1, repeat: Infinity } };
            case 'hop': return { y: [-15, 0, -15], transition: { duration: 0.4, repeat: Infinity } };
            case 'jump': return { y: [-30, 0, -30], transition: { duration: 0.8, repeat: Infinity } };
            default: return {};
        }
    };

    const getLegRAnim = () => {
        if (!isPlaying) return {};
        switch (activity) {
            case 'march': return { y: [0, -30, 0], transition: { duration: 1, repeat: Infinity } };
            case 'hop': return { y: [-15, 0, -15], transition: { duration: 0.4, repeat: Infinity } };
            case 'jump': return { y: [-30, 0, -30], transition: { duration: 0.8, repeat: Infinity } };
            default: return {};
        }
    };

    return (
        <motion.div animate={getBodyAnim()} style={{ position: 'relative', width: '280px', height: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', transformOrigin: 'bottom', zIndex: 20 }}>
            <svg viewBox="0 0 200 300" style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.2))' }}>
                {/* Left Ear - Huge and Floppy */}
                <motion.g animate={isPlaying ? { rotate: [-8, 8, -8] } : { y: [0, 2, 0] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ transformOrigin: '70px 110px' }}>
                    <path d="M 70 110 Q 30 -10 60 10 Q 90 30 85 90" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
                    <path d="M 70 95 Q 45 10 60 20 Q 75 30 75 80" fill="#FBCFE8" />
                </motion.g>

                {/* Right Ear - Huge and Floppy */}
                <motion.g animate={isPlaying ? { rotate: [8, -8, 8] } : { y: [0, 2, 0] }} transition={{ duration: 0.9, repeat: Infinity }} style={{ transformOrigin: '130px 110px' }}>
                    <path d="M 130 110 Q 170 -10 140 10 Q 110 30 115 90" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
                    <path d="M 130 95 Q 155 10 140 20 Q 125 30 125 80" fill="#FBCFE8" />
                </motion.g>

                {/* Arms (Behind Body) */}
                <motion.g animate={getArmLAnim()} style={{ transformOrigin: '65px 180px' }}>
                    <rect x="20" y="170" width="55" height="28" rx="14" fill="#FFFFFF" transform="rotate(45 65 180)" stroke="#F1F5F9" strokeWidth="2" />
                    <circle cx="28" cy="184" r="14" fill="#FBCFE8" opacity="0.4" transform="rotate(45 65 180)" />
                </motion.g>

                <motion.g animate={getArmRAnim()} style={{ transformOrigin: '135px 180px' }}>
                    <rect x="125" y="170" width="55" height="28" rx="14" fill="#FFFFFF" transform="rotate(-45 135 180)" stroke="#F1F5F9" strokeWidth="2" />
                    <circle cx="172" cy="184" r="14" fill="#FBCFE8" opacity="0.4" transform="rotate(-45 135 180)" />
                </motion.g>

                {/* Chibi Body (Small, round) */}
                <ellipse cx="100" cy="210" rx="50" ry="55" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
                <ellipse cx="100" cy="220" rx="35" ry="40" fill="#FDF4FF" />

                {/* Legs */}
                <motion.g animate={getLegLAnim()}>
                    <rect x="65" y="245" width="32" height="40" rx="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
                    <ellipse cx="81" cy="285" rx="26" ry="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
                    <circle cx="81" cy="285" r="10" fill="#FBCFE8" opacity="0.5" />
                </motion.g>

                <motion.g animate={getLegRAnim()}>
                    <rect x="103" y="245" width="32" height="40" rx="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
                    <ellipse cx="119" cy="285" rx="26" ry="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
                    <circle cx="119" cy="285" r="10" fill="#FBCFE8" opacity="0.5" />
                </motion.g>

                {/* Massive Kawaii Head */}
                <ellipse cx="100" cy="120" rx="75" ry="60" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="3" />

                {/* Huge Shiny Eyes */}
                <ellipse cx="70" cy="115" rx="14" ry="22" fill="#1E293B" />
                <ellipse cx="130" cy="115" rx="14" ry="22" fill="#1E293B" />
                {/* Eye Highlights */}
                <circle cx="67" cy="105" r="6" fill="#FFFFFF" />
                <circle cx="127" cy="105" r="6" fill="#FFFFFF" />
                <circle cx="74" cy="120" r="3" fill="#FFFFFF" />
                <circle cx="134" cy="120" r="3" fill="#FFFFFF" />

                {/* Rosy Cheeks */}
                <ellipse cx="45" cy="135" rx="14" ry="8" fill="#FBCFE8" opacity="0.6" />
                <ellipse cx="155" cy="135" rx="14" ry="8" fill="#FBCFE8" opacity="0.6" />

                {/* Cute 'w' Mouth */}
                <path d="M 90 130 Q 95 140 100 130 Q 105 140 110 130" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* Tiny Nose */}
                <ellipse cx="100" cy="125" rx="3" ry="2" fill="#F472B6" />
            </svg>
        </motion.div>
    );
};

const SquishyBackground = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, #87CEEB, #E9D5FF, #FEF08A)' }}>
        {/* Soft radial overlay for depth */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.4) 100%)' }} />
        {/* Animated Polka Dots */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, #fff 6px, transparent 6px)', backgroundSize: '60px 60px' }} />
    </div>
);

const Confetti = () => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 0 }}
                animate={{
                    opacity: [1, 1, 0],
                    y: -100 + Math.random() * 600,
                    x: -300 + Math.random() * 600,
                    rotate: Math.random() * 720,
                    scale: 1 + Math.random() * 0.5
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ position: 'absolute', fontSize: '3rem' }}
            >
                {['⭐', '✨', '🎈', '🎉', '🌟'][i % 5]}
            </motion.div>
        ))}
    </div>
);

const JumpAndRun = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isTransition, setIsTransition] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [transMsg, setTransMsg] = useState("");

    const speakInstruction = (text) => {
        if (!soundEnabled) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.3;
            window.speechSynthesis.speak(utterance);
        }
    };

    const playCheerSound = () => {
        if (!soundEnabled) return;
        try {
            const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/trumpet_success.ogg");
            audio.volume = 0.5;
            audio.play().catch(() => { });
        } catch (e) { }
    };

    useEffect(() => {
        let timer;
        if (isActive && !isTransition && !isFinished) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleTransition();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isActive, isTransition, isFinished, currentIndex, soundEnabled]);

    const handleTransition = () => {
        setIsTransition(true);
        setTransMsg(TRANSITION_MESSAGES[Math.floor(Math.random() * TRANSITION_MESSAGES.length)]);
        playCheerSound();

        setTimeout(() => {
            const nextIdx = currentIndex + 1;
            if (nextIdx >= ACTIVITIES.length) {
                setIsActive(false);
                setIsFinished(true);
                if (soundEnabled) speakInstruction("Workout complete! You are amazing!");
                return;
            }
            setCurrentIndex(nextIdx);
            setTimeLeft(ACTIVITIES[nextIdx].duration);
            setIsTransition(false);
            speakInstruction(ACTIVITIES[nextIdx].speak);
        }, 3000);
    };

    const startGame = () => {
        setIsActive(true);
        setIsFinished(false);
        setCurrentIndex(0);
        setTimeLeft(ACTIVITIES[0].duration);
        setIsTransition(false);
        speakInstruction(ACTIVITIES[0].speak);
    };

    const toggleSound = () => {
        if (soundEnabled && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setSoundEnabled(!soundEnabled);
    };

    const currentActivity = currentIndex >= 0 && currentIndex < ACTIVITIES.length ? ACTIVITIES[currentIndex] : null;

    return (
        <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Nunito, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', overflow: 'hidden' }}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&display=swap');
                .text-cartoon {
                    color: white;
                    text-shadow: -3px -3px 0 #1E293B, 3px -3px 0 #1E293B, -3px 3px 0 #1E293B, 3px 3px 0 #1E293B, 0px 6px 0 rgba(0,0,0,0.2);
                }
                .text-cartoon-pink {
                    color: #F43F5E;
                    text-shadow: -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 3px 3px 0 #FFFFFF, 0px 6px 0 rgba(0,0,0,0.15);
                }
                .btn-squishy {
                    border: 4px solid #FFFFFF;
                    box-shadow: 0 8px 0 0 rgba(0,0,0,0.1), 0 15px 20px rgba(0,0,0,0.15);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    background-color: white;
                }
                .btn-squishy:active {
                    transform: translateY(6px);
                    box-shadow: 0 2px 0 0 rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.1);
                }
                .pill-squishy {
                    border: 4px solid #FFFFFF;
                    box-shadow: 0 6px 0 0 rgba(0,0,0,0.08);
                    background-color: white;
                }
                `}
            </style>

            <SquishyBackground />

            {/* Header */}
            <div style={{ width: '100%', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', zIndex: 40, position: 'sticky', top: 0 }}>
                <BackButton to="/dashboard/toddler" theme="toddler" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
                    <button onClick={toggleSound} className="btn-squishy" style={{ padding: '1rem', borderRadius: '50%', color: '#334155' }}>
                        {soundEnabled ? <Volume2 size={32} strokeWidth={3} /> : <VolumeX size={32} strokeWidth={3} color="#f43f5e" />}
                    </button>
                    {(isActive && !isTransition) && (
                        <div className="pill-squishy" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', borderRadius: '9999px' }}>
                            <Timer size={28} color="#f43f5e" strokeWidth={3} />
                            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#1e293b' }}>{timeLeft}s</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Interactive Stage */}
            <div style={{ flex: 1, width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', zIndex: 20, position: 'relative', paddingBottom: '4rem' }}>
                <AnimatePresence mode="wait">
                    {!isActive && !isFinished && (
                        <motion.div
                            key="start"
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', padding: '3.5rem', borderRadius: '3rem', textAlign: 'center', border: '8px solid white', boxShadow: '0 20px 0 0 rgba(255,255,255,0.4), 0 30px 50px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '95%', maxWidth: '600px' }}
                        >
                            <h1 className="text-cartoon-pink" style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '0.025em', lineHeight: 1.1, margin: 0 }}>Ready to Move?</h1>
                            <p style={{ fontSize: '2.25rem', fontWeight: 900, color: '#334155', margin: 0 }}>Let's follow the bunny!</p>

                            <div style={{ position: 'relative', width: '320px', height: '320px', margin: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', top: '2rem', transform: 'scale(0.9)', transformOrigin: 'bottom' }}>
                                    <KawaiiBunnyMascot activity="idle" isPlaying={false} />
                                </div>
                            </div>

                            <button onClick={startGame} className="btn-squishy" style={{ backgroundColor: '#4ADE80', color: 'white', padding: '1.5rem 3.5rem', borderRadius: '9999px', fontSize: '3rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '1rem', outline: 'none' }}>
                                <Play size={44} fill="currentColor" /> START
                            </button>
                        </motion.div>
                    )}

                    {isFinished && (
                        <motion.div
                            key="finished"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', padding: '3.5rem', borderRadius: '3rem', textAlign: 'center', border: '8px solid white', boxShadow: '0 20px 0 0 rgba(255,255,255,0.4), 0 30px 50px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '95%', maxWidth: '600px' }}
                        >
                            <motion.span animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }} style={{ fontSize: '8rem', display: 'inline-block', filter: 'drop-shadow(0 10px 8px rgba(0,0,0,0.1))' }}>
                                🏆
                            </motion.span>
                            <h1 className="text-cartoon-pink" style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>Workout Complete!</h1>
                            <p style={{ fontSize: '2.25rem', fontWeight: 900, color: '#334155', margin: 0 }}>You did such a wonderful job!</p>
                            <button onClick={startGame} className="btn-squishy" style={{ backgroundColor: '#38BDF8', color: 'white', padding: '1.5rem 3rem', marginTop: '1rem', borderRadius: '9999px', fontSize: '2.25rem', fontWeight: 900 }}>
                                PLAY AGAIN
                            </button>
                        </motion.div>
                    )}

                    {isActive && (
                        <motion.div
                            key="activity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '70vh', justifyContent: 'space-between' }}
                        >
                            <div style={{ textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '2rem', position: 'relative', zIndex: 30, width: '100%', padding: '0 1rem' }}>
                                {isTransition ? (
                                    <motion.h1 initial={{ scale: 0.5, y: 50, opacity: 0 }} animate={{ scale: [1, 1.1, 1], y: 0, opacity: 1 }} className="text-cartoon" style={{ fontSize: '5rem', fontWeight: 900, letterSpacing: '0.05em', lineHeight: 1.1, margin: 0 }}>
                                        {transMsg}
                                    </motion.h1>
                                ) : (
                                    <>
                                        <motion.h1 key={currentActivity?.id} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-cartoon-pink" style={{ fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: '2rem', marginTop: 0 }}>
                                            {currentActivity?.title}
                                        </motion.h1>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <motion.p initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="pill-squishy" style={{ fontSize: '2.25rem', fontWeight: 900, color: '#1e293b', backgroundColor: 'rgba(255,255,255,0.9)', padding: '1.25rem 2.5rem', borderRadius: '9999px', display: 'inline-block', wordBreak: 'break-word', maxWidth: '90%', margin: 0 }}>
                                                {currentActivity?.instruction}
                                            </motion.p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flex: 1, marginTop: '2rem', minHeight: '450px' }}>
                                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.4)', filter: 'blur(80px)', borderRadius: '50%', margin: '0 auto', width: '80%', aspectRatio: '1', maxWidth: '500px' }} />
                                {isTransition && <Confetti />}
                                <div style={{ position: 'relative', zIndex: 20, transform: 'scale(1.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px', height: '400px' }}>
                                    <KawaiiBunnyMascot activity={currentActivity?.id || 'idle'} isPlaying={!isTransition} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
export default JumpAndRun;
