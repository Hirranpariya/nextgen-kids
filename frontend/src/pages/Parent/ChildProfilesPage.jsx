import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParentLayout from '../../layouts/ParentLayout';
import ProfileCard from '../../components/dashboard/ProfileCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

const AddChildModal = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !age) return;

        let theme = 'kid';
        if (age >= 3 && age <= 5) theme = 'toddler';
        else if (age >= 13) theme = 'teen';

        onAdd({ name, age, theme, avatar: '👶' });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ background: 'white', padding: '2rem', borderRadius: '24px', width: '400px', maxWidth: '90%' }}
            >
                <div className="flex-between mb-4">
                    <h2 className="text-xl font-bold">Add New Explorer</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah" />
                    <Input label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 6" />
                    <Button variant="primary" type="submit" className="mt-2">Add Child</Button>
                </form>
            </motion.div>
        </div>
    );
};

const EditChildModal = ({ child, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: child.name,
        age: child.age,
        height: child.height || '',
        weight: child.weight || '',
        dob: child.dob || ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(child.id, formData);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ background: 'white', padding: '2rem', borderRadius: '24px', width: '400px', maxWidth: '90%' }}
            >
                <div className="flex-between mb-4">
                    <h2 className="text-xl font-bold">Edit Profile 📝</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                    <Input label="Age" type="number" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} />

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Input label="Height (cm)" type="number" value={formData.height} onChange={(e) => handleChange('height', e.target.value)} placeholder="e.g. 110" />
                        <Input label="Weight (kg)" type="number" value={formData.weight} onChange={(e) => handleChange('weight', e.target.value)} placeholder="e.g. 20" />
                    </div>

                    <Input label="Birthdate" type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} />

                    <Button variant="primary" type="submit" className="mt-2">Save Details</Button>
                </form>
            </motion.div>
        </div>
    );
};

const ChildProfilesPage = () => {
    const { user, selectChild, addChild, updateChild } = useAuth();
    const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingChild, setEditingChild] = useState(null);

    const handleLaunch = (child) => {
        selectChild(child);
        const age = parseInt(child.age);
        if (age >= 3 && age <= 5) {
            navigate('/dashboard/toddler');
        } else if (age >= 6 && age <= 9) {
            navigate('/dashboard/young-learner');
        } else if (age >= 10 && age <= 12) {
            navigate('/dashboard/explorer');
        } else {
            navigate('/dashboard/toddler'); // Fallback
        }
    };

    return (
        <ParentLayout>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="flex-between mb-8">
                    <div>
                        <h1 className="text-title" style={{ fontSize: '2rem' }}>My Kids 👨‍👩‍👧‍👦</h1>
                        <p className="text-muted">Manage profiles and settings for your little ones.</p>
                    </div>
                    <Button variant="bouncy" icon={Plus} onClick={() => setIsAddModalOpen(true)}>Add Child</Button>
                </div>

                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {user?.children?.map((child, index) => (
                        <ProfileCard
                            key={index}
                            {...child}
                            progress={child.progress || 0}
                            onLaunch={() => handleLaunch(child)}
                            onEdit={() => setEditingChild(child)}
                        />
                    ))}

                    {/* Add New Placeholder Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setIsAddModalOpen(true)}
                        style={{
                            border: '3px dashed #E2E8F0',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '300px',
                            cursor: 'pointer',
                            color: '#A0AEC0'
                        }}
                    >
                        <div style={{ background: '#EDF2F7', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                            <Plus size={32} />
                        </div>
                        <span style={{ fontWeight: '700' }}>Add Profile</span>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isAddModalOpen && <AddChildModal onClose={() => setIsAddModalOpen(false)} onAdd={addChild} />}
                    {editingChild && (
                        <EditChildModal
                            child={editingChild}
                            onClose={() => setEditingChild(null)}
                            onUpdate={updateChild}
                        />
                    )}
                </AnimatePresence>
            </div>
        </ParentLayout>
    );
};

export default ChildProfilesPage;
