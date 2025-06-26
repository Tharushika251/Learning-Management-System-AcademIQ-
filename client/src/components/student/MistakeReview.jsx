import { useLocation, useNavigate } from 'react-router-dom';

const MistakeReview = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const quiz = state?.quiz;
    const userAnswers = state?.userAnswers;

    if (!quiz || !userAnswers) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
                No mistake data to show.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 relative">
            <div className="max-w-4xl mx-auto">
                <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-red-700 dark:text-red-400">
                        ❌ Mistake Review
                    </h1>

                    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 w-full sm:w-auto text-sm text-gray-700 dark:text-gray-300">
                        <h3 className="font-semibold mb-3">Answer Key Guide</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded border border-green-500 bg-green-100"></div>
                            <span>Correct Answer</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border border-red-500 bg-red-100"></div>
                            <span>Your Answer (Wrong)</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {quiz.questions.map((question, index) => {
                        const selected = userAnswers[index];
                        const correct = question.correctAnswer;

                        if (selected === correct) return null;

                        return (
                            <div
                                key={index}
                                className="p-6 rounded-xl shadow-md border border-red-300 bg-white dark:bg-gray-800"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Q{index + 1}: {question.questionText}
                                </h2>

                                <div className="space-y-3">
                                    {question.options.map((option, i) => {
                                        const isSelected = i === selected;
                                        const isCorrect = i === correct;

                                        const baseClasses =
                                            'px-4 py-2 rounded-md border transition-all';
                                        let styleClasses =
                                            'border-gray-300 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200';

                                        if (isSelected && !isCorrect) {
                                            styleClasses =
                                                'border-red-500 bg-red-100 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-300';
                                        }

                                        if (isCorrect) {
                                            styleClasses =
                                                'border-green-500 bg-green-100 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-300';
                                        }

                                        return (
                                            <div key={i} className={`${baseClasses} ${styleClasses}`}>
                                                {option}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/student/quizzes')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
                    >
                        🔙 Back to Quiz List
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default MistakeReview;
