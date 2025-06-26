import { Routes, Route } from 'react-router-dom';
import Login from './pages/userService/login';
import Register from './pages/userService/register';
import Home from './pages/Home';
import Profile from './pages/userService/profile';
import CreateQuiz from './components/teacher/CreateQuiz';
import EditQuiz from './components/teacher/EditQuiz';
import QuizList from './components/teacher/QuizList';
import StudentQuizList from './components/student/StudentQuizList';
import StartExam from './components/student/StartExam';
import Result from './components/student/Result';
import MistakeReview from './components/student/MistakeReview';
import HighScorePage from './components/HighScore/HighScorePage';
import MyQuizzes from './components/teacher/MyQuizzes';

function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/teacher/create-quiz" element={<CreateQuiz />} />
      <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
      <Route path="/teacher/quizzes" element={<QuizList />} />

      <Route path="/student/quizzes" element={<StudentQuizList />} />
      <Route path="/student/exam/:quizId" element={<StartExam />} />
      <Route path="/result" element={<Result />} />
      <Route path="/mistakes" element={<MistakeReview />} />
      <Route path="/highScoreQuizList" element={<HighScorePage />} />
      <Route path="/myQuizzes" element={<MyQuizzes />} />




    </Routes>
  )
}

export default App
