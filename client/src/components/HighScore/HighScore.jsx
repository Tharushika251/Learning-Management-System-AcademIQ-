import { useEffect, useState } from 'react';
import { api } from '../../utils/fetchapi';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

const HighScore = ({ quiz }) => {
    const [scores, setScores] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchScores = async () => {
            setLoading(true);
            try {
                const data = await api.getScoresByQuizId(quiz._id);
                console.log('Raw scores data:', data);

                const scoresWithStudents = await Promise.all(
                    data.map(async (score) => {
                        try {
                            const student = await api.getStudentById(score.studentId);
                            console.log('Student data:', student);

                            return {
                                ...score,
                                studentName: student?.name || student?.username || student?.email || 'Unknown Student'
                            };
                        } catch (error) {
                            console.error(`Error fetching student ${score.studentId}:`, error);
                            return {
                                ...score,
                                studentName: `Student ${score.studentId}`
                            };
                        }
                    })
                );
                setScores(scoresWithStudents);
            } catch (error) {
                console.error('Error fetching scores:', error);
            } finally {
                setLoading(false);
            }
        };

        if (quiz?._id) fetchScores();
    }, [quiz]);

    const sortedScores = [...scores].sort((a, b) =>
        sortOrder === 'desc' ? b.score - a.score : a.score - b.score
    );

    const toggleSort = () => {
        setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
    };

    if (!quiz) return <div className="text-center mt-10">Select a quiz to view scores.</div>;

    if (loading) return <div className="text-center mt-10">Loading scores...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-6 p-4 border rounded shadow">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Scores for: {quiz.title}</h2>
                <button onClick={toggleSort} className="text-blue-600 hover:text-blue-800">
                    {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                </button>
            </div>
            <table className="w-full mt-4 border">
                <thead>
                    <tr className="bg-gray-200 dark:text-black">
                        <th className="p-2 border">Student Name</th>
                        <th className="p-2 border">Score</th>
                        <th className="p-2 border">Time Taken (s)</th>
                        <th className="p-2 border">Submitted At</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedScores.map((s, idx) => (
                        <tr key={idx} className="text-center">
                            <td className="p-2 border">{s.studentName}</td>
                            <td className="p-2 border">{s.score}</td>
                            <td className="p-2 border">{s.timeTaken || '-'}</td>
                            <td className="p-2 border">{new Date(s.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

HighScore.propTypes = {
    quiz: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }),
};

export default HighScore;