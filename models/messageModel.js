import mongoose from "mongoose";
import { getLocalizedMessage } from "../config/messages.js";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        trim: true,
        required: [true, getLocalizedMessage('V001', 'validation')]
    },
    type: {
        type: String,
        enum: ['system', 'user'],
        requried: [true, getLocalizedMessage('V002', 'validation')]
    },
    userId: {
        type: String,
        trim: true,
        required: [true, getLocalizedMessage('V003', 'validation')]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Message', messageSchema);