import React, { useState } from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { User, Bell, Lock, Shield } from 'lucide-react';

const SettingsPage = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        alert("Settings saved! (Mock)");
    };

    return (
        <ParentLayout>
            <div className="mb-8">
                <h1 className="text-title text-2xl mb-2">Account Settings</h1>
                <p className="text-muted">Manage your profile and application preferences.</p>
            </div>

            <div style={{ maxWidth: '800px' }}>
                {/* Profile Section */}
                <div className="card mb-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <User size={20} /> Profile Information
                    </h2>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Full Name</label>
                            <input
                                type="text"
                                className="input-base"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Email Address</label>
                            <input
                                type="email"
                                className="input-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="card mb-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Bell size={20} /> Notifications
                    </h2>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div className="font-semibold">Push Notifications</div>
                            <div className="text-sm text-muted">Receive alerts about screen time limits.</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>

                {/* Security Section */}
                <div className="card mb-8">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Shield size={20} /> Security
                    </h2>
                    <Button variant="outline" icon={Lock}>Change Password</Button>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </div>
        </ParentLayout>
    );
};

export default SettingsPage;
