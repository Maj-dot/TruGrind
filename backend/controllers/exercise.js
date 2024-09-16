const Exercise = require("../models/exercise");

module.exports = {
  create,
  index,
  show, 
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
            .sort({createdAt: "desc"});
            console.log(exercises);
        res.status(200).json(exercises);    
    } catch (err) {
        res.status(400).json(err);
    }
}

// Show exercise
async function show(req, res) {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId).populate(["user"]);
        res.status(200).json(exercise);
    } catch (err) {
        res.status(500).json({error: "Oops, try again!"})
    }
}
