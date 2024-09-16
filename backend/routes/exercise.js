const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercise');

// All paths start with '/api/exercise'

// POST /api/exercises
router.post('/', exerciseCtrl.create);

// GET /api/exercises
router.get('/', exerciseCtrl.index);

// GET /api/exercises/:exerciseId
router.get('/:exerciseId', exerciseCtrl.show);

// PUT /api/:exerciseId
router.put('/:exerciseId', exerciseCtrl.update);



module.exports = router; 