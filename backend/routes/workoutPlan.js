const express = require('express');
const router = express.Router();
const workoutPlanCtrl = require('../controllers/workoutPlan');

// All routes start with '/api/workoutPlans'

// POST '/api/workoutPlans'
router.post('/', workoutPlanCtrl.createWorkoutPlan);

// GET '/api/workoutPlans'
router.get('/', workoutPlanCtrl.indexWorkoutPlan);

// GET '/api/workoutPlans/:workoutPlanId'
router.get('/:workoutPlanId', workoutPlanCtrl.showWorkoutPlan);


module.exports = router;