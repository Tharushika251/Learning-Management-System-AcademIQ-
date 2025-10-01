// import { useEffect, useState } from 'react';
// import { api } from '../../utils/fetchapi';
// import { Trash2, PlusCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const EditQuiz = ({ quizId, onBack }) => {
//     const [quiz, setQuiz] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [durationHMS, setDurationHMS] = useState({ hours: 0, minutes: 0, seconds: 0 });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchQuiz = async () => {
//             try {
//                 const data = await api.getQuiz(quizId);
//                 setQuiz(data);
//                 const h = Math.floor(data.duration / 3600);
//                 const m = Math.floor((data.duration % 3600) / 60);
//                 const s = data.duration % 60;
//                 setDurationHMS({ hours: h, minutes: m, seconds: s });
//             } catch {
//                 setError('Failed to fetch quiz');
//             }
//         };
//         fetchQuiz();
//     }, [quizId]);    

//     const handleInputChange = (index, field, value) => {
//         const updatedQuestions = [...quiz.questions];
//         if (field === 'correctAnswer') {
//             updatedQuestions[index][field] = parseInt(value);
//         } else {
//             updatedQuestions[index][field] = value;
//         }
//         setQuiz({ ...quiz, questions: updatedQuestions });
//     };

//     const handleOptionChange = (qIdx, optIdx, value) => {
//         const updatedQuestions = [...quiz.questions];
//         updatedQuestions[qIdx].options[optIdx] = value;
//         setQuiz({ ...quiz, questions: updatedQuestions });
//     };

//     const handleDeleteQuestion = async (questionIndex) => {
//         if (!window.confirm('Are you sure you want to delete this question?')) return;

//         const updatedQuestions = quiz.questions.filter((_, idx) => idx !== questionIndex);
//         const updatedQuiz = { ...quiz, questions: updatedQuestions };

//         try {
//             setLoading(true);
//             const result = await api.updateQuiz(quiz._id || quiz.id, updatedQuiz);
//             setQuiz(result);
//         } catch {
//             setError('Failed to delete question');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteQuiz = async () => {
//         if (!window.confirm('Are you sure you want to delete this entire quiz?')) return;

//         try {
//             setLoading(true);
//             await api.deleteQuiz(quiz._id || quiz.id);
//             alert('Quiz deleted successfully!');
//             navigate('/teacher/quizzes'); 
//         } catch {
//             setError('Failed to delete quiz');
//         } finally {
//             setLoading(false);
//         }
//     };    

//     const handleAddQuestion = () => {
//         const newQuestion = {
//             questionText: '',
//             options: ['', '', '', ''],
//             correctAnswer: 0,
//         };
//         setQuiz((prev) => ({
//             ...prev,
//             questions: [...prev.questions, newQuestion],
//         }));
//     };

//     const handleSaveQuiz = async () => {
//         try {
//             setLoading(true);

//             // Convert HMS to total seconds
//             const totalDurationInSeconds =
//                 (durationHMS.hours * 3600) +
//                 (durationHMS.minutes * 60) +
//                 durationHMS.seconds;

//             const updatedQuiz = { ...quiz, duration: totalDurationInSeconds };

//             const result = await api.updateQuiz(quiz._id || quiz.id, updatedQuiz);
//             alert('Quiz updated successfully!');
//             setQuiz(result);
//         } catch {
//             setError('Failed to update quiz');
//         } finally {
//             setLoading(false);
//         }
//     };    

//     if (error) return <div className="text-red-600">{error}</div>;
//     if (!quiz) return <div>Loading quiz...</div>;

//     return (
//         <>
//             <div className="max-w-5xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <button
//                         onClick={onBack}
//                         className="text-blue-600 hover:underline text-sm font-medium"
//                     >
//                         ← Back to Quiz List
//                     </button>

//                     <button
//                         onClick={handleDeleteQuiz}
//                         disabled={loading}
//                         className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition disabled:opacity-50"
//                     >
//                         Delete Quiz
//                     </button>
//                 </div>

//                 {/* Search Input */}
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="Search questions..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-slate-900 text-black dark:text-white"
//                     />
//                 </div>

//                 <div className='border p-4'>
//                     <div className="mb-6 flex justify-between">
//                         <label className="block text-3xl font-semibold mb-2">Edit Quiz :</label>
//                         <input
//                             type="text"
//                             className="w-3/4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
//                             value={quiz.title}
//                             onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <label className="block text-lg font-medium mb-2">Duration</label>

//                         <div className="flex gap-4">
//                             {/* Hours */}
//                             <div className="flex flex-col items-center w-1/3">
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     value={durationHMS.hours}
//                                     onChange={(e) =>
//                                         setDurationHMS((prev) => ({ ...prev, hours: parseInt(e.target.value) || 0 }))
//                                     }
//                                     className="w-full text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
//                                 />
//                                 <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Hours</div>
//                             </div>

//                             {/* Minutes */}
//                             <div className="flex flex-col items-center w-1/3">
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     value={durationHMS.minutes}
//                                     onChange={(e) =>
//                                         setDurationHMS((prev) => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))
//                                     }
//                                     className="w-full text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
//                                 />
//                                 <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Minutes</div>
//                             </div>

