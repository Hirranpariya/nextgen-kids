import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Timer, Activity } from 'lucide-react';

const JumpAndRun = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); 

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-green-50 relative overflow-hidden flex flex-col">
            <div className="p-6 flex items-center justify-between bg-white shadow-sm z-10">
                <button 
                    onClick={() => navigate('/dashboard/toddler')}
                    className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                    <ArrowLeft size={24} className="text-slate-700" />
                </button>
                <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full">
                    <Timer size={20} className="text-slate-500" />
                    <span className="text-xl font-bold text-slate-700">{formatTime(timeLeft)}</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-12 text-center z-10">
                
                {timeLeft === 0 ? (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-12 rounded-[3rem] shadow-2xl border-8 border-green-400 max-w-lg"
                    >
                        <span className="text-8xl mb-6 block">🏆</span>
                        <h1 className="text-4xl font-black text-slate-800 mb-4">Workout Complete!</h1>
                        <p className="text-xl text-slate-600 mb-8">Great job moving your body!</p>
                        <button 
                            onClick={() => { setTimeLeft(60); setIsActive(false); }}
                            className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-green-600 transition-colors shadow-lg"
                        >
                            Play Again
                        </button>
                    </motion.div>
                ) : (
                    <>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 drop-shadow-sm max-w-2xl leading-tight">
                            {isActive ? "JUMP! JUMP! JUMP!" : "Ready to move your body?"}
                        </h1>

                        <div className="relative">
                            <motion.div
                                animate={isActive ? { 
                                    y: [0, -100, 0],
                                    rotate: [0, -10, 10, 0]
                                } : {}}
                                transition={isActive ? {
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } : {}}
                                className="text-9xl mb-8"
                                style={{ transformOrigin: "bottom center" }}
                            >
                                🐸
                            </motion.div>
                            
                            {isActive && (
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-green-400 rounded-full -z-10 blur-3xl opacity-20"
                                />
                            )}
                        </div>

                        <button
                            onClick={() => setIsActive(!isActive)}
                            className={`px-12 py-6 rounded-full text-3xl font-black text-white shadow-xl transition-transform hover:scale-105 active:scale-95 ${
                                isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            }`}
                        >
                            {isActive ? "PAUSE" : "START"}
                        </button>
                    </>
                )}
            </div>
            
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32 fill-green-200/50">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,111.47,192.39,97.84,237.94,87.67,284.14,75.12,321.39,56.44Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default JumpAndRun;
