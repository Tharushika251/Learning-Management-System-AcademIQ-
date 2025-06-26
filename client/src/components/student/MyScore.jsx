import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../utils/fetchapi';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MyScore = () => {
    const { currentUser } = useAuth();
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Ref to the container holding all the charts + tables
    const reportRef = useRef(null);

    useEffect(() => {
        if (!currentUser?.user_id) return;

        const fetchScores = async () => {
            try {
                setLoading(true);
                const data = await api.getScoresByStudent(currentUser.user_id);
                setScores(data);
            } catch {
                setError('Failed to load scores');
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [currentUser]);

    const groupedScores = scores.reduce((acc, score) => {
        const title = score.quizId?.title || 'Unknown Quiz';
        if (!acc[title]) acc[title] = [];
        acc[title].push(score);
        return acc;
    }, {});

    // Generate PDF
    const generatePDF = async () => {
        if (!reportRef.current) return;

        const doc = new jsPDF('p', 'pt', 'a4');
        const padding = 20;
        const pdfWidth = doc.internal.pageSize.getWidth();

        // Use html2canvas to capture the whole report container
        const canvas = await html2canvas(reportRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        // Calculate dimensions to fit in PDF page width (maintaining aspect ratio)
        const imgProps = doc.getImageProperties(imgData);
        const imgWidth = pdfWidth - padding * 2;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        let position = padding;

        // If image height exceeds page height, you might want to split it into pages
        // For simplicity, here just add the image and save

        doc.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight);
        doc.save(`quiz-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    if (loading) return <div className="text-center mt-10">Loading your scores...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Quiz Scores</h1>
                <button
                    onClick={generatePDF}
                    className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Download Report (PDF)
                </button>
            </div>

            {scores.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">You have not taken any quizzes yet.</p>
            ) : (
                <div ref={reportRef} className="space-y-10">
                    {Object.entries(groupedScores).map(([title, quizScores]) => {
                        const chartData = [...quizScores]
                            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                            .map((s, index) => ({
                                attempt: `Attempt ${index + 1}`,
                                score: s.score,
                                date: new Date(s.createdAt).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                }),
                            }));

                        return (
                            <div key={title} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h2>
                                <table className="w-full mb-4 text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-300 dark:border-gray-600">
                                            <th className="py-2 px-4">Score</th>
                                            <th className="py-2 px-4">Total</th>
                                            <th className="py-2 px-4">Date Taken</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quizScores.map(score => (
                                            <tr
                                                key={score._id}
                                                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <td className="py-2 px-4 font-semibold text-green-600 dark:text-green-400">
                                                    {score.score}
                                                </td>
                                                <td className="py-2 px-4">{score.total}</td>
                                                <td className="py-2 px-4 text-sm text-gray-600 dark:text-gray-300">
                                                    {new Date(score.createdAt).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Score Progression Chart */}
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="attempt" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="score" stroke="#34D399" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        );
                    })}
                </div>
              )}
        </div>
    );
};

export default MyScore;




