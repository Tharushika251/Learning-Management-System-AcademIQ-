import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('STUDENT');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        role: 'STUDENT',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTabChange = (role) => {
        setActiveTab(role);
        setFormData(prev => ({
            ...prev,
            role: role,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            profileImage: null,
            role: formData.role
        };

        const result = await register(userData);

        if (result.success) {
            navigate('/login');
        } else {
            setErrors(prev => ({
                ...prev,
                form: result.error
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }

        return newErrors;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-slate-900 dark:to-slate-800 p-4">
            <div className="w-full max-w-md space-y-6 mt-4">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold font-serif text-primary-900 dark:text-white mb-2">
                        🎓 Academ<span className="text-blue-600">IQ ⏱️</span>
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Join us to level up your learning journey!</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-slate-700">
                    {/* Tabs */}
                    <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300 dark:border-slate-700">
                        {['STUDENT', 'TEACHER'].map(role => (
                            <button
                                key={role}
                                onClick={() => handleTabChange(role)}
                                className={`w-1/2 py-2 transition-all duration-200 font-medium text-sm ${activeTab === role
                                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                                        : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                                    }`}
                            >
                                {role.charAt(0) + role.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-gray-900 dark:text-white"
                            />
                            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-gray-900 dark:text-white"
                            />
                            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-gray-900 dark:text-white"
                            />
                            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-gray-900 dark:text-white"
                            />
                            {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start space-x-2">
                            <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="acceptTerms" className="text-sm text-gray-700 dark:text-gray-300">
                                I accept the{' '}
                                <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                        {errors.acceptTerms && <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>}

                        {/* Form Error */}
                        {errors.form && (
                            <div className="rounded-xl bg-red-100 dark:bg-red-900/20 p-4 border border-red-300 dark:border-red-800">
                                <p className="text-sm text-red-700 dark:text-red-400">{errors.form}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            {activeTab === 'STUDENT' ? 'Create Student Account' : 'Create Teacher Account'}
                        </button>

                        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
