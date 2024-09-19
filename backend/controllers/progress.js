const Progress = require('../models/progress');

module.exports = { 
    addProgress, 
    getProgress,
    updateProgress,
    deleteProgress,
}

//  Get users progress 
async function getProgress(req,res) {
    try{
        const progressData = await Progress.find({ user: req.user._id });
        res.status(200).json(progressData);
    } catch (err) {
        res.status(400).json({ error: 'Unable to retrieve progress data'})
    }
}

// Add Progress 
async function addProgress(req, res) {
    try {      
        const progress = new Progress({
            user: req.user._id,
            currentWeight: req.body.currentWeight,
            targetWeight: req.body.targetWeight,
            milesRun: req.body.milesRun,
            weightsLifted: req.body.weightsLifted,
            notes: req.body.notes,
        });
        await progress.save();
        res.status(201).json(progress);
    } catch (err) {
        console.error('Error adding progress:', err);
        res.status(400).json({ error: ' Unable to add progress data ', err});
    }
}

// Update Progress 
async function updateProgress(req, res) {
    try {
        const updatedProgress = await Progress.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        res.status(200).json(updatedProgress);
    } catch (err) {
        res.status(400).json({ error: 'Unable to update progress data' });
    }
}

// Delete Progress 
async function deleteProgress(req, res) {
    try {
        await Progress.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Progress entry deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Unable to delete progress data' });
    }
}

