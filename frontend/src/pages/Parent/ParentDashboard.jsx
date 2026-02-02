import React from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import StatCard from '../../components/dashboard/StatCard';
import ProfileCard from '../../components/dashboard/ProfileCard';
import SimpleBarChart from '../../components/dashboard/SimpleBarChart';
import { Clock, Star, Brain, AlertCircle, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';

const ParentDashboard = () => {
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
        alert("Add Child feature coming soon!");
    };

    return (
        <ParentLayout>
            <div className="mb-6">
                <h1 className="text-title" style={{ fontSize: '2rem' }}>Dashboard Overview</h1>
                <p className="text-muted">Welcome back, Jane. Here's how the kids are doing.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-auto-fit gap-4 mb-8">
                <StatCard icon={Clock} label="Total Screen Time" value="2h 15m" trend={-5} color="#63B3ED" />
                <StatCard icon={Brain} label="Activities Done" value="12" trend={15} color="#9F7AEA" />
                <StatCard icon={Star} label="Skills Mastered" value="5" trend={8} color="#F687B3" />
            </div>

            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {/* Main Column */}
                <div className="flex flex-col gap-6">
                    {/* Chart Section */}
                    <div className="card">
                        <div className="flex-between mb-4">
                            <h3 className="text-lg font-bold">Activity this Week</h3>
                            <select className="input-base" style={{ width: 'auto', padding: '0.4rem 1rem' }}>
                                <option>All Kids</option>
                                <option>Tommy</option>
                                <option>Sarah</option>
                            </select>
                        </div>
                        <SimpleBarChart data={chartData} />
                    </div>

                    {/* Alerts Section */}
                    <div className="card">
                        <h3 className="text-lg font-bold mb-4">Recent Alerts</h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#FFF5F5', color: '#C53030' }}>
                                <AlertCircle size={24} />
                                <div>
                                    <div className="font-bold">Screen Time Limit Reached</div>
                                    <div className="text-sm">Tommy hit his 1h limit on "Arcade" genre.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Profiles */}
                <div>
                    <div className="flex-between mb-6">
                        <h3 className="text-lg font-bold">My Kids</h3>
                        <Button variant="ghost" size="sm" onClick={handleAddChild} icon={Plus} style={{ color: 'var(--color-primary)' }}>
                            Add New
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <ProfileCard
                            name="Tommy"
                            age={5}
                            theme="toddler"
                            avatar="🦁"
                            progress={80}
                        />
                        <ProfileCard
                            name="Sarah"
                            age={8}
                            theme="kid"
                            avatar="🚀"
                            progress={45}
                        />
                    </div>
                </div>
            </div>
        </ParentLayout>
    );
};

export default ParentDashboard;
