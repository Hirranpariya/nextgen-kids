const express = require('express');
const router = express.Router();
const { addChild } = require('../controllers/users');
const { protect } = require('../middleware/auth');

router.route('/children').post(protect, addChild);

module.exports = router;
