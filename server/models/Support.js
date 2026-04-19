import { Schema, model } from "mongoose";

const supportSchema = Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: {
         type: String,
          required: true 
        },
    type: { 
        type: String, 
        enum: ['suggestion', 'problem'], 
        default: 'suggestion' 
    },
    subject: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'resolved'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

const Support = model('Support', supportSchema);

export default Support