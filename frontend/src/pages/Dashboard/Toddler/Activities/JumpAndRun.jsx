import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Timer, Volume2, VolumeX } from 'lucide-react';

// Character SVGs - Redesigned to be highly kids-friendly (Cute blob/animal mascot)
const CuteCharacter = ({ type, isActive }) => {
    // Shared cute bouncy animations
    const wobble = isActive ? { rotate: [-5, 5, -5], scale: [1, 1.05, 1], y: [-15, 0, -15] } : {};
    const jump = isActive ? { y: [0, -300, 0], scaleY: [1, 1.2, 0.8, 1], scaleX: [1, 0.8, 1.2, 1] } : {};
    const run = isActive ? { x: [-40, 40, -40], rotate: [-15, 15, -15], y: [0, -20, 0, -20, 0] } : {};
    const breathe = isActive ? { scale: [1, 1.2, 1], y: [0, -10, 0] } : {};

    const baseProps = {
        transition: { duration: type === 'run' ? 0.4 : type === 'jump' ? 0.7 : 2, repeat: Infinity, ease: "easeInOut" },
        className: "w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]"
    };

    // Helper for cute face
    const CuteFace = ({ isBlinking = false, lookingRight = false, smilingWide = false }) => (
        <g transform={lookingRight ? "translate(30, 0)" : ""}>
            {/* Eyes */}
            <motion.ellipse cx="70" cy="80" rx="12" ry={isBlinking ? "2" : "18"} fill="#1E293B" animate={isBlinking ? { ry: [18, 2, 18], cy: [80, 80, 80] } : {}} transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }} />
            <motion.ellipse cx="130" cy="80" rx="12" ry={isBlinking ? "2" : "18"} fill="#1E293B" animate={isBlinking ? { ry: [18, 2, 18], cy: [80, 80, 80] } : {}} transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }} />
            {/* Eye shines */}
            <ellipse cx="65" cy="74" rx="5" ry="7" fill="white" />
            <ellipse cx="125" cy="74" rx="5" ry="7" fill="white" />
            <circle cx="73" cy="85" r="3" fill="white" />
            <circle cx="133" cy="85" r="3" fill="white" />
            {/* Blush */}
            <ellipse cx="45" cy="100" rx="15" ry="10" fill="#EF4444" opacity="0.4" />
            <ellipse cx="155" cy="100" rx="15" ry="10" fill="#EF4444" opacity="0.4" />
            {/* Mouth */}
            {smilingWide ? (
                <path d="M 80 110 Q 100 140 120 110 Q 100 130 80 110" fill="#1E293B" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            ) : (
                <path d="M 85 110 Q 100 125 115 110" fill="none" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            )}
        </g>
    );

    switch (type) {
        case 'warmup':
            return (
                <motion.svg animate={wobble} {...baseProps} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Cute Blob Body Stretching */}
                    <motion.rect animate={isActive ? { height: [120, 160, 120], y: [60, 20, 60] } : {}} transition={{ duration: 2, repeat: Infinity }} x="30" y="60" width="140" height="120" rx="70" fill="#FBBF24" />
                    {/* Arms stretching up */}
                    <motion.path animate={isActive ? { d: ["M 40 100 Q 10 70 20 40", "M 40 100 Q 10 50 40 20", "M 40 100 Q 10 70 20 40"] } : {}} transition={{ duration: 2, repeat: Infinity }} d="M 40 100 Q 10 70 20 40" stroke="#FBBF24" strokeWidth="24" strokeLinecap="round" />
                    <motion.path animate={isActive ? { d: ["M 160 100 Q 190 70 180 40", "M 160 100 Q 190 50 160 20", "M 160 100 Q 190 70 180 40"] } : {}} transition={{ duration: 2, repeat: Infinity }} d="M 160 100 Q 190 70 180 40" stroke="#FBBF24" strokeWidth="24" strokeLinecap="round" />

                    <CuteFace isBlinking={true} />
                </motion.svg>
            );
        case 'jump':
            return (
                <motion.svg animate={jump} {...baseProps} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Legs pushing off */}
                    <motion.path animate={isActive ? { d: ["M 60 160 L 50 190", "M 60 160 L 60 170", "M 60 160 L 50 190"] } : {}} transition={{ duration: 0.7, repeat: Infinity }} d="M 60 160 L 50 190" stroke="#4ADE80" strokeWidth="24" strokeLinecap="round" />
                    <motion.path animate={isActive ? { d: ["M 140 160 L 150 190", "M 140 160 L 140 170", "M 140 160 L 150 190"] } : {}} transition={{ duration: 0.7, repeat: Infinity }} d="M 140 160 L 150 190" stroke="#4ADE80" strokeWidth="24" strokeLinecap="round" />
                    {/* Frog/Blob Body */}
                    <circle cx="100" cy="110" r="70" fill="#4ADE80" />
                    <CuteFace smilingWide={true} />
                    {/* Arms cheering */}
                    <motion.path animate={isActive ? { d: ["M 40 120 Q 20 90 30 60", "M 40 120 Q 10 80 40 60", "M 40 120 Q 20 90 30 60"] } : {}} transition={{ duration: 0.7, repeat: Infinity }} d="M 40 120 Q 20 90 30 60" stroke="#4ADE80" strokeWidth="20" strokeLinecap="round" />
                    <motion.path animate={isActive ? { d: ["M 160 120 Q 180 90 170 60", "M 160 120 Q 190 80 160 60", "M 160 120 Q 180 90 170 60"] } : {}} transition={{ duration: 0.7, repeat: Infinity }} d="M 160 120 Q 180 90 170 60" stroke="#4ADE80" strokeWidth="20" strokeLinecap="round" />
                </motion.svg>
            );
        case 'run':
            return (
                <motion.svg animate={run} {...baseProps} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Dust clouds */}
                    <motion.circle animate={isActive ? { r: [0, 20, 0], x: [-50, -100, -50], opacity: [1, 0, 1] } : {}} transition={{ duration: 0.4, repeat: Infinity }} cx="60" cy="180" r="15" fill="#CBD5E1" />
                    {/* Speedy body leaning forward */}
                    <g transform="rotate(20 100 120)">
                        <ellipse cx="100" cy="120" rx="90" ry="60" fill="#F87171" />
                        <motion.path animate={isActive ? { d: ["M 40 160 L 10 190", "M 60 160 L 40 190", "M 40 160 L 10 190"] } : {}} transition={{ duration: 0.4, repeat: Infinity }} d="M 40 160 L 10 190" stroke="#F87171" strokeWidth="24" strokeLinecap="round" />
                        <motion.path animate={isActive ? { d: ["M 120 160 L 150 190", "M 100 160 L 120 190", "M 120 160 L 150 190"] } : {}} transition={{ duration: 0.4, repeat: Infinity }} d="M 120 160 L 150 190" stroke="#F87171" strokeWidth="24" strokeLinecap="round" />
                        <CuteFace lookingRight={true} smilingWide={true} />
                        {/* Speed lines */}
                        <path d="M 10 50 L 40 50" stroke="white" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 5 80 L 30 80" stroke="white" strokeWidth="8" strokeLinecap="round" />
                    </g>
                </motion.svg>
            );
        default: // cooldown/idle
            return (
                <motion.svg animate={breathe} {...baseProps} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Relaxed puddle blob */}
                    <motion.rect animate={isActive ? { ry: [60, 80, 60] } : {}} transition={{ duration: 3, repeat: Infinity }} x="30" y="80" width="140" height="110" rx="60" fill="#38BDF8" />
                    <CuteFace isBlinking={true} />
                    {/* Breath bubble */}
                    <motion.path animate={isActive ? { d: ["M 100 140 Q 100 140 100 140", "M 100 140 Q 100 170 100 140", "M 100 140 Q 100 140 100 140"] } : {}} transition={{ duration: 3, repeat: Infinity }} d="M 100 140 Q 100 140 100 140" stroke="#BAE6FD" strokeWidth="12" strokeLinecap="round" />
                </motion.svg>
            );
    }
};

