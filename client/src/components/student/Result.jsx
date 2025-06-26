import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../utils/fetchapi';

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [quizId, setQuizId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [toast, setToast] = useState(null); 

    const quizTitle = state?.quizTitle;
    const score = state?.score;
    const total = state?.total;
    const quizData = state?.quizData;
    const userAnswers = state?.userAnswers;

    // Calculate mistakes count
    const mistakesCount = quizData && userAnswers
        ? quizData.questions.reduce((count, question, i) => {
            if (userAnswers[i] !== question.correctAnswer) return count + 1;
            return count;
        }, 0)
        : 0;

    useEffect(() => {
        const fetchQuizIdByTitle = async () => {
            if (!quizTitle) return;

            try {
                const quizzes = await api.getQuizzesBySet();
                const matched = quizzes.find(q => q.title === quizTitle);
                if (matched) {
                    setQuizId(matched._id);
                } else {
                    setFetchError('Quiz not found by title');
                }
            } catch {
                setFetchError('Failed to load quiz ID');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizIdByTitle();
    }, [quizTitle]);

    const handleViewMistakesClick = () => {
        if (mistakesCount === 0) {
            setToast('No mistakes to show!');
            setTimeout(() => setToast(null), 3000);
        } else {
            navigate('/mistakes', {
                state: {
                    quiz: quizData,
                    userAnswers: userAnswers,
                }
            });
        }
    };

    if (loading) return <div className="text-center mt-20">Loading result...</div>;
    if (fetchError) return <div className="text-center mt-20 text-red-500">{fetchError}</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-slate-800">
            <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center relative">
                {toast && (
                    <div className="toast-toast-enter">
                        {toast}
                    </div>
                )}
                
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-2">
                        🎉 Congratulations!
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                        You have completed the quiz: <strong>{quizTitle}</strong>
                    </p>
                </div>

                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6 border border-green-300 dark:border-green-700">
                    <p className="text-xl font-semibold">
                        Your Score: <span className="text-2xl">{score}</span> / {total}
                    </p>
                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => navigate(`/student/exam/${quizId}`)}
                        disabled={!quizId}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg transition disabled:opacity-50"
                    >
                        🔁 Re-Attempt
                    </button>
                    <button
                        onClick={() => navigate('/student/quizzes')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
                    >
                        📚 Back to Quizzes
                    </button>
                    <button
                        onClick={handleViewMistakesClick}
                        className={`text-white font-medium px-4 py-2 rounded-lg transition
                            ${mistakesCount === 0
                                ? 'bg-red-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        ❌ View Mistakes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;
