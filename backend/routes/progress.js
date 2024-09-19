const express = require('express');
const router = express.Router();
const progressCtrl = require('../controllers/progress');

// All paths start with '/api/progress'

// GET '/api/progress'
router.get('/', progressCtrl.getProgress);

// POST '/api/progress'
router.post('/', progressCtrl.addProgress);

// GET '/api/progress/:id'
router.put('/:id', progressCtrl.updateProgress);

// DELETE '/api/progress/:id'
router.delete('/:id', progressCtrl.deleteProgress);

module.exports = router;