import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParentLayout from '../../layouts/ParentLayout';
import ProfileCard from '../../components/dashboard/ProfileCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useAuth } from '../../hooks/useAuth';

const InfoField = ({ label, value }) => {
    if (!value) return null;
    return (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '0.25rem', fontWeight: 500 }}>{value}</div>
        </div>
    );
};

export const ViewInfoModal = ({ child, onClose }) => {
    const ageNum = parseInt(child.age, 10) || 0;

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <motion.div
                className="custom-scrollbar"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ background: 'white', padding: '2rem', borderRadius: '24px', width: '450px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}
            >
                <div className="flex-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Profile Overview 🌟
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X /></button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', background: '#f8fafc',
                        border: '3px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.5rem', overflow: 'hidden'
                    }}>
                        {child.avatar?.startsWith('data:image') ? (
                            <img src={child.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            child.avatar || '👶'
                        )}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>{child.name}</h3>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>Age {child.age} • {child.gender || 'Not specified'}</p>
                    </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', borderBottom: '2px solid #edf2f7', paddingBottom: '0.5rem' }}>Basic Info</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <InfoField label="Height" value={child.height ? `${child.height} cm` : null} />
                    <InfoField label="Weight" value={child.weight ? `${child.weight} kg` : null} />
                    <InfoField label="Birthdate" value={child.dob} />
                </div>

                {ageNum >= 3 && ageNum <= 5 && (
                    <>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', marginTop: '1.5rem', borderBottom: '2px solid #edf2f7', paddingBottom: '0.5rem' }}>Toddler Details</h3>
                        <InfoField label="Dominant Hand" value={child.dominantHand} />
                        <InfoField label="Primary Language" value={child.primaryLanguage} />
                        <InfoField label="Allergies / Medical Notes" value={child.allergies} />
                    </>
                )}

                {ageNum >= 6 && ageNum <= 9 && (
                    <>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', marginTop: '1.5rem', borderBottom: '2px solid #edf2f7', paddingBottom: '0.5rem' }}>Learner Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <InfoField label="Grade Level" value={child.gradeLevel} />
                            <InfoField label="School Name" value={child.schoolName} />
                        </div>
                        <InfoField label="Favorite Subject" value={child.favoriteSubject} />
                        <InfoField label="Hobbies & Interests" value={child.hobbies} />
                    </>
                )}

                {ageNum >= 10 && ageNum <= 12 && (
                    <>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', marginTop: '1.5rem', borderBottom: '2px solid #edf2f7', paddingBottom: '0.5rem' }}>Pre-Teen Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <InfoField label="Grade Level" value={child.gradeLevel} />
                            <InfoField label="School Name" value={child.schoolName} />
                        </div>
                        <InfoField label="Favorite Subject" value={child.favoriteSubject} />
                        <InfoField label="Hobbies & Interests" value={child.hobbies} />
                        <InfoField label="Extracurriculars" value={child.extracurricularActivities} />
                    </>
                )}

                <Button variant="secondary" onClick={onClose} className="w-full justify-center mt-6">Close</Button>
            </motion.div>
        </div>
    );
};

const AddChildModal = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState('👶'); // Default avatar
    const fileInputRef = React.useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // Base64 image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !age) return;

        let theme = 'kid';
        if (age >= 3 && age <= 5) theme = 'toddler';
        else if (age >= 13) theme = 'teen';

        onAdd({ name, age, theme, avatar });
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
                    {/* File Input for Avatar Selection */}
                    <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                    />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                        <div 
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                width: '80px', height: '80px', borderRadius: '50%', background: '#f8fafc',
                                border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', cursor: 'pointer', position: 'relative', overflow: 'hidden'
                            }}>
                            {avatar.startsWith('data:image') ? (
                                <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                avatar
                            )}
                            <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Camera size={12} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>Upload Photo</span>
                            {avatar !== '👶' && (
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-danger, #e53e3e)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setAvatar('👶')}>Remove</span>
                            )}
                        </div>
                    </div>

                    <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah" />
                    <Input label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 6" />
                    <Button variant="primary" type="submit" className="mt-2">Add Child</Button>
                </form>
            </motion.div>
        </div>
    );
};

