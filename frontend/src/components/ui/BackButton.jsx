import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const BackButton = ({ to, theme = 'default', onClick }) => {
    const navigate = useNavigate();
    
    // Theme colors
    const colors = {
        toddler: '#F97316', // orange-500
        youngLearner: '#DD6B20', // custom orange/brown
        explorer: '#4F46E5', // indigo-600
        default: '#4A5568'
    };

    return (
        <motion.button
            onClick={() => {
                if (onClick) { onClick(); return; }
                if (to) navigate(to);
                else navigate(-1);
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
                position: 'fixed',
                top: '1rem',
                left: '1rem',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'white',
                color: colors[theme] || colors.default,
                border: '4px solid white',
                borderRadius: '50px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontFamily: "'Fredoka One', 'Nunito', sans-serif",
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
            }}
        >
            <ArrowLeft size={20} strokeWidth={3} />
            Back
        </motion.button>
    );
};

export default BackButton;
