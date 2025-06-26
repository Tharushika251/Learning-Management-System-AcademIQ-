import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../utils/fetchapi';
import StudentQuiz from './StudentQuiz';

const StartExam = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [started, setStarted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await api.getQuiz(quizId);
                setQuiz(data);
            } catch {
                setError('Failed to load quiz');
            }
        };
        fetchQuiz();
    }, [quizId]);

    if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
    if (!quiz) return <div className="text-center mt-10">Loading quiz details...</div>;

    return (        
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
            <button
                onClick={() => {navigate('/student/quizzes'); }}
                className="mb-6 text-blue-600 hover:underline font-semibold"
            >
                ← Back to Quiz List
            </button>
            <div className="max-w-4xl mx-auto">
                {!started ? (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">
                            {quiz.title}
                        </h2>

                        <div className="text-gray-700 dark:text-gray-300 text-lg mb-6 space-y-2">
                            <p><strong>Duration:</strong> {quiz.duration} seconds</p>
                            <p><strong>Questions:</strong> {quiz.questions.length}</p>
                        </div>

                        <div className="text-left bg-blue-50 dark:bg-gray-700 p-4 rounded-md mb-6 text-m text-gray-800 dark:text-gray-200 border border-blue-200 dark:border-gray-600">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">📌 Instructions:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Each question has multiple options — choose the correct one.</li>
                                <li>You can navigate between questions using <strong>Prev</strong> and <strong>Next</strong>.</li>
                                <li>Once all questions are answered, you can <strong>Submit</strong> your quiz.</li>
                                <li>Unanswered questions will be marked as incorrect.</li>
                                <li>Results will be shown immediately after submission.</li>
                            </ul>
                        </div>

                        <button
                            onClick={() => setStarted(true)}
                            className="bg-green-600 hover:bg-green-700 transition text-white font-medium px-8 py-3 rounded-lg text-lg shadow-md"
                        >
                            Start Quiz
                        </button>
                    </div>
                ) : (
                    <StudentQuiz
                        quizId={quizId}
                        onBack={() => setStarted(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default StartExam;
