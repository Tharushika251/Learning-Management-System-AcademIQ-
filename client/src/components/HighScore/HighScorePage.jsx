import { useState } from 'react';
import HighScoreQuizList from './HighScoreQuizList';

const HighScorePage = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const handleSelectQuiz = (quiz) => {
        setSelectedQuiz(quiz);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Quiz High Scores</h1>
            <HighScoreQuizList
                onSelectQuiz={handleSelectQuiz}
                selectedQuizId={selectedQuiz?._id}
            />
        </div>
    );
};

export default HighScorePage;
