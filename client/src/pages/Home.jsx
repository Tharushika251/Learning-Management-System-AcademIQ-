import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
    const { darkMode } = useContext(ThemeContext);
    const { currentUser } = useAuth();

    const getStartedLink = currentUser ? '/profile' : '/login';

    return (
        <div className={`min-h-screen flex flex-col items-center justify-between bg-gradient-to-b ${darkMode ? 'from-gray-900 to-gray-700 text-white' : 'from-slate-100 to-slate-300 text-gray-900'}`}>
            {/* Hero Section */}
            <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Empower Learning Through Quizzes</h2>
                <p className="max-w-2xl text-lg md:text-xl mb-8">
                    An intuitive platform for students to take quizzes and for teachers to create and manage them.
                </p>
                <div className="space-x-4">
                    <Link
                        to={getStartedLink}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
                    >
                        Get Started
                    </Link>                    
                    <Link to="/highScoreQuizList" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-100 dark:hover:bg-gray-800 transition">View Leaderboard</Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
