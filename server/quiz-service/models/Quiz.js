import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctAnswer: Number,
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true }, // in seconds
    setId: { type: Number, required: true },
    questions: [questionSchema],
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);
