const mongoose = require('mongoose');
const exercise = require("../models/exercise");
const Exercise = require("../models/exercise");


module.exports = {
  create,
  index,
  show,
  update,
  deleteExercise
};

// Create exercise
async function create(req, res) {
  try {
    const exerciseData = {
      ...req.body,
      user: req.user._id,
    };
    const exercise = await Exercise.create(exerciseData);
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Index exercises
async function index(req, res) {
  try {
    const userId = req.user._id; 
    const exercises = await Exercise.find({ user: userId }) 
      .sort({ createdAt: 'desc' });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Show exercise
async function show(req, res) {
  try {
    console.log('Exercise ID:', req.params.exerciseId);
    const exercise = await Exercise.findOne({ _id: req.params.exerciseId, user: req.user._id });
    if (!exercise) return res.status(404).json({ error: "Exercise not found or not authorized" });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ error: "Oops, try again!" });
  }
}

// Update exercise
async function update(req, res) {
  try {
    const exerciseId = req.params.exerciseId;
    const userId = req.user._id;    
    if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
      return res.status(400).json({ err: "Invalid exercise ID format." });
    }
    const updatedExercise = await Exercise.findOneAndUpdate(
      { _id: exerciseId, user: userId },  
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedExercise) {
      return res.status(404).json({ err: "Exercise not found or not authorized." });
    }
    res.status(200).json(updatedExercise);
  } catch (err) {
    res.status(500).json({ error: "Oops, something went wrong!" });
  }
}

// Delete exercise
async function deleteExercise(req, res) {
  try {
    const { exerciseId } = req.params;
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
      return res.status(400).json({ err: "Invalid exercise ID format."});
    }
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({err: "Whoops, exercise not found!"});
    }
    if (!exercise.user.equals(userId)) {
      return res.status(403).json({ err: "You don't have permission to delete this!"});
    }
    await Exercise.findByIdAndDelete(exerciseId);
  res.status(200).json({ message: "Exercise deleted successfully!"});
  } catch (err) {
    res.status(500).json({ err: "Oops, something went wrong!" });
  }
}