const JumpAndRun = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Audio Refs for Sound Effects (Using standard URLs for demonstration)
    const tickSound = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg"));
    const startSound = useRef(new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"));
    const winSound = useRef(new Audio("https://actions.google.com/sounds/v1/crowds/kids_cheering.ogg"));

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
                if (soundEnabled && timeLeft <= 10 && timeLeft > 0) {
                    tickSound.current.volume = 0.3;
                    tickSound.current.play().catch(e => console.log(e));
                }
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (soundEnabled) {
                winSound.current.volume = 0.5;
                winSound.current.play().catch(e => console.log(e));
            }
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, soundEnabled]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getPhaseDetails = (time) => {
        if (!isActive && time === 60) return { title: "Ready to move?", subtitle: "Press START to begin!", type: "idle", bg: "bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300" };
        if (time > 50) return { title: "Warm Up!", subtitle: "Stretch your arms up high!", type: "warmup", bg: "bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400" };
        if (time > 30) return { title: "JUMP! JUMP! JUMP!", subtitle: "Like a little frog!", type: "jump", bg: "bg-gradient-to-br from-green-300 via-green-400 to-emerald-500" };
        if (time > 10) return { title: "RUN! RUN! RUN!", subtitle: "Fast like a cheetah!", type: "run", bg: "bg-gradient-to-br from-orange-400 via-red-400 to-rose-500" };
        return { title: "Cool Down", subtitle: "Deep breaths in and out...", type: "cooldown", bg: "bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500" };
    };

    const phase = getPhaseDetails(timeLeft);

    const toggleTimer = () => {
        if (!isActive && soundEnabled && timeLeft === 60) {
            startSound.current.volume = 0.5;
            startSound.current.play().catch(e => console.log(e));
        }
        setIsActive(!isActive);
    };

    return (
        <div className={`min-h-screen relative overflow-hidden flex flex-col transition-all duration-1000 ${phase.bg}`}>
            {/* Ambient Background Patterns */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="bubbles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="10" fill="white" />
                            <circle cx="80" cy="60" r="15" fill="white" />
                            <circle cx="40" cy="90" r="8" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#bubbles)" />
                </svg>
            </div>

            <div className="p-6 flex items-center justify-between bg-white/20 backdrop-blur-xl shadow-lg z-20 border-b border-white/50">
                <button
                    onClick={() => navigate('/dashboard/toddler')}
                    className="p-3 rounded-full bg-white/80 hover:bg-white text-slate-800 transition-colors shadow-sm"
                >
                    <ArrowLeft size={28} />
                </button>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-3 rounded-full bg-white/80 hover:bg-white text-slate-800 transition-colors shadow-sm"
                    >
                        {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} className="text-red-500" />}
                    </button>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border-4 border-white">
                        <Timer size={28} className={isActive ? 'text-red-500 animate-pulse' : 'text-indigo-500'} />
                        <span className="text-3xl font-black text-slate-800 font-mono tracking-wider">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8 text-center z-10 w-full relative">

                <AnimatePresence mode="wait">
                    {timeLeft === 0 ? (
                        <motion.div
                            key="complete"
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            className="bg-white/90 backdrop-blur-md p-16 rounded-[4rem] shadow-2xl border-[12px] border-white max-w-2xl mx-auto w-full z-20 flex flex-col items-center"
                        >
                            <span className="text-[150px] mb-8 block drop-shadow-2xl animate-bounce">🏆</span>
                            <h1 className="text-6xl font-black text-slate-800 mb-6 uppercase tracking-tight">Workout Complete!</h1>
                            <p className="text-3xl text-slate-600 mb-12 font-bold">Great job moving your body!</p>
                            <button
                                onClick={() => { setTimeLeft(60); setIsActive(false); }}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-16 py-6 rounded-full text-3xl font-black hover:from-green-500 hover:to-emerald-600 transition-all shadow-2xl hover:scale-110 active:scale-95 border-4 border-white/50"
                            >
                                PLAY AGAIN
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex-1 flex flex-col items-center justify-between py-10"
                        >
                            <div className="h-48 flex flex-col justify-end z-20">
                                <h1 className="text-6xl md:text-[6rem] font-black text-white drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)] max-w-5xl leading-tight mx-auto uppercase tracking-tighter">
                                    {phase.title}
                                </h1>
                                {phase.subtitle && isActive && (
                                    <motion.p
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-4xl font-black text-slate-800 mt-8 drop-shadow-xl bg-white px-10 py-4 rounded-full inline-block mx-auto border-[6px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                                    >
                                        {phase.subtitle}
                                    </motion.p>
                                )}
                            </div>

                            <div className="relative flex-1 flex items-center justify-center w-full max-w-2xl mx-auto my-12">
                                <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full aspect-square" />
                                <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] relative z-20">
                                    <CuteCharacter type={phase.type} isActive={isActive} />
                                </div>
                            </div>

                            <button
                                onClick={toggleTimer}
                                className={`px-24 py-8 rounded-[3rem] text-5xl font-black text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all hover:scale-110 active:scale-95 z-20 border-[8px] border-white/40 hover:border-white/80 mb-4 tracking-widest ${isActive ? 'bg-red-500' : 'bg-emerald-500'
                                    }`}
                            >
                                {isActive ? "PAUSE" : "START"}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default JumpAndRun;
