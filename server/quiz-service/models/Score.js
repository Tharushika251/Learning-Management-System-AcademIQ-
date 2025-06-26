import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    studentId: { type: String, required: true }, // optional: replace with ObjectId if linking to users
    answers: [Number],
    score: Number,
    total: Number,
    timeTaken: { type: Number },
}, { timestamps: true });

export default mongoose.model('Score', scoreSchema);