//                             {/* Seconds */}
//                             <div className="flex flex-col items-center w-1/3">
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     value={durationHMS.seconds}
//                                     onChange={(e) =>
//                                         setDurationHMS((prev) => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))
//                                     }
//                                     className="w-full text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
//                                 />
//                                 <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Seconds</div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-6">
//                         {quiz.questions
//                             .filter((question) => {
//                                 const term = searchTerm.toLowerCase();
//                                 return (
//                                     question.questionText.toLowerCase().includes(term) ||
//                                     question.options.some(opt => opt.toLowerCase().includes(term))
//                                 );
//                             })                      
                        
//                             .map((question, index) => (
//                                 <div
//                                     key={index}
//                                     className="relative p-6 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm"
//                                 >
//                                     <button
//                                         onClick={() => handleDeleteQuestion(index)}
//                                         className="absolute top-4 right-4 text-red-500 hover:text-red-700"
//                                         title="Delete Question"
//                                     >
//                                         <Trash2 size={20} />
//                                     </button>

//                                     <label className="block font-semibold mb-1">
//                                         Question {index + 1}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-input w-full mb-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-black dark:text-white"
//                                         value={question.questionText}
//                                         onChange={(e) =>
//                                             handleInputChange(index, 'questionText', e.target.value)
//                                         }
//                                     />

//                                     <div className="space-y-2 mb-3">
//                                         <label className="block font-medium">Options</label>
//                                         {question.options.map((opt, i) => (
//                                             <input
//                                                 key={i}
//                                                 type="text"
//                                                 value={opt}
//                                                 onChange={(e) => handleOptionChange(index, i, e.target.value)}
//                                                 placeholder={`Option ${i + 1}`}
//                                                 className="form-input w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-black dark:text-white"
//                                             />
//                                         ))}
//                                     </div>

//                                     <div>
//                                         <label className="block font-medium mb-1">Correct Answer</label>
//                                         <select
//                                             value={question.correctAnswer}
//                                             onChange={(e) =>
//                                                 handleInputChange(index, 'correctAnswer', e.target.value)
//                                             }
//                                             className="form-select w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-black dark:text-white"
//                                         >
//                                             {question.options.map((_, i) => (
//                                                 <option key={i} value={i}>
//                                                     Option {i + 1}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             ))}
//                     </div>

//                     <div className="mt-8 flex flex-wrap gap-4 justify-end">
//                         <button
//                             onClick={handleAddQuestion}
//                             className="flex items-center gap-2 bg-primary-400 hover:bg-primary-600 text-white px-4 py-2 rounded font-medium transition"
//                         >
//                             <PlusCircle size={18} />
//                             Add Question
//                         </button>

//                         <button
//                             onClick={handleSaveQuiz}
//                             disabled={loading}
//                             className="bg-primary-800 hover:bg-primary-900 text-white px-6 py-2 rounded font-semibold transition disabled:opacity-60"
//                         >
//                             {loading ? 'Saving...' : 'Save All Changes'}
//                         </button>
//                     </div>

//                     {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
//                 </div>
//             </div>
//         </>    
//     );
// };

// EditQuiz.propTypes = {
//     quizId: PropTypes.string.isRequired,
//     onBack: PropTypes.func.isRequired,
// };

// export default EditQuiz;

