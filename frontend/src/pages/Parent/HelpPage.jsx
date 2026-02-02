import React from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import Accordion from '../../components/ui/Accordion';
import ChatAssistant from '../../components/help/ChatAssistant';
import { HelpCircle, FileText, Mail } from 'lucide-react';

const HelpPage = () => {
    const faqs = [
        {
            question: "How do I reset my child's PIN?",
            answer: "You can reset the Child PIN by going to Settings > Security > Reset PIN. You'll need to enter your master password to confirm."
        },
        {
            question: "Is the content safe for unsupervised play?",
            answer: "Absolutely. NextGen Kids is a closed ecosystem. There are no external links, ads, or unmoderated chat features."
        },
        {
            question: "Can I use this on multiple devices?",
            answer: "Yes! Your account works across tablets, phones, and desktops. Progress syncs automatically."
        },
        {
            question: "How does the 'Smart' prediction work?",
            answer: "We analyze your child's interaction patterns to suggest activities that are just right—not too easy, not too hard (The Goldilocks Zone)."
        }
    ];

    return (
        <ParentLayout>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Help Center</h1>
                <p style={{ color: 'var(--text-muted)' }}>Get answers immediately or chat with our automated assistant.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                {/* Left Col: FAQs */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <HelpCircle size={20} color="var(--color-primary)" /> Frequently Asked Questions
                    </h3>
                    <Accordion items={faqs} />

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #edf2f7', textAlign: 'center', cursor: 'pointer' }}>
                            <FileText size={24} style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }} />
                            <div style={{ fontWeight: '600' }}>User Guide</div>
                        </div>
                        <div style={{ flex: 1, background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #edf2f7', textAlign: 'center', cursor: 'pointer' }}>
                            <Mail size={24} style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }} />
                            <div style={{ fontWeight: '600' }}>Contact Us</div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Chat */}
                <div>
                    <div style={{ marginBottom: '1rem', fontWeight: '700', color: 'var(--text-muted)' }}>LIVE ASSISTANT</div>
                    <ChatAssistant />
                </div>
            </div>
        </ParentLayout>
    );
};

export default HelpPage;
