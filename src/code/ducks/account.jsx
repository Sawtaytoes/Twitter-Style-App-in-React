// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const LOADING = 'LOADING'
const LOADED = 'LOADED'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
// const REGISTER = 'REGISTER'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const setLoading = () => ({ type: LOADING })
export const setLoaded = () => ({ type: LOADED })

export const login = ({ error, message, userId }, { username }) => ({
	type: LOGIN,
	error,
	message,
	username,
	userId: Number(userId),
})

export const logout = () => ({ type: LOGOUT })

// export const register = (username, password) => {
// 	return {
// 		type: REGISTER,
// 		username,
// 		password
// 	}
// }


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

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
		const isAuthenticated = !error
		return {
			...state,
			error,
			isAuthenticated,
			message,
			userId,
			username,
		}
	}

	case LOGOUT: {
		return {
			...state,
			error: undefined,
			isAuthenticated: false,
			message: undefined,
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
