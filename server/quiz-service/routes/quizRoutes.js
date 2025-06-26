import express from 'express';
import {
    createQuiz,
    getQuiz,
    getQuizzesBySet,
    getAllQuizSets,
    updateQuiz,
    deleteQuiz,
    deleteQuizSet,    
} from '../controllers/quizController.js';

const router = express.Router();

router.post('/quizzes', createQuiz);
router.get('/quizzes/:id', getQuiz);
router.get('/quizzes', getQuizzesBySet);
router.get('/quiz-sets', getAllQuizSets);
router.put('/quizzes/:id', updateQuiz); 
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);
router.delete('/quizzes/set/:setId', deleteQuizSet);

export default router;
