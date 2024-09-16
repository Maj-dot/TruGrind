const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercise');

// All paths start with '/api/exercise'

// POST /api/exercise
router.post('/', exerciseCtrl.create);

// GET /api/exercise
router.get('/', exerciseCtrl.index);

module.exports = router; 