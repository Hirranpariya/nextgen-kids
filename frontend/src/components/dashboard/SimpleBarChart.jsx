import React from 'react';
import { motion } from 'framer-motion';

const SimpleBarChart = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.value));

    return (
        <div className="flex items-end gap-2 h-[200px] pt-8" style={{ height: '200px' }}>
            {data.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2" style={{ flex: 1 }}>
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
                    <div className="text-xs font-bold text-muted">{item.day}</div>
                </div>
            ))}
        </div>
    );
};

export default SimpleBarChart;
