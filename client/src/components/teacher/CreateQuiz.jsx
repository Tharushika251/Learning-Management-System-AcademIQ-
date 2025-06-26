import { useState } from 'react';
import api from '../../utils/fetchapi'; 

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;
        const s = parseInt(seconds) || 0;
        const duration = h * 3600 + m * 60 + s;

        if (duration === 0) {
            alert("Please set at least one duration field (hour/minute/second)");
            return;
        }

        await api.createQuiz({ title, questions, duration });

        // Reset
        setTitle('');
        setHours('');
        setMinutes('');
        setSeconds('');
        setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
        ]);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="font-bold text-3xl mb-6 text-gray-800 dark:text-gray-100">Create Quiz</h2>

            <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gray-300 dark:border-gray-700 p-6 space-y-6 bg-white dark:bg-gray-800 shadow-md"
            >
                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Quiz Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter quiz title"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">Quiz Duration</label>
                    <div className="flex gap-4">
                        {[{ value: hours, set: setHours, placeholder: "Hours" },
                        { value: minutes, set: setMinutes, placeholder: "Minutes" },
                        { value: seconds, set: setSeconds, placeholder: "Seconds" }]
                            .map((field, idx) => (
                                <input
                                    key={idx}
                                    type="number"
                                    min="0"
                                    value={field.value}
                                    onChange={(e) => field.set(e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                />
                            ))}
                    </div>
                </div>

                {/* Questions */}
                {questions.map((q, index) => (
                    <div
                        key={index}
                        className="relative rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-4 mb-6"
                    >
                        <p className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                            Question {index + 1}
                        </p>

                        {questions.length > 1 && (
                            <button
                                type="button"
                                onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                                aria-label={`Delete question ${index + 1}`}
                                title="Delete question"
                            >
                                ✖️
                            </button>
                        )}

                        <input
                            type="text"
                            placeholder="Question text"
                            value={q.questionText}
                            onChange={e => {
                                const updated = [...questions];
                                updated[index].questionText = e.target.value;
                                setQuestions(updated);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
                        />

                        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Options</label>
                        {q.options.map((opt, i) => (
                            <input
                                key={i}
                                type="text"
                                placeholder={`Option ${i + 1}`}
                                value={opt}
                                onChange={e => {
                                    const updated = [...questions];
                                    updated[index].options[i] = e.target.value;
                                    setQuestions(updated);
                                }}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2"
                            />
                        ))}

                        <label className="block font-medium mt-3 mb-1 text-gray-700 dark:text-gray-300">Correct Answer</label>
                        <select
                            value={q.correctAnswer}
                            onChange={e => {
                                const updated = [...questions];
                                updated[index].correctAnswer = +e.target.value;
                                setQuestions(updated);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                            <option value={0}>Option 1</option>
                            <option value={1}>Option 2</option>
                            <option value={2}>Option 3</option>
                            <option value={3}>Option 4</option>
                        </select>

                        {index === questions.length - 1 && (
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                    onClick={addQuestion}
                                >
                                    Add Question
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Save Quiz
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CreateQuiz;
