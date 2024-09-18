const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    
    exerciseid: {
        type: String,
        required: true,
    },
    type: {
        type: String, 
        required: true,
        enum: [
            'Cardio', 
            'Strength', 
            'Flexibility', 
            'Core', 
            'HIIT', 
            'Balance & Stability',
            'Mobility Workouts',
        ],
    },
    duration: {
        type: String, 
        required: true,
    },
    weight: {
        type: String,
    },
    reps: {
        type: String,
    },
    sets: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },    
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);