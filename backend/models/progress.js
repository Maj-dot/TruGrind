const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    currentWeight: { 
        type: Number, 
        required: true 
    },
    targetWeight: { 
        type: Number, 
        required: true 
    },
    milesRun: { 
        type: String, 
        required: true 
    },
    weightsLifted: { 
        type: String, 
        required: true 
    },   
    notes: { type: String        
    },
}, {timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);