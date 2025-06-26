import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import api from '../utils/api';

const StudentQuiz = ({ quizId }) => {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(null);

    useEffect(() => {
        api.get(`/quizzes/${quizId}`).then(res => {
            setQuiz(res.data);
            setTimeLeft(res.data.duration * 60);
            setAnswers(new Array(res.data.questions.length).fill(null));
        });
    }, [quizId]);

    useEffect(() => {
        const handleSubmit = () => {
            api.post('/score/submit', { quizId, answers })
                .then(res => setScore(res.data));
        };

        const interval = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(interval);
                    handleSubmit();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [quizId, answers]);      

    const handleSubmit = () => {
        api.post('/score/submit', { quizId, answers })
            .then(res => setScore(res.data));
    };

    if (!quiz) return <p>Loading...</p>;
    if (score) return <p>Score: {score.score} / {score.total}</p>;

    const currentQuestion = quiz.questions[currentIndex];
    return (
        <div className="flex">
            <div className="flex-grow p-4">
                <h1 className="text-xl font-bold">{quiz.title}</h1>
                <p>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)} minutes left</p>
                <p className="font-semibold">Question {currentIndex + 1}:</p>
                <p>{currentQuestion.questionText}</p>
                {currentQuestion.options.map((opt, i) => (
                    <div key={i}>
                        <input type="radio" name="option" value={i} checked={answers[currentIndex] === i} onChange={() => {
                            const updated = [...answers];
                            updated[currentIndex] = i;
                            setAnswers(updated);
                        }} /> {opt}
                    </div>
                ))}
                <div className="mt-4">
                    {currentIndex > 0 && <button onClick={() => setCurrentIndex(currentIndex - 1)}>Previous</button>}
                    {currentIndex < quiz.questions.length - 1
                        ? <button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>
                        : <button onClick={handleSubmit}>Submit</button>
                    }
                </div>
            </div>
            <div className="w-64 bg-gray-100 p-4">
                <p>Question {currentIndex + 1} of {quiz.questions.length}</p>
            </div>
        </div>
    );
};

StudentQuiz.propTypes = {
    quizId: PropTypes.string.isRequired,
};

export default StudentQuiz;