export const EditChildModal = ({ child, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: child.name || '',
        avatar: child.avatar || '👶',
        age: child.age || '',
        gender: child.gender || '',
        height: child.height || '',
        weight: child.weight || '',
        dob: child.dob || '',
        dominantHand: child.dominantHand || '',
        primaryLanguage: child.primaryLanguage || '',
        allergies: child.allergies || '',
        gradeLevel: child.gradeLevel || '',
        schoolName: child.schoolName || '',
        favoriteSubject: child.favoriteSubject || '',
        hobbies: child.hobbies || '',
        extracurricularActivities: child.extracurricularActivities || ''
    });

    const fileInputRef = React.useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result })); // Base64 image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(child.id, formData);
        onClose();
    };

    const ageNum = parseInt(formData.age, 10) || 0;

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <motion.div
                className="custom-scrollbar"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ background: 'white', padding: '2rem', borderRadius: '24px', width: '400px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}
            >
                <div className="flex-between mb-4">
                    <h2 className="text-xl font-bold">Edit Profile 📝</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                    {/* File Input for Avatar Selection */}
                    <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                    />

                    {/* Avatar Upload/Select UI at the very top */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem', marginTop: '-0.5rem' }}>
                        <div 
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                width: '90px', height: '90px', borderRadius: '50%', background: '#f8fafc',
                                border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden'
                            }}>
                            {formData.avatar.startsWith('data:image') ? (
                                <img src={formData.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                formData.avatar
                            )}
                            <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                                <Camera size={14} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>Upload Photo</span>
                            {formData.avatar !== '👶' && (
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-danger, #e53e3e)', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleChange('avatar', '👶')}>Remove</span>
                            )}
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '0 0 -0.5rem 0' }}>Basic Info</h3>
                    <Input label="Name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                        <div style={{ flex: 1 }}>
                            <Input label="Age" type="number" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Select label="Gender" options={['Boy', 'Girl', 'Other']} value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                        <div style={{ flex: 1 }}>
                            <Input label="Height (cm)" type="number" value={formData.height} onChange={(e) => handleChange('height', e.target.value)} placeholder="e.g. 110" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Input label="Weight (kg)" type="number" value={formData.weight} onChange={(e) => handleChange('weight', e.target.value)} placeholder="e.g. 20" />
                        </div>
                    </div>

                    <Input label="Birthdate" type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} />

                    {ageNum >= 3 && ageNum <= 5 && (
                        <>
                            <div style={{ height: '1px', background: '#e2e8f0', margin: '0.5rem 0' }}></div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '0 0 -0.5rem 0' }}>Toddler Details</h3>
                            <Select label="Dominant Hand" options={['Left', 'Right', 'Still Developing']} value={formData.dominantHand} onChange={(e) => handleChange('dominantHand', e.target.value)} />
                            <Input label="Primary Language Spoken at Home" value={formData.primaryLanguage} onChange={(e) => handleChange('primaryLanguage', e.target.value)} placeholder="e.g. English, Spanish" />
                            <Input label="Allergies / Special Medical Notes" value={formData.allergies} onChange={(e) => handleChange('allergies', e.target.value)} placeholder="e.g. Peanuts, Dairy" />
                        </>
                    )}

                    {ageNum >= 6 && ageNum <= 9 && (
                        <>
                            <div style={{ height: '1px', background: '#e2e8f0', margin: '0.5rem 0' }}></div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '0 0 -0.5rem 0' }}>Learner Details</h3>
                            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <Input label="Current Grade Level" value={formData.gradeLevel} onChange={(e) => handleChange('gradeLevel', e.target.value)} placeholder="e.g. 2nd Grade" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Input label="School Name" value={formData.schoolName} onChange={(e) => handleChange('schoolName', e.target.value)} placeholder="e.g. Lincoln Elementary" />
                                </div>
                            </div>
                            <Input label="Favorite Subject" value={formData.favoriteSubject} onChange={(e) => handleChange('favoriteSubject', e.target.value)} placeholder="e.g. Math, Science, Art" />
                            <Input label="Hobbies & Interests" value={formData.hobbies} onChange={(e) => handleChange('hobbies', e.target.value)} placeholder="e.g. Space, Dinosaurs, Drawing" />
                        </>
                    )}

                    {ageNum >= 10 && ageNum <= 12 && (
                        <>
                            <div style={{ height: '1px', background: '#e2e8f0', margin: '0.5rem 0' }}></div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '0 0 -0.5rem 0' }}>Pre-Teen Details</h3>
                            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <Input label="Current Grade Level" value={formData.gradeLevel} onChange={(e) => handleChange('gradeLevel', e.target.value)} placeholder="e.g. 6th Grade" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Input label="School Name" value={formData.schoolName} onChange={(e) => handleChange('schoolName', e.target.value)} placeholder="e.g. MLK Middle" />
                                </div>
                            </div>
                            <Input label="Favorite Subject" value={formData.favoriteSubject} onChange={(e) => handleChange('favoriteSubject', e.target.value)} placeholder="e.g. History, Biology" />
                            <Input label="Hobbies & Interests" value={formData.hobbies} onChange={(e) => handleChange('hobbies', e.target.value)} placeholder="e.g. Coding, Video Games, Sports" />
                            <Input label="Extracurricular Activities" value={formData.extracurricularActivities} onChange={(e) => handleChange('extracurricularActivities', e.target.value)} placeholder="e.g. Soccer, Band, Chess Club" />
                        </>
                    )}

                    <Button variant="primary" type="submit" className="mt-4">Save Details</Button>
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
    const [viewingChild, setViewingChild] = useState(null);

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

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                    {user?.children?.map((child, index) => (
                        <div key={index} style={{ flex: '1 1 280px', maxWidth: '350px' }}>
                            <ProfileCard
                                {...child}
                                progress={child.progress || 0}
                                onLaunch={() => handleLaunch(child)}
                                onEdit={() => setEditingChild(child)}
                                onInfo={() => setViewingChild(child)}
                            />
                        </div>
                    ))}

                    {/* Add New Placeholder Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setIsAddModalOpen(true)}
                        style={{
                            flex: '1 1 280px',
                            maxWidth: '350px',
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
                    {viewingChild && (
                        <ViewInfoModal 
                            child={viewingChild} 
                            onClose={() => setViewingChild(null)} 
                        />
                    )}
                </AnimatePresence>
            </div>
        </ParentLayout>
    );
};

export default ChildProfilesPage;
