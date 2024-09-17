const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutPlanSchema = new Schema({
    planName: {
        type: String,
        required: true,
    },
    goalDescription: {
        type: String,
        required: true,
    },
    targetValue: {
        type: Number,
        required: true,
    },
    currentValue: {
        type: Number,
        default: 0,
    },
    deadline: {
        type: Date,
        required: false,
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Exercise',
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });


module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);