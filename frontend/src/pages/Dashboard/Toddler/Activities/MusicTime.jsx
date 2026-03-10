import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Play, Pause, Volume2 } from 'lucide-react';

const SONGS = [
    { id: 1, title: "Twinkle Twinkle", animal: "⭐", color: "#FACC15" },
    { id: 2, title: "Old MacDonald", animal: "🐮", color: "#4ADE80" },
    { id: 3, title: "Wheels on the Bus", animal: "🚌", color: "#60A5FA" },
    { id: 4, title: "Itsy Bitsy Spider", animal: "🕷️", color: "#A78BFA" },
];

const MusicTime = () => {
    const navigate = useNavigate();
    const [playingId, setPlayingId] = useState(null);

    const togglePlay = (id) => {
        if (playingId === id) {
            setPlayingId(null);
        } else {
            setPlayingId(id);
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 relative overflow-hidden flex flex-col">
            <div className="p-6 flex items-center bg-white shadow-sm z-10">
                <button 
                    onClick={() => navigate('/dashboard/toddler')}
                    className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors mr-6"
                >
                    <ArrowLeft size={24} className="text-slate-700" />
                </button>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <Music className="text-purple-500" /> Music Time!
                </h1>
            </div>

            <div className="flex-1 p-6 md:p-12">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SONGS.map((song) => {
                        const isPlaying = playingId === song.id;
                        return (
                            <motion.div
                                key={song.id}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-white rounded-[2rem] p-6 shadow-lg border-4 flex items-center gap-6"
                                style={{ borderColor: `${song.color}40` }}
                            >
                                <div 
                                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-inner"
                                    style={{ backgroundColor: `${song.color}20` }}
                                >
                                    {song.animal}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{song.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <Volume2 size={20} className="text-slate-400" />
                                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                            {isPlaying && (
                                                <motion.div 
                                                    className="h-full bg-purple-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => togglePlay(song.id)}
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md relative overflow-hidden"
                                    style={{ backgroundColor: song.color }}
                                >
                                    {isPlaying ? (
                                        <Pause size={30} fill="currentColor" />
                                    ) : (
                                        <Play size={30} fill="currentColor" className="ml-2" />
                                    )}
                                    {isPlaying && (
                                        <motion.div
                                            className="absolute inset-0 bg-white/20"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            {/* Playful background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden z-0">
                <Music size={800} />
            </div>
        </div>
    );
};

export default MusicTime;
    