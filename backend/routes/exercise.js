const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercise');

// Create exercise
router.post('/', exerciseCtrl.createExercise);