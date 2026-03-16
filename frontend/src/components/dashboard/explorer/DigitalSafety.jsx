import React from 'react';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
import Button from '../../ui/Button';

const SafetyTip = ({ icon: Icon, title, desc }) => (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
        <div style={{ padding: '0.4rem', background: '#EBF8FF', borderRadius: '6px', color: '#3182CE' }}>
            <Icon size={16} />
        </div>
        <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2D3748' }}>{title}</div>
            <div style={{ fontSize: '0.75rem', color: '#718096', lineHeight: '1.4' }}>{desc}</div>
        </div>
    </div>
);

const DigitalSafety = () => {
    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', height: '100%' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} color="#3182CE" /> Digital Safety
            </h3>

            <SafetyTip icon={Lock} title="Keep Passwords Safe" desc="Never share your passwords with friends, only parents." />
            <SafetyTip icon={Eye} title="Be Careful Online" desc="Don't talk to strangers or click unknown links." />

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#F7FAFC', borderRadius: '8px', border: '1px dashed #CBD5E0' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#4A5568', marginBottom: '0.5rem' }}>Safety Quiz</div>
                <div style={{ fontSize: '0.9rem', color: '#2D3748', marginBottom: '1rem', fontWeight: '500' }}>
                    "A stranger asks for your photo online. What do you do?"
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="outline" size="sm" style={{ flex: 1, fontSize: '0.75rem' }}>Ignore</Button>
                    <Button variant="primary" size="sm" style={{ flex: 1, fontSize: '0.75rem' }}>Tell Parent</Button>
                </div>
            </div>
        </div>
    );
};

export default DigitalSafety;
