const WorkoutPlan = require('../models/workoutPlan');

module.exports = {
    createWorkoutPlan,
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