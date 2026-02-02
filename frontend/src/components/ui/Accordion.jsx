import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ marginBottom: '1rem', border: '1px solid #edf2f7', borderRadius: '16px', overflow: 'hidden' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem',
                    background: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-main)'
                }}
            >
                {question}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={20} color="var(--text-muted)" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', background: '#f8fafc' }}
                    >
                        <div style={{ padding: '1.25rem', paddingTop: '0', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Accordion = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => (
                <AccordionItem key={index} {...item} />
            ))}
        </div>
    );
};

export default Accordion;
