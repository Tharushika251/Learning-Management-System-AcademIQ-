import { useEffect, useState } from 'react';
import { api } from '../../utils/fetchapi';
import PropTypes from 'prop-types';
import { Search, Clock, ListChecks } from 'lucide-react'; // optional icons

const QuizList = ({ onSelectQuiz }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await api.getQuizzesBySet();
                setQuizzes(data);
                setFilteredQuizzes(data);
            } catch {
                setError('Failed to fetch quizzes');
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    useEffect(() => {
        const filtered = quizzes.filter(quiz =>
            quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredQuizzes(filtered);
    }, [searchQuery, quizzes]);

    if (loading) return <div className="text-center py-10 text-gray-500 dark:text-gray-300">Loading quizzes...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">📚 All Quizzes</h2>

            {/* Search Input */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search quizzes by title..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-black dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-300 col-span-full text-center">No quizzes found.</p>
                ) : (
                    filteredQuizzes.map(quiz => (
                        <div
                            key={quiz._id}
                            onClick={() => onSelectQuiz(quiz._id)}
                            className="cursor-pointer p-5 rounded-2xl shadow-md bg-white dark:bg-slate-700 hover:shadow-xl dark:hover:bg-slate-600 transition duration-300 border border-gray-200 dark:border-gray-600"
                        >
                            <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">{quiz.title}</h3>
                            <p className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
                                <Clock className="w-4 h-4 mr-2 text-blue-500" /> Duration: {quiz.duration} seconds
                            </p>
                            <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <ListChecks className="w-4 h-4 mr-2 text-green-500" /> Questions: {quiz.questions.length}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

QuizList.propTypes = {
    onSelectQuiz: PropTypes.func.isRequired,
};

export default QuizList;
