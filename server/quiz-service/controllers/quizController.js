import Quiz from '../models/Quiz.js';

export const createQuiz = async (req, res) => {
    try {
        let { title, duration, questions, setId } = req.body;

        // Validate fields
        if (!title || !duration || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: 'Missing required fields or invalid format' });
        }

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.questionText || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.correctAnswer !== 'number') {
                return res.status(400).json({ message: `Invalid question format at index ${i}` });
            }
        }

        // Auto-generate numeric setId if not provided
        if (!setId) {
            const latestQuiz = await Quiz.findOne().sort({ setId: -1 });
            const nextSetId = latestQuiz && !isNaN(latestQuiz.setId)
                ? latestQuiz.setId + 1
                : 1;
            setId = Number(nextSetId);
        }

        const quiz = await Quiz.create({ title, duration, questions, setId });
        res.status(201).json({ message: 'Quiz created', quiz });

    } catch (err) {
        console.error('💥 Error creating quiz:', err);
        res.status(500).json({ message: err.message });
    }
};

export const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getQuizzesBySet = async (req, res) => {
    try {
        const { setId, page = 1, limit = 10 } = req.query;
        const filter = setId ? { setId } : {};
        const quizzes = await Quiz.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};  

export const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Quiz.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.json(updated);
    } catch (err) {
        console.error('💥 Error updating quiz:', err);
        res.status(500).json({ message: 'Failed to update quiz' });
    }
};

export const deleteQuiz = async (req, res) => {
    try {
        const deleted = await Quiz.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Quiz not found' });

        console.log(`✅ Quiz ${req.params.id} deleted`);
        res.json({ message: 'Quiz deleted successfully' });
    } catch (err) {
        console.error('💥 Error deleting quiz:', err);
        res.status(500).json({ message: err.message });
    }
};

export const deleteQuizSet = async (req, res) => {
    try {
        const { setId } = req.params;
        console.log('🧪 Deleting quizzes with setId:', setId);

        const quizzes = await Quiz.find({ setId });
        console.log(`🔍 Found ${quizzes.length} quizzes with setId ${setId}`);

        if (quizzes.length === 0) {
            return res.status(404).json({ message: 'No quizzes found for this setId' });
        }

        const result = await Quiz.deleteMany({ setId });
        console.log(`✅ Deleted ${result.deletedCount} quizzes for set ${setId}`);
        res.json({ message: `${result.deletedCount} quizzes deleted for set ${setId}` });
    } catch (err) {
        console.error('💥 Error deleting quiz set:', err);
        res.status(500).json({ message: err.message });
    }
};

export const getAllQuizSets = async (req, res) => {
    try {
        const sets = await Quiz.distinct('setId');
        res.json(sets);
    } catch (err) {
        console.error('💥 Error fetching quiz sets:', err);
        res.status(500).json({ message: 'Failed to fetch quiz sets' });
    }
};



