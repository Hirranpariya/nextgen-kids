import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeChild, setActiveChild] = useState(() => {
        try {
            const stored = localStorage.getItem('nextgen_active_child');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error("Failed to parse active child", error);
            return null;
        }
    });

    // New state for activities and inventory
    const [inventory, setInventory] = useState(() => {
        try {
            const stored = localStorage.getItem('nextgen_inventory');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to parse inventory", error);
            return [];
        }
    });

    const [unlockedActivities, setUnlockedActivities] = useState(() => {
        try {
            // Clear any existing stored data to reset unlock state
            localStorage.removeItem('nextgen_unlocked_activities');
            localStorage.removeItem('nextgen_inventory');
            localStorage.removeItem('nextgen_explorer_points');
            
            // Return initial state: Math activities + first Science activity
            return ['fuel-mixer', 'balance-beam', 'area-architect', 'power-grid'];
        } catch (error) {
            console.error("Failed to initialize unlocked activities", error);
            return ['fuel-mixer', 'balance-beam', 'area-architect', 'power-grid'];
        }
    });

    const [explorerPoints, setExplorerPoints] = useState(() => {
        try {
            const stored = localStorage.getItem('nextgen_explorer_points');
            return stored ? parseInt(stored) : 0;
        } catch (error) {
            console.error("Failed to parse explorer points", error);
            return 0;
        }
    });

    // Simulate checking for a logged-in user on mount
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('nextgen_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error("Failed to restore user", e);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock API Call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Allow any login for now as requested
                if (email && password) {
                    const mockUser = {
                        id: '123',
                        name: 'Jane Doe',
                        email: email,
                        role: 'parent',
                        children: [{ id: 'c1', name: 'Tommy', age: 5, theme: 'toddler', avatar: '🦁' }]
                    };
                    setUser(mockUser);
                    localStorage.setItem('nextgen_user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800);
        });
    };

    const register = async (userData) => {
        // Mock API Call
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = {
                    id: Date.now().toString(),
                    ...userData,
                    role: 'parent',
                    children: [{ ...userData.child, id: Date.now().toString(), avatar: '👶' }]
                };
                setUser(newUser);
                localStorage.setItem('nextgen_user', JSON.stringify(newUser));
                resolve(newUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        setActiveChild(null);
        localStorage.removeItem('nextgen_user');
        localStorage.removeItem('nextgen_active_child');
    };

    const selectChild = (child) => {
        setActiveChild(child);
        localStorage.setItem('nextgen_active_child', JSON.stringify(child));
    };

    const exitChildMode = () => {
        setActiveChild(null);
        localStorage.removeItem('nextgen_active_child');
    };

    // Add child to user profile
    const addChild = (childData) => {
        const updatedUser = {
            ...user,
            children: [...(user.children || []), { ...childData, id: Date.now().toString() }]
        };
        setUser(updatedUser);
        localStorage.setItem('nextgen_user', JSON.stringify(updatedUser));
    };

    // Update child profile
    const updateChild = (childId, updatedData) => {
        if (!user || !user.children) return;

        const updatedChildren = user.children.map(c =>
            c.id === childId ? { ...c, ...updatedData } : c
        );
        const updatedUser = { ...user, children: updatedChildren };
        setUser(updatedUser);
        localStorage.setItem('nextgen_user', JSON.stringify(updatedUser));

        // If updating the active child, update that state too
        if (activeChild && activeChild.id === childId) {
            const newActive = { ...activeChild, ...updatedData };
            setActiveChild(newActive);
            localStorage.setItem('nextgen_active_child', JSON.stringify(newActive));
        }
    };

    // Activity and inventory functions
    const addToInventory = (item) => {
        const newInventory = [...inventory, item];
        setInventory(newInventory);
        localStorage.setItem('nextgen_inventory', JSON.stringify(newInventory));
    };

    const unlockActivity = (activityId) => {
        if (!unlockedActivities.includes(activityId)) {
            const newUnlocked = [...unlockedActivities, activityId];
            setUnlockedActivities(newUnlocked);
            localStorage.setItem('nextgen_unlocked_activities', JSON.stringify(newUnlocked));
        }
    };

    const addExplorerPoints = (points) => {
        const newTotal = explorerPoints + points;
        setExplorerPoints(newTotal);
        localStorage.setItem('nextgen_explorer_points', newTotal.toString());
    };

    const completeActivity = (activityId, reward) => {
        addToInventory(reward.item);
        addExplorerPoints(reward.points);
        unlockActivity(reward.unlocksNext);
    };

    return (
        <AuthContext.Provider value={{ 
            user, login, register, logout, loading, activeChild, selectChild, exitChildMode, addChild, updateChild,
            inventory, unlockedActivities, explorerPoints, addToInventory, unlockActivity, addExplorerPoints, completeActivity
        }}>
            {children}
        </AuthContext.Provider>
    );
};
