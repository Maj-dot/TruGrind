const express = require('express');
const router = express.Router();
const workoutPlanCtrl = require('../controllers/workoutPlan');

// All paths start with '/api/workoutPlans'

// POST '/api/workoutPlans'
router.post('/', workoutPlanCtrl.createWorkoutPlan);

// GET '/api/workoutPlans'
router.get('/', workoutPlanCtrl.indexWorkoutPlan);

// GET '/api/workoutPlans/:workoutPlanId'
router.get('/:workoutPlanId', workoutPlanCtrl.showWorkoutPlan);

// PUT '/api/workoutPlans/:workoutPlanId'
router.put('/:workoutPlanId', workoutPlanCtrl.updateWorkoutPlan);

// DELETE '/api/workoutPlans/:workoutPlanId'
router.delete('/:workoutPlanId', workoutPlanCtrl.deleteWorkoutPlan);


module.exports = router;