// --------------------------------------------------------
// Actions
// --------------------------------------------------------

const TWEETS_LOADING = 'TWEETS_LOADING'
const TWEETS_LOADED = 'TWEETS_LOADED'
const ADD_TWEET = 'ADD_TWEET'
const EDIT_TWEET = 'EDIT_TWEET'
const REMOVE_TWEET = 'REMOVE_TWEET'


// --------------------------------------------------------
// Action Creators
// --------------------------------------------------------

export const getTweets = () => ({ type: TWEETS_LOADING })

export const setTweets = tweets => ({
	type: TWEETS_LOADED,
	tweets,
})

export const addTweet = (tweetId, content) => ({
	type: ADD_TWEET,
	content,
})

export const editTweet = (tweetId, content) => ({
	type: EDIT_TWEET,
	tweetId,
	content,
})

export const removeTweet = tweetId => ({
	type: REMOVE_TWEET,
	tweetId,
})


// --------------------------------------------------------
// Reducer
// --------------------------------------------------------

export default (state = {}, action) => {
	const {
		type,
		tweets,
		tweetId,
		content,
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

	case ADD_TWEET:
		return {
			...state,
			tweetId,
			content,
		}

	case EDIT_TWEET:
		return {
			...state,
			content,
		}

	case REMOVE_TWEET:
		return {
			...state,
		}

	default:
		return state
	}
}
