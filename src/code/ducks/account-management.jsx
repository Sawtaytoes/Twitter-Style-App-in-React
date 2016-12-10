export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'

export const login = ({ error, message, userId }, { username }) => {
	return {
		type: LOGIN,
		error,
		message,
		userId,
		username,
	}
}

// export const register = (username, password) => {
// 	return {
// 		type: REGISTER,
// 		username,
// 		password
// 	}
// }

export default (state = {}, action) => {
	const {
		type,
		error,
		message,
		userId,
		username,
	} = action

	switch (type) {
	case LOGIN: {
		return {
			...state,
			error,
			message,
			userId,
			username,
		}
	}

	// case REGISTER: {
	// 	return {
	// 		...state,
	// 	}
	// }

	default:
		return state
	}
}
