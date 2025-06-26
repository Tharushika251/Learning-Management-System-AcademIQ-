import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/fetchapi';

const StudentQuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleQuizClick = (quizId) => {
        navigate(`/student/exam/${quizId}`);
    };

    if (loading) return <div className="text-center py-20 text-lg font-semibold">Loading quizzes...</div>;
    if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">📚 Available Quizzes</h2>

                <div className="mb-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="🔍 Search quizzes by title..."
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {filteredQuizzes.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-300">No quizzes found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredQuizzes.map((quiz) => (
                            <div
                                key={quiz._id}
                                className="cursor-pointer p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition duration-200"
                                onClick={() => handleQuizClick(quiz._id)}
                            >
                                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                                    {quiz.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    ⏱ <span className="font-medium">Duration:</span> {quiz.duration} seconds
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    📋 <span className="font-medium">Questions:</span> {quiz.questions.length}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentQuizList;
