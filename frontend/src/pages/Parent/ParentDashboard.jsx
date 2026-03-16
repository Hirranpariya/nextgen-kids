import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParentLayout from '../../layouts/ParentLayout';
import StatCard from '../../components/dashboard/StatCard';
import ProfileCard from '../../components/dashboard/ProfileCard';
import { EditChildModal, ViewInfoModal } from '../Parent/ChildProfilesPage';
import SimpleBarChart from '../../components/dashboard/SimpleBarChart';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, Brain, AlertCircle, Plus, Users, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const ParentDashboard = () => {
    const navigate = useNavigate();
    const { user, selectChild, updateChild } = useAuth();
    const [editingChild, setEditingChild] = useState(null);
    const [viewingChild, setViewingChild] = useState(null);

    // Fallback chart data
    const chartData = [
        { day: 'Mon', value: 45 },
        { day: 'Tue', value: 60 },
        { day: 'Wed', value: 30 },
        { day: 'Thu', value: 80 },
        { day: 'Fri', value: 50 },
        { day: 'Sat', value: 90 },
        { day: 'Sun', value: 70 },
    ];

    const handleAddChild = () => {
        navigate('/parent/profiles'); // Redirect to profiles page to add
    };

    const handleLaunchChild = (child) => {
        selectChild(child);
        const age = parseInt(child.age);
        if (age >= 3 && age <= 5) {
            navigate('/dashboard/toddler');
        } else if (age >= 6 && age <= 9) {
            navigate('/dashboard/young-learner');
        } else if (age >= 10 && age <= 12) {
            navigate('/dashboard/explorer');
        } else {
            navigate('/dashboard/toddler');
        }
    };

    return (
        <ParentLayout>
            <div className="mb-8">
                <h1 className="text-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p className="text-muted">Welcome back, {user?.name || 'Parent'}. Here's how the family is doing.</p>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard icon={Clock} label="Total Screen Time" value="2h 15m" trend={-5} color="#63B3ED" />
                <StatCard icon={Brain} label="Activities Done" value="12" trend={15} color="#9F7AEA" />
                <StatCard icon={Star} label="Skills Mastered" value="5" trend={8} color="#F687B3" />
            </div>

            {/* Main Content Grid - 2/3 + 1/3 Layout */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>

                {/* LEFT COLUMN */}
                <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Activity Section */}
                    <div className="card">
                        <div className="flex-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold">Activity Overview</h3>
                                <p className="text-sm text-muted">Weekly progress comparison</p>
                            </div>
                            <select className="input-base" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                                <option>All Kids</option>
                                {user?.children?.map(child => (
                                    <option key={child.id} value={child.id}>{child.name}</option>
                                ))}
                            </select>
                        </div>
                        <SimpleBarChart data={chartData} />
                    </div>

                    {/* Community Invite */}
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '2rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                                <Users size={32} color="white" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold mb-1">Join the Community</h3>
                                <p className="opacity-90 max-w-md">Connect with other parents, share experiences, and get expert advice on raising digital natives.</p>
                            </div>
                            <Button
                                variant="secondary"
                                style={{ background: 'white', color: '#764ba2', border: 'none', padding: '0.75rem 1.5rem', fontWeight: 'bold' }}
                                onClick={() => navigate('/parent/community')}
                            >
                                Explore Groups
                            </Button>
                        </div>
                    </div>

                    {/* Alerts Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 ml-1 flex items-center gap-2">
                            <AlertCircle size={20} className="text-orange-500" /> Recent Alerts
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Mock Alert 1 */}
                            <div className="card p-5 flex items-start gap-4" style={{ borderLeft: '4px solid #F56565' }}>
                                <div className="p-2 bg-red-50 rounded-lg text-red-500">
                                    <Clock size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800">Screen Time Warning</h4>
                                        <span className="text-xs text-gray-400">2h ago</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Tommy exceeded his daily limit on "Arcade Games".</p>
                                </div>
                            </div>
                            {/* Mock Alert 2 */}
                            <div className="card p-5 flex items-start gap-4" style={{ borderLeft: '4px solid #48BB78' }}>
                                <div className="p-2 bg-green-50 rounded-lg text-green-500">
                                    <Star size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800">New Achievement</h4>
                                        <span className="text-xs text-gray-400">5h ago</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Sarah completed "Math Wizard Level 1".</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <div className="flex-between mb-4 ml-1">
                            <h3 className="text-lg font-bold">My Kids</h3>
                            <Button variant="ghost" size="sm" onClick={handleAddChild} icon={Plus} style={{ color: 'var(--color-primary)' }}>
                                Manage
                            </Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Dynamic Child List */}
                            {user?.children?.length > 0 ? (
                                user.children.map((child) => (
                                    <ProfileCard
                                        key={child.id}
                                        name={child.name}
                                        age={child.age}
                                        theme={parseInt(child.age) >= 9 ? 'explorer' : parseInt(child.age) >= 6 ? 'young-learner' : 'toddler'}
                                        avatar={child.avatar}
                                        progress={Math.floor(Math.random() * 40) + 40} // Mock progress for now
                                        onLaunch={() => handleLaunchChild(child)}
                                        onEdit={() => setEditingChild(child)}
                                        onInfo={() => setViewingChild(child)}
                                    />
                                ))
                            ) : (
                                <div className="card p-8 text-center border-2 border-dashed border-gray-100 shadow-none">
                                    <div className="text-4xl mb-3">👨👩👧👦</div>
                                    <p className="text-muted mb-4 font-bold">No profiles added yet.</p>
                                    <Button onClick={handleAddChild} fullWidth>Add Your First Child</Button>
                                </div>
                            )}

                            {/* Quick Add Button */}
                            <button
                                onClick={handleAddChild}
                                className="w-full p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold bg-white/50"
                            >
                                <Plus size={20} /> Add Another Profile
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Widget */}
                    <div className="card bg-white">
                        <h3 className="text-md font-bold mb-4 flex items-center gap-2">
                            <Brain size={18} className="text-purple-500" /> Insights
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <span className="text-sm text-gray-500">Weekly Average</span>
                                <span className="font-bold text-gray-700">1h 45m / day</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <span className="text-sm text-gray-500">Most Active</span>
                                <span className="font-bold text-gray-700">Tommy</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Next Milestone</span>
                                <span className="font-bold text-purple-600">Reading Level 2</span>
                            </div>
                            <div className="pt-2 mt-2">
                                <Button variant="ghost" size="sm" icon={ArrowRight} style={{ width: '100%', justifyContent: 'center' }}>View Full Report</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
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
        </ParentLayout>
    );
};

export default ParentDashboard;
