import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from './Hero';
import KeyFeatures from './KeyFeatures';
import AgeGroupSelector from './AgeSelector';
import Features from './Features';
import FlowVisual from './FlowVisual';

const LandingPage = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Navbar />
            <Hero />
            <KeyFeatures />
            <AgeGroupSelector />
            <Features />
            <FlowVisual />

            {/* Footer */}
            <footer style={{ background: '#1a202c', color: 'white', padding: '3rem 0 2rem 0', marginTop: '0' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
                    <p className="text-lg font-bold" style={{ opacity: 0.9 }}>© 2026 NextGen Kids. Safety first, fun always.</p>
                    <div className="flex gap-4 justify-center" style={{ opacity: 0.7 }}>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Parent Guide</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
