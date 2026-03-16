import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const PostCard = ({ author, time, content, image, likes, comments, tags }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'white',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1.5rem',
                border: '1px solid #edf2f7'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
                    <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{author}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{time}</div>
                    </div>
                </div>
                <button style={{ background: 'transparent', color: 'var(--text-muted)' }}><MoreHorizontal size={20} /></button>
            </div>

            <p style={{ marginBottom: '1rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                {content}
            </p>

            {tags && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    {tags.map((tag, i) => (
                        <span key={i} style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-primary)',
                            background: 'rgba(99, 102, 241, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontWeight: '600'
                        }}>#{tag}</span>
                    ))}
                </div>
            )}

            {image && (
                <div style={{
                    width: '100%',
                    height: '250px',
                    background: image,
                    borderRadius: '16px',
                    marginBottom: '1rem',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            )}

            <div style={{
                display: 'flex',
                gap: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #edf2f7',
                color: 'var(--text-muted)'
            }}>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', cursor: 'pointer', color: isLiked ? '#F56565' : 'inherit' }}
                >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{likeCount}</span>
                </motion.button>

                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', cursor: 'pointer', color: 'inherit' }}>
                    <MessageCircle size={20} />
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{comments}</span>
                </button>

                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', cursor: 'pointer', color: 'inherit' }}>
                    <Share2 size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default PostCard;
