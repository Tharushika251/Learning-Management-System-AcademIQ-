import { useEffect, useState } from 'react';
import { api } from '../../utils/fetchapi';
import { useAuth } from '../../hooks/useAuth'; // adjust path based on your structure

const MyQuizzes = () => {
    const { currentUser, loading: authLoading } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyQuizzes = async () => {
            if (!currentUser?._id) return;

            try {
                const data = await api.getMyQuizzes(); // token is handled by fetchApi
                setQuizzes(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load your quizzes');
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchMyQuizzes();
        }
    }, [authLoading, currentUser]);

    if (authLoading || loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>

            {quizzes.length === 0 ? (
                <p className="text-gray-500">You haven’t created any quizzes yet.</p>
            ) : (
                <ul className="space-y-4">
                    {quizzes.map((quiz) => (
                        <li key={quiz._id} className="bg-white dark:bg-slate-800 p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">{quiz.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Duration: {quiz.duration} seconds | Questions: {quiz.questions.length}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyQuizzes;
