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
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Sky Gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #87CEEB, #E9D5FF, #FEF08A)', opacity: 0.8 }} />

        {/* Playful Sun */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', top: '5rem', right: '8rem', width: '12rem', height: '12rem', filter: 'drop-shadow(0 0 30px rgba(253,224,71,0.8))' }}
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
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0.5rem' }}>
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
            style={{ position: 'absolute', top: '8rem', left: '10rem', width: '12rem', opacity: 0.9, filter: 'drop-shadow(0 20px 13px rgba(0,0,0,0.03))' }}
        >
            <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 80 Q50 90 60 90 L140 90 Q150 90 150 80 Q150 70 140 70 Q130 40 100 40 Q70 40 60 70 Q50 70 50 80 Z" fill="white" />
            </svg>
        </motion.div>

        <motion.div
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', top: '16rem', right: '5rem', width: '16rem', opacity: 0.8, filter: 'drop-shadow(0 20px 13px rgba(0,0,0,0.03))' }}
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
                style={{
                    position: 'absolute',
                    fontSize: '1.875rem',
                    opacity: 0.5,
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
            style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
        >
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&display=swap');
                `}
            </style>

            <CuteBackground />

            {/* Top Header */}
            <div style={{ width: '100%', position: 'relative', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                <button
                    onClick={() => navigate('/dashboard/toddler')}
                    style={{ position: 'absolute', left: '2rem', padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                    <ArrowLeft size={28} color="#334155" />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#1e293b', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        Nursery Rhymes
                    </h1>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <Music color="#ec4899" size={32} />
                    </motion.div>
                </div>
            </div>

            {/* Main Content Container */}
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', paddingBottom: '5rem' }}>

                {/* 40px Spacing between Header and Video */}
                <div style={{ height: '40px' }}></div>

                {/* Video Player Section */}
                <div ref={videoRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div
                        key={activeSong.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ width: '80%', aspectRatio: '16/9', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', backgroundColor: 'black', position: 'relative', border: '4px solid rgba(255,255,255,0.5)' }}
                    >
                        <iframe
                            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, borderRadius: '1rem', border: 'none' }}
                            src={`https://www.youtube-nocookie.com/embed/${activeSong.videoId}?autoplay=1&rel=0&modestbranding=1`}
                            title={activeSong.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </motion.div>

                    {/* Rhyme Title Below Video */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)', padding: '0.75rem 1.5rem', borderRadius: '9999px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: '1px solid white' }}>
                        <span style={{ fontSize: '1.875rem' }}>⭐</span>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#1e293b', textAlign: 'center', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                            {activeSong.title}
                        </h2>
                        <span style={{ fontSize: '1.875rem' }}>⭐</span>
                    </div>
                </div>

                {/* 40px Spacing between Video and List */}
                <div style={{ height: '40px' }}></div>

                {/* Rhymes List Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto' }}>
                    {SONGS.map((song) => {
                        const isActive = activeSong.id === song.id;
                        return (
                            <motion.div
                                key={song.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelectSong(song)}
                                style={{
                                    width: '100%',
                                    minHeight: '110px',
                                    padding: '20px',
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255,255,255,0.4)',
                                    backgroundColor: song.bg,
                                    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 0 0 ${song.shadow}`,
                                    ...(isActive ? { outline: '4px solid white', outlineOffset: '2px' } : {})
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: 0 }}>
                                    {/* Large Emoji */}
                                    <div style={{ fontSize: '3rem', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '50%', width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.07))' }}>
                                        {song.icon}
                                    </div>

                                    {/* Title */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e293b', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {song.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Play Button */}
                                <div style={{
                                    marginLeft: '1rem',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    borderRadius: '9999px',
                                    padding: '0.75rem 1.5rem',
                                    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    transition: 'transform 0.3s ease',
                                    backgroundColor: isActive ? '#ec4899' : 'white',
                                    color: isActive ? 'white' : '#334155'
                                }}>
                                    <motion.div animate={isActive ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
                                        <Play size={24} fill="currentColor" color={isActive ? "white" : "#f43f5e"} />
                                    </motion.div>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 700, whiteSpace: 'nowrap', display: 'block' }}>
                                        {isActive ? "Playing Now" : "Play"}
                                    </span>
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