import { useEffect, useState } from 'react';
import { api } from '../../utils/fetchapi';
import { Trash2, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditQuiz = ({ quizId, onBack }) => {
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [durationHMS, setDurationHMS] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await api.getQuiz(quizId);
                setQuiz(data);
                const h = Math.floor(data.duration / 3600);
                const m = Math.floor((data.duration % 3600) / 60);
                const s = data.duration % 60;
                setDurationHMS({ hours: h, minutes: m, seconds: s });
            } catch {
                setError('Failed to fetch quiz');
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleInputChange = (index, field, value) => {
        const updatedQuestions = [...quiz.questions];
        if (field === 'correctAnswer') {
            updatedQuestions[index][field] = parseInt(value);
        } else {
            updatedQuestions[index][field] = value;
        }
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleOptionChange = (qIdx, optIdx, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[qIdx].options[optIdx] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleDeleteQuestion = async (questionIndex) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        const updatedQuestions = quiz.questions.filter((_, idx) => idx !== questionIndex);
        const updatedQuiz = { ...quiz, questions: updatedQuestions };

        try {
            setLoading(true);
            const result = await api.updateQuiz(quiz._id || quiz.id, updatedQuiz);
            setQuiz(result);
        } catch {
            setError('Failed to delete question');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteQuiz = async () => {
        if (!window.confirm('Are you sure you want to delete this entire quiz?')) return;

        try {
            setLoading(true);
            await api.deleteQuiz(quiz._id || quiz.id);
            alert('Quiz deleted successfully!');
            navigate('/teacher/quizzes');
        } catch {
            setError('Failed to delete quiz');
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuestion = () => {
        const newQuestion = {
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
        };
        setQuiz((prev) => ({
            ...prev,
            questions: [...prev.questions, newQuestion],
        }));
    };

    const handleSaveQuiz = async () => {
        try {
            setLoading(true);
            setError('');

            // Convert HMS to total seconds
            const totalDurationInSeconds =
                (durationHMS.hours * 3600) +
                (durationHMS.minutes * 60) +
                durationHMS.seconds;

            const updatedQuiz = { ...quiz, duration: totalDurationInSeconds };

            const result = await api.updateQuiz(quiz._id || quiz.id, updatedQuiz);

            // Show success dialog
            setShowSuccessDialog(true);
            setQuiz(result);
        } catch (err) {
            setError('Failed to update quiz: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToQuizList = () => {
        setShowSuccessDialog(false);
        if (onBack) {
            onBack(); // Use the provided onBack function
        } else {
            navigate('/teacher/quizzes');
        }
    };

    if (error) return <div className="text-red-600">{error}</div>;
    if (!quiz) return <div>Loading quiz...</div>;

    return (
        <>
            {/* Success Dialog */}
            {showSuccessDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm mx-4 shadow-xl">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Quiz Updated!
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Your quiz has been updated successfully.
                            </p>
                            <button
                                onClick={handleNavigateToQuizList}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors w-full"
                            >
                                Back to Quiz List
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={onBack}
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        ← Back to Quiz List
                    </button>

                    <button
                        onClick={handleDeleteQuiz}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition disabled:opacity-50"
                    >
                        Delete Quiz
                    </button>
                </div>

                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-slate-900 text-black dark:text-white"
                    />
                </div>

                <div className='border p-4'>
                    <div className="mb-6 flex justify-between">
                        <label className="block text-3xl font-semibold mb-2">Edit Quiz :</label>
                        <input
                            type="text"
                            className="w-3/4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
                            value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-2">Duration</label>

                        <div className="flex gap-4">
                            {/* Hours */}
                            <div className="flex flex-col items-center w-1/3">
                                <input
                                    type="number"
                                    min="0"
                                    value={durationHMS.hours}
                                    onChange={(e) =>
                                        setDurationHMS((prev) => ({ ...prev, hours: parseInt(e.target.value) || 0 }))
                                    }
                                    className="w-full text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
                                />
                                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Hours</div>
                            </div>

                            {/* Minutes */}
                            <div className="flex flex-col items-center w-1/3">
                                <input
                                    type="number"
                                    min="0"
                                    value={durationHMS.minutes}
                                    onChange={(e) =>
                                        setDurationHMS((prev) => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))
                                    }
                                    className="w-full text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
                                />
                                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Minutes</div>
                            </div>

                            {/* Seconds */}
                            <div className="flex flex-col items-center w-1/3">
                                <input
                                    type="number"
                                    min="0"
                                    value={durationHMS.seconds}
                                    onChange={(e) =>
                                        setDurationHMS((prev) => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))
                                    }
                                    className="w-full text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white p-2"
                                />
                                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">Seconds</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {quiz.questions
                            .filter((question) => {
                                const term = searchTerm.toLowerCase();
                                return (
                                    question.questionText.toLowerCase().includes(term) ||
                                    question.options.some(opt => opt.toLowerCase().includes(term))
                                );
                            })

                            .map((question, index) => (
                                <div
                                    key={index}
                                    className="relative p-6 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm"
                                >
                                    <button
                                        onClick={() => handleDeleteQuestion(index)}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                        title="Delete Question"
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                    <label className="block font-semibold mb-1">
                                        Question {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full mb-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-black dark:text-white"
                                        value={question.questionText}
                                        onChange={(e) =>
                                            handleInputChange(index, 'questionText', e.target.value)
                                        }
                                    />

                                    <div className="space-y-2 mb-3">
                                        <label className="block font-medium">Options</label>
                                        {question.options.map((opt, i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                value={opt}
                                                onChange={(e) => handleOptionChange(index, i, e.target.value)}
                                                placeholder={`Option ${i + 1}`}
                                                className="form-input w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-black dark:text-white"
                                            />
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-1">Correct Answer</label>
                                        <select
                                            value={question.correctAnswer}
                                            onChange={(e) =>
                                                handleInputChange(index, 'correctAnswer', e.target.value)
                                            }
                                            className="form-select w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-black dark:text-white"
                                        >
                                            {question.options.map((_, i) => (
                                                <option key={i} value={i}>
                                                    Option {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4 justify-end">
                        <button
                            onClick={handleAddQuestion}
                            className="flex items-center gap-2 bg-primary-400 hover:bg-primary-600 text-white px-4 py-2 rounded font-medium transition"
                        >
                            <PlusCircle size={18} />
                            Add Question
                        </button>

                        <button
                            onClick={handleSaveQuiz}
                            disabled={loading}
                            className="bg-primary-800 hover:bg-primary-900 text-white px-6 py-2 rounded font-semibold transition disabled:opacity-60"
                        >
                            {loading ? 'Saving...' : 'Save All Changes'}
                        </button>
                    </div>

                    {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                </div>
            </div>
        </>
    );
};

EditQuiz.propTypes = {
    quizId: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default EditQuiz;