import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate checking for a logged-in user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('nextgen_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock API Call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const mockUser = {
                        id: '123',
                        name: 'Jane Doe',
                        email: email,
                        role: 'parent',
                        children: [{ name: 'Tommy', age: 5, theme: 'toddler' }]
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
                    children: [userData.child] // Assuming simplified structure for now
                };
                setUser(newUser);
                localStorage.setItem('nextgen_user', JSON.stringify(newUser));
                resolve(newUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nextgen_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
