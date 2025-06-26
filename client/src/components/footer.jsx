import React from 'react';
import { BookOpenCheck, PlusSquare, Trophy } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-800">
            {/* Features Section */}
            <section className="py-12 px-6 md:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div>
                        <BookOpenCheck className="mx-auto mb-4 text-indigo-600" size={32} />
                        <h3 className="text-xl font-semibold mb-2">Take Timed Quizzes</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Track time, answer questions, and learn from your mistakes.
                        </p>
                    </div>
                    <div>
                        <PlusSquare className="mx-auto mb-4 text-indigo-600" size={32} />
                        <h3 className="text-xl font-semibold mb-2">Create & Manage</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Teachers can easily set up quizzes with questions and answer keys.
                        </p>
                    </div>
                    <div>
                        <Trophy className="mx-auto mb-4 text-indigo-600" size={32} />
                        <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Encourage healthy competition and track top scorers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom Bar */}
            <div className="w-full border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">AcademIQ</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
