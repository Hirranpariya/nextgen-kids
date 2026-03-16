import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

const ChatAssistant = () => {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Sparky. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput('');

        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thanks for asking! Our support team will be with you shortly. In the meantime, check out the FAQs below.",
                sender: 'bot'
            }]);
        }, 1000);
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '500px'
        }}>
            <div style={{
                padding: '1.5rem',
                background: 'var(--color-primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                }}>
                    🤖
                </div>
                <div>
                    <div style={{ fontWeight: '700' }}>Sparky Support</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Always online</div>
                </div>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            background: msg.sender === 'user' ? 'var(--color-primary)' : '#f1f5f9',
                            color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '16px',
                            borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                            borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                            maxWidth: '80%'
                        }}
                    >
                        {msg.text}
                    </motion.div>
                ))}
            </div>

            <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid #edf2f7', display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: '0.8rem 1rem',
                        borderRadius: '50px',
                        border: '1px solid #e2e8f0',
                        outline: 'none',
                        background: '#f8fafc'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatAssistant;
