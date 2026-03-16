const User = require('../models/User');

// @desc    Add a child to the logged in user
// @route   POST /api/users/children
// @access  Private
exports.addChild = async (req, res, next) => {
    try {
        const { username } = req.body;

        console.log('>> Mock Add Child Request:', username);

        // Mock response without Database
        const mockChildren = [{ username: username || 'MockChild' }];

        res.status(201).json({
            success: true,
            data: mockChildren
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
