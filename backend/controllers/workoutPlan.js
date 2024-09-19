const mongoose = require('mongoose');
const workoutPlan = require("../models/workoutPlan");
const WorkoutPlan = require("../models/workoutPlan");

module.exports = {
  createWorkoutPlan,
  indexWorkoutPlan,
  showWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan
};

// Create workout
async function createWorkoutPlan(req, res) {
  try {
    const workoutPlan = new WorkoutPlan({
      planName: req.body.planName,
      goalDescription: req.body.goalDescription,
      targetValue: req.body.targetValue,
      currentValue: req.body.currentValue,
      deadline: req.body.deadline,
      exercises: req.body.exercises,
      user: req.user._id,
    });
    await workoutPlan.save();
    res.status(201).json(workoutPlan);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error creating workout plan." });
  }
}

// Index workout
async function indexWorkoutPlan(req, res) {
  const userId = req.user._id;
  const workoutPlans = await WorkoutPlan.find({ user: userId }).sort({
    createdAt: "desc",
  });
  res.status(200).json(workoutPlans);
}

// Show workout
async function showWorkoutPlan(req, res) {
  console.log(req.params);
  const workoutPlan = await WorkoutPlan.findOne({
    _id: req.params.workoutPlanId,
    user: req.user._id,    
  }).populate('exercises'); 
  console.log('After populate:', workoutPlan);
  if (!workoutPlan)
    return res
      .status(404)
      .json({ error: "Workout Plan not found or not authorized" });
  res.status(200).json(workoutPlan);
}

// Update workout
async function updateWorkoutPlan(req, res) {
    try {
        
      const workoutPlanId = req.params.workoutPlanId;
      const userId = req.user._id;  
      console.log("Received workoutPlanId:", workoutPlanId);
      if (!mongoose.Types.ObjectId.isValid(workoutPlanId)) {
        return res.status(400).json({ err: "Invalid workout plan ID format." });
      }
      const updatedWorkoutPlan = await WorkoutPlan.findOneAndUpdate(
        { _id: workoutPlanId, user: userId },  
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedWorkoutPlan) {
        return res.status(404).json({ err: "Workout plan not found or not authorized." });
      }
      res.status(200).json(updatedWorkoutPlan);
    } catch (err) {
      console.log(err)  
      res.status(500).json({ error: "Oops, something went wrong!", err });
    }
  }

  // Delete workout
  async function deleteWorkoutPlan(req, res) {
    try {
      const workoutPlanId  = req.params.workoutPlanId;
      const userId = req.user._id;
      if (!mongoose.Types.ObjectId.isValid(workoutPlanId)) {
        return res.status(400).json({ err: "Invalid workout plan ID format."});
      }
      const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
      if (!workoutPlan) {
        return res.status(404).json({err: "Whoops, workout plan not found!"});
      }
      if (!workoutPlan.user.equals(userId)) {
        return res.status(403).json({ err: "You don't have permission to delete this!"});
      }
      await WorkoutPlan.findByIdAndDelete(workoutPlanId);
    res.status(200).json({ message: "Workout plan deleted successfully!"});
    } catch (err) {
      res.status(500).json({ err: "Oops, something went wrong!" });
    }
  }