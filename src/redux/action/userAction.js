export const INITIAL_STATE = {
	account: {
		access_token: '',
		refresh_token: '',
		username: '',
		Image: '',
		role: '',
	},
	isAuthenticated: false,
};

export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';

export const doLogin = (data) => {
	return { type: FETCH_USER_LOGIN_SUCCESS, payload: data };
};
