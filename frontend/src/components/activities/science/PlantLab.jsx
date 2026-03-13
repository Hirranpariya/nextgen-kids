import React, { useMemo, useState } from 'react';
import { Droplet, Sun, Leaf, Sparkles } from 'lucide-react';
import { PLANT_LAB } from '../../../constants/science';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const PlantLab = () => {
    const [water, setWater] = useState(PLANT_LAB.params.water.default);
    const [sunlight, setSunlight] = useState(PLANT_LAB.params.sunlight.default);
    const [nutrients, setNutrients] = useState(PLANT_LAB.params.nutrients.default);

    const score = useMemo(() => {
        const ideal = 8;
        const distance =
            Math.abs(water - ideal) +
            Math.abs(sunlight - ideal) +
            Math.abs(nutrients - ideal);
        return Math.max(0, 100 - distance * 6);
    }, [water, sunlight, nutrients]);

    const stage = useMemo(() => {
        if (score > 80) return PLANT_LAB.stages[3];
        if (score > 60) return PLANT_LAB.stages[2];
        if (score > 40) return PLANT_LAB.stages[1];
        return PLANT_LAB.stages[0];
    }, [score]);

    const progressLabel = useMemo(() => {
        if (score > 80) return 'Amazing growth! 🌸';
        if (score > 60) return 'Healthy and thriving 🌿';
        if (score > 40) return 'Needs a little more care 🌱';
        return 'Keep adjusting the environment 🌾';
    }, [score]);

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748', marginBottom: '0.5rem' }}>
                        {PLANT_LAB.name}
                    </h2>
                    <p style={{ color: '#718096', marginBottom: '0.5rem' }}>{PLANT_LAB.description}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: '#2D3748' }}>Stage:</span>
                        <span style={{ fontWeight: '700', color: '#38A169' }}>{stage.label}</span>
                        <span style={{ fontSize: '1.5rem' }}>{stage.image}</span>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '3rem' }}>{stage.image}</div>
                    <div style={{ color: '#718096' }}>{progressLabel}</div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <ControlSlider
                    label="Water"
                    icon={<Droplet size={20} />}
                    value={water}
                    onChange={(value) => setWater(clamp(value, 0, 10))}
                />
                <ControlSlider
                    label="Sunlight"
                    icon={<Sun size={20} />}
                    value={sunlight}
                    onChange={(value) => setSunlight(clamp(value, 0, 10))}
                />
                <ControlSlider
                    label="Nutrients"
                    icon={<Leaf size={20} />}
                    value={nutrients}
                    onChange={(value) => setNutrients(clamp(value, 0, 10))}
                />
            </div>

            <div style={{
                background: '#F0FFF4',
                padding: '1.25rem',
                borderRadius: '16px',
                border: '1px solid #C6F6D5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
            }}>
                <div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3748', marginBottom: '0.25rem' }}>
                        Growth Score
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#4A5568' }}>Tune the sliders to help your plant thrive.</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#38A169' }}>{Math.round(score)}%</div>
                    <Sparkles size={28} color="#38A169" />
                </div>
            </div>
        </div>
    );
};

const ControlSlider = ({ label, icon, value, onChange }) => {
    return (
        <div style={{ background: '#F7FAFC', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#2D3748' }}>
                    {icon}
                    {label}
                </div>
                <div style={{ fontWeight: '700', color: '#4A5568' }}>{value}</div>
            </div>
            <input
                type="range"
                min={0}
                max={10}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default PlantLab;
