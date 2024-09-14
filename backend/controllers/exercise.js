const Exercise = require('../models/exercise');

module.exports = {
    create,
};

// Create exercise
async function create(req, res) {
    try {
        const exerciseData = {
            ...req.body,
            user:req.user._id
        };

        const exercise = await Exercise.create(exerciseData);
        res.status(201).json(exercise);
    } catch (err) {
        res.status(400).json(err);
    }
}