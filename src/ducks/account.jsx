// --------------------------------------------------------
// Actions
// --------------------------------------------------------

// const ACCOUNT_LOADING = 'ACCOUNT_LOADING'
// const ACCOUNT_LOADED = 'LOADED'
const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
const LOGIN_FAILED = 'LOGIN_FAILED'
const LOGOUT = 'LOGOUT'
// const REGISTER = 'REGISTER'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

// export const setLoading = () => ({ type: ACCOUNT_LOADING })
// export const setLoaded = () => ({ type: ACCOUNT_LOADED })

export const login = ({ userId, username }) => ({
	type: LOGIN_SUCCESSFUL,
	userId,
	username,
})

export const loginErr = ({ message }) => ({
	type: LOGIN_FAILED,
	message: message.replace('GraphQL error: ', ''),
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

export const getInitialState = () => ({
	error: false,
	isAuthenticated: false,
	message: undefined,
	userId: undefined,
	username: undefined,
})

export default (state = getInitialState(), action) => {
	const {
		type,
		message,
		userId,
		username,
	} = action

	switch (type) {
	// case ACCOUNT_LOADING:
	// 	return {
	// 		...state,
	// 		loading: true,
	// 	}

	// case ACCOUNT_LOADED:
	// 	return {
	// 		...state,
	// 		loading: false,
	// 	}

	case LOGIN_SUCCESSFUL:
		return {
			...state,
			userId,
			username,
			error: getInitialState().error,
			message: getInitialState().message,
			isAuthenticated: true,
		}

	case LOGIN_FAILED:
		return {
			...state,
			message,
			error: true,
			isAuthenticated: false,
		}

	case LOGOUT:
		return {
			...state,
			...getInitialState()
		}

	// case REGISTER:
	// 	return {
	// 		...state,
	// 	}

	default:
		return state
	}
}
