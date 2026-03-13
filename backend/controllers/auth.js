const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        console.log('>> Mock Register Request received:', req.body);
        
        // Mock User ID (since we aren't using Mongo)
        const mockId = 'mock_user_id_12345';

        // Create token
        const token = jwt.sign({ id: mockId }, process.env.JWT_SECRET || 'secret', {
            expiresIn: process.env.JWT_EXPIRE || '30d'
        });

        // Return token AND user object (Frontend likely needs this to succeed)
        res.status(200).json({ 
            success: true, 
            token,
            user: {
                username: username || 'Mock User',
                email: email || 'mock@example.com',
                role: 'user',
                children: []
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate username & password existence
        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an username and password' });
        }

        // Check for user
        // MOCK MODE: Accept any login
        const user = {
            _id: 'mock_user_id_12345',
            username: username,
            password: password // In real app, this would be hashed
        };

        console.log('>> Mock Login Request for:', username);
        
        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: process.env.JWT_EXPIRE || '30d'
        });

        res.status(200).json({ 
            success: true, 
            token,
            user: {
                username: user.username,
                email: 'mock@example.com',
                role: 'user',
                children: []
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    // const user = await User.findById(req.user.id);
    
    const user = {
        _id: 'mock_user_id_12345',
        username: 'Mock User',
        email: 'mock@example.com',
        role: 'user',
        children: []
    };

    res.status(200).json({
        success: true,
        data: user
    });
};
