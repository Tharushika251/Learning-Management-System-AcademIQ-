import express from 'express';
import { submitScore, getScoresByStudent, getScoresByQuizId } from '../controllers/scoreController.js';

const router = express.Router();

router.post('/score/submit', submitScore);
router.get('/score/student/:studentId', getScoresByStudent);
router.get('/score/quiz/:quizId', getScoresByQuizId);


export default router;
