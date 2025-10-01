const USER_SERVICE_API_URL = 'http://localhost:5000/api';
const QUIZ_SERVICE_API_URL = 'http://localhost:5001/api';

const fetchApi = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${endpoint}`, config);
        // console.log('API Request:', { endpoint, options });
        // console.log('API Response:', response);

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } else {

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            return { success: true };
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const api = {
    // User
    login: (credentials) =>
        fetchApi(USER_SERVICE_API_URL + '/users/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }),

    register: (userData) =>
        fetchApi(USER_SERVICE_API_URL + '/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        }),

    getCurrentUser: (user_id) =>
        fetchApi(USER_SERVICE_API_URL + '/users/' + user_id, {
            method: 'GET'
        }),

    editProfile: (userData, user_id) =>
        fetchApi(USER_SERVICE_API_URL + '/users/' + user_id, {
            method: 'PUT',
            body: JSON.stringify(userData)
        }),

    updateProfileImage: (userData, user_id) =>
        fetchApi(USER_SERVICE_API_URL + '/users/pic/' + user_id, {
            method: 'PUT',
            body: JSON.stringify(userData)
        }),

    getStudentById: (studentId) =>
        fetchApi(USER_SERVICE_API_URL + '/users/' + studentId, {
            method: 'GET'
        }),

    // getCurrentUser: (email) =>
    //     fetchApi(`${USER_SERVICE_API_URL}/users/${email}`),

    // Quiz Management (Teacher)
    createQuiz: (quizData) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quizzes', {
            method: 'POST',
            body: JSON.stringify(quizData)
        }),

    updateQuiz: (quizId, quizData) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quizzes/' + quizId, {
            method: 'PUT',
            body: JSON.stringify(quizData)
        }),

    getQuiz: (quizId) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quizzes/' + quizId, {
            method: 'GET'
        }),
    
    getAllQuizzes: () =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quizzes', {
            method: 'GET'
        }),          

    getAllQuizSets: () =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quiz-sets', {
            method: 'GET'
        }),        

    getQuizzesBySet: (queryParams = '') =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quizzes?' + queryParams, {
            method: 'GET'
        }),       

    deleteQuiz: (quizId) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quizzes/' + quizId, {
            method: 'DELETE',
        }),

    deleteQuizSet: (setId) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/quizzes/set/' + setId, {
            method: 'DELETE',
            }),

    //Score API (Student Quiz Submission)
    submitScore: (submission) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/score/submit', {
            method: 'POST',
            body: JSON.stringify(submission)
        }),

    getScoresByStudent: (studentId) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/score/student/' + studentId, {
            method: 'GET',
        }),
          
    getScoresByQuizId: (quizId) =>
        fetchApi(QUIZ_SERVICE_API_URL + '/score/quiz/' + quizId, {
            method: 'GET',
        }),
        
    
};

export default api;
