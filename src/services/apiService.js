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
export {
	postCreateNewUser,
	getAllUsers,
	putUpdateUser,
	deleteUser,
	getUserWidthPaginate,
	postLogin,
	postRegister,
	getQuizByUser,
};
