const dir = require(`${global.baseDir}/global-dirs`)
const logger = require(`${dir.api}logger`)
const UserTweets = require(`${dir.tables}user-tweets`)

const getAll = () => {
	logger('\n-- Get User Tweets --')

	let response = {
		tweets: UserTweets.getAll(),
		message: "Successfully retrieved all Tweets.",
	}

	logger(response)
	return response
}

const add = (userId, content) => {
	logger('\n-- Add User Tweet --')

	let response

	if (!content) {
		response = {
			error: true,
			message: "You must have something to tweet.",
		}

	} else {
		const { schema } = UserTweets.Tweets
		const { tweetId } = UserTweets.Tweets.add({
			[schema.userId]: userId,
			[schema.content]: content,
		})

		response = {
			tweetId,
			message: "Tweet created successfully.",
		}
	}

	logger(response)
	return response
}

const removeAll = userId => {
	UserTweets.removeAll(userId)

	let response = { message: "Successfully removed all tweets for user." }
	logger(response)
	return response
}

module.exports = {
	getAll,
	add,
	removeAll,
}
