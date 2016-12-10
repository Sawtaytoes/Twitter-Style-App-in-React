export const LOADING = 'LOADING'
export const LOADED = 'LOADED'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REGISTER = 'REGISTER'

export const setLoading = () => {
	return { type: LOADING }
}

export const setLoaded = () => {
	return { type: LOADED }
}

export const login = ({ error, message, userId }, { username }) => {
	return {
		type: LOGIN,
		error,
		message,
		userId,
		username,
	}
}

export const logout = () => {
	return { type: LOGOUT }
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
	case LOADING:
		return {
			...state,
			loading: true
		}

	case LOADED:
		return {
			...state,
			loading: false
		}

	case LOGIN: {
		return {
			...state,
			error,
			message,
			userId,
			username,
		}
	}

	case LOGOUT: {
		return {
			...state,
			userId: undefined,
			username: undefined,
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
