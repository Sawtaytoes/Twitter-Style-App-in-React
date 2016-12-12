// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const TWEETS_LOADING = 'TWEETS_LOADING'
const TWEETS_LOADED = 'TWEETS_LOADED'
const EDITOR_VISIBILITY = 'EDITOR_VISIBILITY'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const getTweets = () => ({ type: TWEETS_LOADING })

export const setTweets = tweets => ({
	type: TWEETS_LOADED,
	tweets,
})

export const showEditor = () => ({
	type: EDITOR_VISIBILITY,
	showEditor: true,
})

export const hideEditor = () => ({
	type: EDITOR_VISIBILITY,
	showEditor: false,
})


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export default (state = {}, action) => {
	const {
		type,
		tweets,
		showEditor,
	} = action

	switch (type) {
	case TWEETS_LOADING:
		return {
			...state,
			loading: true,
		}

	case TWEETS_LOADED:
		return {
			...state,
			list: tweets,
			loading: false,
		}

	case EDITOR_VISIBILITY:
		return {
			...state,
			showEditor,
		}

	default:
		return state
	}
}
