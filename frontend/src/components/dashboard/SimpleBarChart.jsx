import React from 'react';
import { motion } from 'framer-motion';

const SimpleBarChart = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.value));

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '200px', paddingTop: '2rem' }}>
            {data.map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.value / maxVal) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        style={{
                            width: '100%',
                            minHeight: '4px',
                            background: 'var(--color-primary)',
                            borderRadius: '8px 8px 4px 4px',
                            opacity: 0.8
                        }}
                    />
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{item.day}</div>
                </div>
            ))}
        </div>
    );
};

export default SimpleBarChart;
