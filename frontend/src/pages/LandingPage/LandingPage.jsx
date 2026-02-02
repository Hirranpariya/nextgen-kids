import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from './Hero';
import AgeGroupSelector from './AgeSelector';
import Features from './Features';
import FlowVisual from './FlowVisual';

const LandingPage = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Navbar />
            <Hero />
            <AgeGroupSelector />
            <Features />
            <FlowVisual />

            {/* Footer */}
            <footer style={{ background: '#2d3748', color: 'white', padding: '4rem 0' }}>
                <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p>© 2026 NextGen Kids. Safety first, fun always.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.7 }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Parent Guide</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
