import React from 'react';
import { motion } from 'framer-motion';

const FilterBar = ({ filters, activeFilter, onFilterChange, color = 'var(--color-primary)' }) => {
    return (
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
            {filters.map((filter) => (
                <motion.button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        border: 'none',
                        background: activeFilter === filter.id ? color : 'white',
                        color: activeFilter === filter.id ? 'white' : 'var(--text-muted)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: activeFilter === filter.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                        transition: 'background 0.3s ease, color 0.3s ease'
                    }}
                >
                    {filter.label}
                </motion.button>
            ))}
        </div>
    );
};

export default FilterBar;
