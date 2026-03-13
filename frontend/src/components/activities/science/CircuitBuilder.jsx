import React, { useMemo, useState } from 'react';
import { Cpu, Zap, Power, Link } from 'lucide-react';
import { CIRCUIT_BUILDER } from '../../../constants/science';

const CircuitBuilder = () => {
    const [connected, setConnected] = useState({
        battery: false,
        wire: false,
        switch: false,
        bulb: false
    });

    const [powerOn, setPowerOn] = useState(false);

    const connectionCount = useMemo(() => Object.values(connected).filter(Boolean).length, [connected]);
    const circuitComplete = connectionCount === 4;

    const handleToggle = (component) => {
        setConnected(prev => ({ ...prev, [component]: !prev[component] }));
    };

    const handlePowerToggle = () => {
        if (!circuitComplete) return;
        setPowerOn(prev => !prev);
    };

    const statusMessage = useMemo(() => {
        if (!circuitComplete) return 'Drag all components together to complete the circuit.';
        return powerOn ? 'The bulb is glowing! Great job!' : 'Press the power button to light the bulb.';
    }, [circuitComplete, powerOn]);

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748', marginBottom: '0.5rem' }}>
                        {CIRCUIT_BUILDER.name}
                    </h2>
                    <p style={{ color: '#718096', marginBottom: '0.5rem' }}>{CIRCUIT_BUILDER.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>
                        {powerOn ? '🔆' : '🔌'}
                    </div>
                    <button
                        onClick={handlePowerToggle}
                        disabled={!circuitComplete}
                        style={{
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: circuitComplete ? '#38A169' : '#E2E8F0',
                            color: circuitComplete ? 'white' : '#A0AEC0',
                            fontWeight: '700',
                            cursor: circuitComplete ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Power size={18} />
                        {powerOn ? 'Turn Off' : 'Turn On'}
                    </button>
                </div>
            </div>

            <div style={{
                background: '#F7FAFC',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #E2E8F0',
                marginBottom: '1.5rem'
            }}>
                <p style={{ color: '#4A5568', fontWeight: '600', marginBottom: '0.5rem' }}>Circuit Status</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: circuitComplete ? '#38A169' : '#E53E3E'
                    }} />
                    <span style={{ color: '#2D3748' }}>{statusMessage}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {CIRCUIT_BUILDER.components.map((component) => (
                    <div
                        key={component.id}
                        onClick={() => handleToggle(component.id)}
                        style={{
                            padding: '1.25rem',
                            borderRadius: '16px',
                            border: `2px solid ${connected[component.id] ? '#38A169' : '#E2E8F0'}`,
                            background: connected[component.id] ? '#F0FFF4' : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.75rem',
                            transition: 'transform 0.2s',
                            transform: connected[component.id] ? 'translateY(-2px)' : 'none'
                        }}
                    >
                        <div style={{ fontSize: '2rem' }}>{component.icon}</div>
                        <div style={{ fontWeight: '700', color: '#2D3748' }}>{component.label}</div>
                        <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                            {connected[component.id] ? 'Connected' : 'Tap to connect'}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                background: '#E9D8FD',
                borderRadius: '16px',
                border: '1px solid #D6BCFA'
            }}>
                <div style={{ fontWeight: '700', color: '#6B46C1', marginBottom: '0.5rem' }}>Tip</div>
                <div style={{ color: '#553C9A' }}>A complete circuit needs all components connected in a loop. Start by connecting the battery to the wire and switch, then link the bulb to complete the path.</div>
            </div>
        </div>
    );
};

export default CircuitBuilder;
