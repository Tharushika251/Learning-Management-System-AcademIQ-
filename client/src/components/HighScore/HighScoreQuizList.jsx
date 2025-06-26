import { useEffect, useState } from 'react';
import { api } from '../../utils/fetchapi';
import PropTypes from 'prop-types';
import HighScore from './HighScore';

const HighScoreQuizList = ({ onSelectQuiz, selectedQuizId }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
            const data = await api.getAllQuizzes();
            setQuizzes(data);
        };
        fetchQuizzes();
    }, []);

    const filteredQuizzes = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-secondary-900 rounded-lg shadow-md dark:shadow-lg transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-neutral-light">
                    All Quizzes
                </h2>
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search quizzes..."
                        className="w-full p-3 pl-4 pr-4 rounded-md border border-gray-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-neutral-light
                        placeholder-gray-400 dark:placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition"
                    />
                </div>
            </div>

            <div className="space-y-6">
                {filteredQuizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectQuiz(quiz)}
                        onKeyDown={(e) => e.key === 'Enter' && onSelectQuiz(quiz)}
                        className={`cursor-pointer p-5 rounded-lg border shadow-sm transition
                        ${selectedQuizId === quiz._id
                                ? 'bg-primary-50 border-primary-400 shadow-md dark:bg-primary-900 dark:border-primary-600'
                                : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow dark:bg-secondary-800 dark:border-secondary-700 dark:hover:bg-secondary-700 dark:hover:shadow-md'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-light">
                                {quiz.title}
                            </h3>

                            {selectedQuizId === quiz._id && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent re-selecting the quiz
                                        onSelectQuiz(null);
                                    }}
                                    className="text-sm px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 dark:bg-danger-600 dark:text-white dark:hover:bg-danger-500 transition"
                                >
                                    Clear Selection
                                </button>
                            )}
                        </div>

                        {selectedQuizId === quiz._id && (
                            <div className="mt-6 pt-6 border-t border-primary-300 dark:border-primary-600">
                                <HighScore quiz={quiz} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );    
};

HighScoreQuizList.propTypes = {
    onSelectQuiz: PropTypes.func.isRequired,
    selectedQuizId: PropTypes.string,
};

export default HighScoreQuizList;
