const express = require('express');
const router = express.Router();
const workoutPlanCtrl = require('../controllers/workoutPlan');

// All routes start with '/api/workoutPlans'

// POST '/api/workoutPlans'
router.post('/', workoutPlanCtrl.createWorkoutPlan);

module.exports = router;