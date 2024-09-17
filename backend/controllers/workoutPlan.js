const WorkoutPlan = require('../models/workoutPlan');

module.exports = {
    createWorkoutPlan,
    indexWorkoutPlan,
};

// Create workout
async function createWorkoutPlan(req,res) {
    try {
        const workoutPlan = new WorkoutPlan({
            planName: req.body.planName,
            goalDescription: req.body.goalDescription,
            targetValue: req.body.targetValue,
            user: req.user._id,
        });
        await workoutPlan.save();
        res.status(201).json(workoutPlan);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error creating workout plan.'});
    }
}

// Index workout
async function indexWorkoutPlan(req,res) {
        const userId = req.user._id; 
        const workoutPlans = await WorkoutPlan.find({ user: userId }) 
          .sort({ createdAt: 'desc' });
        res.status(200).json(workoutPlans);
}

// Show workout