import axios from '~/utils/axiosCustomize';
const postCreateNewUser = (email, username, password, role, image) => {
	//submit data
	const data = new FormData();
	data.append('email', email);
	data.append('username', username);
	data.append('password', password);
	data.append('role', role);
	data.append('userImage', image);
	return axios.post(`api/v1/participant`, data);
};

const getAllUsers = () => {
	return axios.get(`api/v1/participant/all`);
};

const putUpdateUser = (id, username, role, image) => {
	//submit data
	const data = new FormData();
	data.append('id', id);
	data.append('username', username);
	data.append('role', role);
	data.append('userImage', image);
	return axios.put(`api/v1/participant`, data);
};

const deleteUser = (userId) => {
	return axios.delete(`api/v1/participant`, { data: { id: userId } });
};

const getUserWidthPaginate = (page, limit) => {
	return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
	return axios.post(`api/v1/login`, { email, password });
};

const postRegister = (email, userName, password) => {
	return axios.post(`api/v1/register`, { email, userName, password });
};

const getQuizByUser = () => {
	return axios.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
	return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
	return axios.post(`/api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
	//submit data
	const data = new FormData();
	data.append('name', name);
	data.append('description', description);
	data.append('difficulty', difficulty);
	data.append('quizImage', image);
	return axios.post(`api/v1/quiz`, data);
};

const getAllQuizForAdmin = () => {
	return axios.get(`api/v1/quiz/all`);
};

const deleteQuizById = (id) => {
	return axios.delete(`api/v1/quiz/${id}`);
};

const putUpdateQuiz = (id, name, description, difficulty, image) => {
	//submit data
	const data = new FormData();
	data.append('id', id);
	data.append('name', name);
	data.append('description', description);
	data.append('difficulty', difficulty);
	data.append('quizImage', image);
	return axios.put(`api/v1/quiz`, data);
};
const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
	const data = new FormData();
	data.append('quiz_id', quiz_id);
	data.append('description', description);
	data.append('questionImage', image);
	return axios.post(`api/v1/question`, data);
};
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
	return axios.post(`api/v1/answer`, { description, correct_answer, question_id });
};

const postAssignQuiz = (quizId, userId) => {
	return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId });
};

const getQuizWithQA = (quizId) => {
	return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
	return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

export {
	postCreateNewUser,
	getAllUsers,
	putUpdateUser,
	deleteUser,
	getUserWidthPaginate,
	postLogin,
	postRegister,
	getQuizByUser,
	getDataQuiz,
	postSubmitQuiz,
	postCreateNewQuiz,
	getAllQuizForAdmin,
	deleteQuizById,
	putUpdateQuiz,
	postCreateNewQuestionForQuiz,
	postCreateNewAnswerForQuestion,
	postAssignQuiz,
	getQuizWithQA,
	postUpsertQA,
};
