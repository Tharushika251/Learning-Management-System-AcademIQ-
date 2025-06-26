import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [loginError, setLoginError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { success, error } = await login({
                email: formData.email,
                password: formData.password
            });

            if (success) {
                const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
                sessionStorage.removeItem('redirectAfterLogin');
                navigate(redirectUrl || '/');
            } else {
                setLoginError(error || 'Login failed. Please try again.');
            }
        } catch (err) {
            setLoginError('An unexpected error occurred. Please try again.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-slate-900 dark:to-slate-800 p-6">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold font-serif text-primary-900 dark:text-white mb-2">
                        🎓 Academ<span className="text-blue-600">IQ ⏱️</span>
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        Ready to level up?<br />
                        Conquer timed quizzes and turn mistakes into mastery.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white transition-all duration-200"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white transition-all duration-200"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                Remember me
                            </label>
                            <a href="#" className="text-blue-700 hover:underline dark:text-blue-400">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-95"
                        >
                            Sign In
                        </button>
                        {loginError && (
                            <p className="text-sm text-red-600 mt-2 text-center">{loginError}</p>
                        )}
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Not a member?{' '}
                        <Link to="/register" className="font-medium text-blue-700 dark:text-blue-400 hover:underline">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
