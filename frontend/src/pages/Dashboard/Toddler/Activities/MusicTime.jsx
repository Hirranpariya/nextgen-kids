import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Play } from 'lucide-react';

const SONGS = [
    { id: 1, title: "Twinkle Twinkle Little Star", icon: "⭐", bg: "#FEF08A", shadow: "#FACC15", videoId: "yCjJyiqpAuU" },
    { id: 2, title: "Old MacDonald Had A Farm", icon: "🐄", bg: "#BBF7D0", shadow: "#4ADE80", videoId: "_6HzoUcx3eo" },
    { id: 3, title: "Wheels on the Bus", icon: "🚌", bg: "#BAE6FD", shadow: "#38BDF8", videoId: "e_04ZrNroTo" },
    { id: 4, title: "Johny Johny Yes Papa", icon: "👶", bg: "#FBCFE8", shadow: "#F472B6", videoId: "F4tHL8reNCs" },
    { id: 5, title: "ABC Song", icon: "🔤", bg: "#E9D5FF", shadow: "#C084FC", videoId: "_6HzoUcx3eo" },
];

// Cute Background Decor Component
const CuteBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#FFF0F5]" />

        {/* Playful Sun */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 md:top-20 md:right-32 w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_30px_rgba(253,224,71,0.8)]"
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" fill="#FDE047" />
                {[...Array(8)].map((_, i) => (
                    <path
                        key={i}
                        d="M50 10 L50 2M50 80 L50 98"
                        stroke="#FDE047" strokeWidth="6" strokeLinecap="round"
                        transform={`rotate(${i * 45} 50 50)`}
                    />
                ))}
            </svg>
            {/* Happy Sun Face */}
            <div className="absolute inset-0 flex items-center justify-center pt-2">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <circle cx="10" cy="5" r="3" fill="#854D0E" />
                    <circle cx="30" cy="5" r="3" fill="#854D0E" />
                    <path d="M 12 12 Q 20 18 28 12" stroke="#854D0E" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="5" cy="10" r="4" fill="#EF4444" opacity="0.4" />
                    <circle cx="35" cy="10" r="4" fill="#EF4444" opacity="0.4" />
                </svg>
            </div>
        </motion.div>

        {/* Fluffy Clouds */}
        <motion.div
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-10 md:left-40 w-48 opacity-90 drop-shadow-xl"
        >
            <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 80 Q50 90 60 90 L140 90 Q150 90 150 80 Q150 70 140 70 Q130 40 100 40 Q70 40 60 70 Q50 70 50 80 Z" fill="white" />
            </svg>
        </motion.div>

        <motion.div
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-64 right-20 w-64 opacity-80 drop-shadow-xl"
        >
            <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 80 Q50 90 60 90 L140 90 Q150 90 150 80 Q150 70 140 70 Q130 40 100 40 Q70 40 60 70 Q50 70 50 80 Z" fill="white" />
            </svg>
        </motion.div>

        {/* Floating Notes/Stars */}
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={`star-${i}`}
                animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3], rotate: [0, 45, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                className="absolute text-3xl opacity-50"
                style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${40 + (i * 10)}%`,
                    color: i % 2 === 0 ? '#FEF08A' : '#FBCFE8'
                }}
            >
                {i % 2 === 0 ? '⭐' : '🎵'}
            </motion.div>
        ))}
    </div>
);

const MusicTime = () => {
    const navigate = useNavigate();
    const [activeSong, setActiveSong] = useState(SONGS[0]);
    const videoRef = useRef(null);

    // Initial fade in effect for page load
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleSelectSong = (song) => {
        setActiveSong(song);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen font-sans flex flex-col items-center relative overflow-hidden"
        >
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&display=swap');
                .font-nunito { font-family: 'Nunito', sans-serif; }
                `}
            </style>

            <CuteBackground />

            {/* Top Header */}
            <div className="w-full p-4 md:p-6 flex items-center bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <button
                    onClick={() => navigate('/dashboard/toddler')}
                    className="p-3 rounded-full bg-white hover:bg-slate-100 transition-colors mr-4 shadow-sm"
                >
                    <ArrowLeft size={28} className="text-slate-700" />
                </button>
                <h1 className="text-2xl md:text-3xl font-black font-nunito text-slate-800 flex items-center gap-2 drop-shadow-sm">
                    Nursery Rhymes <Music className="text-pink-500 animate-bounce" size={28} />
                </h1>
            </div>

            <div className="max-w-6xl mx-auto w-full pb-20 flex flex-col items-center relative z-10">
                {/* Main Video Section (Top) - Increased Width to 90% */}
                <div ref={videoRef} className="w-full flex flex-col items-center pt-8 px-4">
                    <motion.div
                        key={activeSong.id}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="w-[95%] md:w-[90%] xl:w-[85%] aspect-video rounded-[32px] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.25)] bg-slate-900 border-[12px] border-white relative group"
                    >
                        <iframe
                            className="w-full h-full absolute inset-0"
                            src={`https://www.youtube-nocookie.com/embed/${activeSong.videoId}?autoplay=1&rel=0&modestbranding=1`}
                            title={activeSong.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        {/* Soft glow behind the video */}
                        <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black font-nunito mt-8 text-slate-800 text-center drop-shadow-md px-4 flex items-center gap-4 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-full border-4 border-white mt-10">
                        <span className="text-5xl">{activeSong.icon}</span> {activeSong.title}
                    </h2>
                </div>

                <div style={{ height: '40px' }}></div>

                {/* Rhymes List Section (Below Video) */}
                <div className="w-[95%] md:w-[85%] lg:w-[80%] mx-auto px-4 flex flex-col gap-[20px]">
                    {SONGS.map((song) => {
                        const isActive = activeSong.id === song.id;
                        return (
                            <motion.div
                                key={song.id}
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelectSong(song)}
                                className={`
                                    w-full p-[20px] rounded-[24px] flex items-center gap-5 cursor-pointer
                                    transition-all duration-300 border-4 border-white/50
                                    ${isActive ? 'ring-8 ring-pink-400 ring-offset-4 scale-[1.02] bg-white' : ''}
                                `}
                                style={{
                                    backgroundColor: isActive ? '#FFFFFF' : song.bg,
                                    boxShadow: `0 8px 0 0 ${song.shadow}, 0 15px 20px rgba(0,0,0,0.15)`
                                }}
                            >
                                <div className="text-6xl sm:text-7xl md:text-8xl leading-none drop-shadow-md w-28 text-center bg-white/30 rounded-full p-2">
                                    {song.icon}
                                </div>
                                <div className="flex-1 flex flex-col justify-center ml-4">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 font-nunito leading-tight">
                                        {song.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-4 bg-white/90 hover:bg-white w-fit px-6 py-3 rounded-full font-bold text-slate-700 transition-colors shadow-md border-2 border-slate-100">
                                        <Play size={28} className="text-rose-500 animate-[bounce_2s_infinite]" fill="currentColor" />
                                        <span className="text-xl font-nunito">{isActive ? "Playing Now!" : "Play Video"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default MusicTime;
