import Score from '../models/Score.js';
import Quiz from '../models/Quiz.js';

export const submitScore = async (req, res) => {
    try {
        const { quizId, answers, studentId, timeTaken} = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const correctAnswers = quiz.questions.map(q => q.correctAnswer);
        const total = correctAnswers.length;
        const score = correctAnswers.reduce((acc, cur, i) => acc + (cur === answers[i] ? 1 : 0), 0);

        const saved = await Score.create({ quizId, answers, score, total, studentId, timeTaken });
        res.status(201).json({ score, total });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getScoresByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const scores = await Score.find({ studentId }).populate('quizId', 'title');
        // populate quiz title for display
        res.status(200).json(scores);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getScoresByQuizId = async (req, res) => {
    try {
        const { quizId } = req.params;

        const scores = await Score.find({ quizId })
            .sort({ score: -1 }) // Default descending
            .select('studentId score timeTaken createdAt') // Select relevant fields
            .lean();

        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error fetching scores for quiz' });
    }
};

