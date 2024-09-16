const mongoose = require('mongoose');
const exercise = require("../models/exercise");
const Exercise = require("../models/exercise");


module.exports = {
  create,
  index,
  show,
  update,
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
    const exercises = await Exercise.find({})
      .populate("user")
      .sort({ createdAt: "desc" });
    console.log(exercises);
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Show exercise
async function show(req, res) {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId).populate([
      "user",
    ]);
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ error: "Oops, try again!" });
  }
}

// Update exercise

async function update(req, res) {
  try {
      const { exerciseId } = req.params;
      const userId = req.user._id;
      if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
          return res.status(400).json({ err: "Invalid exercise ID format." });
      }
      const exercise = await Exercise.findById(exerciseId);
      if (!exercise) {
          return res.status(404).json({ err: "Whoops, exercise not found!." });
      }
      if (!exercise.user.equals(userId)) {
          return res.status(403).json({ err: "You don't have permission to update this exercise." });
      }
      const updatedExercise = await Exercise.findByIdAndUpdate(
          exerciseId,
          req.body,
          { new: true, runValidators: true }
      );
      res.status(200).json(updatedExercise);
  } catch (err) {
      res.status(500).json({ error: "Oops, something went wrong!" });
  }
}
