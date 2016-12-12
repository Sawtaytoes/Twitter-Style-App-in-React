const dir = require(`${global.baseDir}/global-dirs`)
const logger = require(`${dir.api}logger`)
const Tweets = require(`${dir.tables}tweets`)

const getAll = () => {
	logger('\n-- Get Tweets --')

	let response = {
		tweets: Tweets.getAll(),
		message: "Successfully retrieved all Tweets.",
	}

	logger(response)
	return response
}

const get = tweetId => {
	logger('\n-- Get Tweet --')

	let response
	const tweet = Tweets.get(tweetId)

	if (!tweet) {
		response = {
			error: true,
			message: "No tweet found with that id.",
		}

	} else {
		response = Object.assign({}, tweet, {
			message: "Successfully retrieved tweet data.",
		})
	}

	logger(response)
	return response
}

const update = (tweetId, content) => {
	logger('\n-- Update Tweet --')

	let response

	if (!content) {
		response = {
			error: true,
			message: "You must enter in a valid display name.",
		}

	} else {
		const tweet = Tweets.get(tweetId)

		if (!tweet) {
			response = {
				error: true,
				message: "No tweet found with that id.",
			}

		} else {
			const { schema } = Tweets

			Tweets.update(tweetId, {
				[schema.content]: content
			})

			response = {
				message: "Successfully updated tweet info.",
			}
		}
	}

	logger(response)
	return response
}

const remove = id => {
	Tweets.remove(id)

	let response = { message: "Successfully removed tweet." }
	logger(response)
	return response
}

const removeAll = () => {
	Tweets.removeAll()

	let response = { message: "Successfully removed all tweets." }
	logger(response)
	return response
}

module.exports = {
	getAll,
	get,
	update,
	remove,
	removeAll,
}
