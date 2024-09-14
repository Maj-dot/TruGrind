const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercise');

// POST /api/exercise
router.post('/', exerciseCtrl.create);

module.exports = router; 