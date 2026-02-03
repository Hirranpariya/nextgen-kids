import React from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import { Bell, Heart, Star, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationItem = ({ type, title, time, isRead }) => {
    let Icon = Bell;
    let color = '#718096';
    let bg = '#EDF2F7';

    switch (type) {
        case 'wellness': Icon = Heart; color = '#E53E3E'; bg = '#FFF5F5'; break;
        case 'achievement': Icon = Star; color = '#ECC94B'; bg = '#FFFFF0'; break;
        case 'alert': Icon = AlertCircle; color = '#DD6B20'; bg = '#FFFAF0'; break;
        case 'success': Icon = Check; color = '#48BB78'; bg = '#F0FFF4'; break;
        default: break;
    }

    return (
        <motion.div
            whileHover={{ x: 5 }}
            className={`flex items-center gap-4 p-4 rounded-xl mb-3 ${isRead ? 'opacity-75' : 'bg-white shadow-sm border border-gray-100'}`}
            style={{ background: 'white' }}
        >
            <div style={{ padding: '0.75rem', borderRadius: '50%', background: bg, color: color }}>
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-500">{time}</p>
            </div>
            {!isRead && <div className="w-3 h-3 bg-red-500 rounded-full" />}
        </motion.div>
    );
};

const NotificationsPage = () => {
    const notifications = [
        { type: 'achievement', title: "Tommy earned the 'Early Riser' badge! ⭐", time: "2 hours ago", isRead: false },
        { type: 'wellness', title: "Time to update Sarah's growth stats.", time: "5 hours ago", isRead: false },
        { type: 'alert', title: "Subscription renewal upcoming.", time: "1 day ago", isRead: true },
        { type: 'success', title: "Welcome to NextGen Kids!", time: "2 days ago", isRead: true },
    ];

    return (
        <ParentLayout>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="flex-between mb-8">
                    <div>
                        <h1 className="text-title" style={{ fontSize: '2rem' }}>Notifications 🔔</h1>
                        <p className="text-muted">Stay updated with your child's progress and app alerts.</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    {notifications.map((n, i) => <NotificationItem key={i} {...n} />)}
                </div>

                <div className="text-center mt-8 text-sm text-gray-400">
                    You're all caught up!
                </div>
            </div>
        </ParentLayout>
    );
};

export default NotificationsPage;
