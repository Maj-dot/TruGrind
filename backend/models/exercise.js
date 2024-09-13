const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exercise_id: {
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
        type: Number, 
        required: true,
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },    
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);