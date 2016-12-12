const dir = require(`${global.baseDir}/global-dirs`)
const Users = require(`${dir.tables}users`)
const Tweets = require(`${dir.tables}tweets`)

const UserTweets = () => {
	const getAll = userId => Tweets.getAllByUserId(userId)

	const removeAll = userId => {
		const tweets = Tweets.getAllByUserId(userId)
		tweets.forEach(({ tweetId }) => {
			Tweets.remove(tweetId)
		})
	}

	// Object Composition
	return Object.freeze({
		getAll,
		removeAll,
		Tweets,
		Users,
	})
}

module.exports = UserTweets()
