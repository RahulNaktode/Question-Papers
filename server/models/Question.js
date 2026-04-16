import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    paperUrl: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Question = model('Question', questionSchema);

export default Question;