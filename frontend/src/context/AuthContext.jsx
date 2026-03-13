import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const AuthContext = createContext(null);

// Set token for axios instance
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeChild, setActiveChild] = useState(() => {
        try {
            const stored = localStorage.getItem('nextgen_active_child');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            return null;
        }
    });

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('nextgen_token');
            if (token) {
                setAuthToken(token);
                try {
                    const res = await axios.get(`${API_URL}/auth/me`);
                    setUser(res.data.data);
                } catch (err) {
                    console.error('Failed to load user', err);
                    // logout(); 
                    // MOCK MODE FIX: If DB is off, keep user logged in with fake data on refresh
                    setUser({
                        _id: 'mock_user_id_12345',
                        username: 'Mock User (Restored)',
                        email: 'mock@example.com',
                        role: 'user',
                        children: []
                    });
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (username, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, { username, password });
        localStorage.setItem('nextgen_token', res.data.token);
        setAuthToken(res.data.token);
        // MOCK MODE: Use the user data directly from login response to avoid DB call to /me
        setUser(res.data.user);
    };

    const register = async (userData) => {
        const res = await axios.post(`${API_URL}/auth/register`, userData);
        localStorage.setItem('nextgen_token', res.data.token);
        setAuthToken(res.data.token);
        // MOCK MODE: Use the user data directly from register response to avoid DB call to /me
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem('nextgen_token');
        setAuthToken(null);
        setUser(null);
        setActiveChild(null);
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

    const addChild = async (childData) => {
        // MOCK MODE: Bypass backend to avoid DB connection errors
        // const res = await axios.post(`${API_URL}/users/children`, childData);
        
        const newChild = { ...childData, _id: Date.now().toString() };
        
        setUser(prevUser => ({
            ...prevUser,
            children: [...(prevUser.children || []), newChild]
        }));
    };
    
    // The rest of the functions (updateChild, inventory, etc.) would also need to be converted
    // to use the backend API. For now, they will remain as they are.

    const [inventory, setInventory] = useState([]);
    const [unlockedActivities, setUnlockedActivities] = useState(['fuel-mixer', 'balance-beam', 'area-architect', 'power-grid', 'formal-flyer', 'tense-transformer', 'word-root-tree', 'pattern-code', 'direction-detective', 'number-pyramid']);
    const [explorerPoints, setExplorerPoints] = useState(0);


    const updateChild = (childId, updatedData) => {
        // This should be an API call
        console.log('Updating child (not implemented with API yet)', childId, updatedData);
    };

    const addToInventory = (item) => {
        // This should be an API call
        console.log('Adding to inventory (not implemented with API yet)', item);
    };

    const unlockActivity = (activityId) => {
        // This should be an API call
        console.log('Unlocking activity (not implemented with API yet)', activityId);
    };

    const addExplorerPoints = (points) => {
        // This should be an API call
        console.log('Adding points (not implemented with API yet)', points);
    };

    const completeActivity = (activityId, reward) => {
        // This should be an API call
        console.log('Completing activity (not implemented with API yet)', activityId, reward);
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
