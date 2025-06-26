import { useEffect, useState, useRef } from 'react';
import { api } from '../../utils/fetchapi';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const StudentQuiz = ({ quizId }) => {
    const { currentUser } = useAuth();
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null); // seconds remaining
    const [isTimeUp, setIsTimeUp] = useState(false);
    
    const navigate = useNavigate();

    const timerRef = useRef(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await api.getQuiz(quizId);
                setQuiz(data);
                setTimeLeft(data.duration); // Initialize countdown with quiz duration
            } catch {
                setError('Failed to fetch quiz');
            }
        };
        fetchQuiz();
    }, [quizId]);

    // Start countdown timer
    useEffect(() => {
        if (timeLeft === null) return; // wait for quiz to load and timeLeft to be set

        if (timeLeft <= 0) {
            setIsTimeUp(true);
            clearInterval(timerRef.current);

            // Auto-submit answers here:
            handleSubmit()

            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsTimeUp(true);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleAnswerChange = (questionIndex, selectedIndex) => {
        if (isTimeUp) return; // disable answer changes after time up
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedIndex,
        }));
    };

    const handleSubmit = async () => {
        try {
            const answerArray = quiz.questions.map((_, i) =>
                answers[i] !== undefined ? answers[i] : -1
            );

            const studentId = currentUser?.user_id || 'guest';

            const { score, total } = await api.submitScore({
                quizId,
                studentId,
                answers: answerArray,
                timeTaken: quiz.duration - timeLeft, // how many seconds used
            });

            navigate('/result', {
                state: {
                    quizTitle: quiz.title,
                    score,
                    total,
                    timeTaken: quiz.duration - timeLeft,
                    quizData: quiz,              // Full quiz object
                    userAnswers: answerArray     // All selected answers
                },
            });            
            
        } catch {
            alert('Failed to submit answers');
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex === quiz.questions.length - 1) {
            if (window.confirm('Finish attempt and submit answers?')) {
                clearInterval(timerRef.current);
                handleSubmit();
            }
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    if (error) return <div className="text-red-600">{error}</div>;
    if (!quiz || timeLeft === null) return <div>Loading quiz...</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestionIndex];

    // Format timeLeft as MM:SS
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <div className="max-w-3xl mx-auto p-4">            
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
                <div
                    className={`text-lg font-bold ${isTimeUp ? 'text-red-600' : 'text-green-600'
                        }`}
                >
                    Time Left: {minutes}:{seconds}
                </div>
            </div>

            <div className="border p-6 rounded-md bg-white dark:bg-slate-800">
                <div className="border p-4 rounded bg-gray-50 dark:bg-gray-700 mb-4">
                    <p className="mb-4 text-gray-800 dark:text-gray-100">{currentQuestion.questionText}</p>

                    <div className="space-y-3">
                        {currentQuestion.options.map((opt, i) => (
                            <label
                                key={i}
                                className={`flex items-center gap-2 px-3 py-2 rounded border cursor-pointer transition ${selectedAnswer === i
                                        ? 'border-blue-500 bg-blue-100 dark:bg-blue-800'
                                        : 'border-gray-300 dark:border-gray-600'
                                    } ${isTimeUp ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestionIndex}`}
                                    value={i}
                                    checked={selectedAnswer === i}
                                    onChange={() => handleAnswerChange(currentQuestionIndex, i)}
                                    disabled={isTimeUp}
                                    className="form-radio text-blue-600 px-2"
                                />
                                <span className="text-gray-900 dark:text-white">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0 || isTimeUp}
                        className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isTimeUp}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Attempt' : 'Next'}
                    </button>
                </div>
            </div>

            {isTimeUp && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md text-center font-semibold">
                    Time is up! Your answers have been submitted automatically.
                </div>
            )}
        </div>
    );
};

StudentQuiz.propTypes = {
    quizId: PropTypes.string.isRequired,
};

export default StudentQuiz;
