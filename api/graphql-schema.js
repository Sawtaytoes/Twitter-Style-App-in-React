const fs = require('fs')

const dir = require(`${global.baseDir}/global-dirs`)
const Tweets = require(`${dir.tables}tweets`)
const Users = require(`${dir.tables}users`)

const typeDefs = fs.readFileSync(
	`${dir.api}type-defs.graphql`, 'utf8',
	err => console.error(err)
)

const convertToDateTime = time => ({
	time,
	unixTime: new Date(time).getTime()
})

const resolvers = {
	Query: {
		users: () => Users.getAll(),
		user: ({ userId }) => Users.get(userId),
		tweets: () => Tweets.getAll(),
		tweet: ({ tweetId }) => Tweets.get(tweetId),
	},

	User: {
		tweets: ({ userId }) => Tweets.getAllByUserId(userId),
		joinTime: ({ joinTime }) => convertToDateTime(joinTime),
	},

	Tweet: {
		user: ({ userId }) => Users.get(userId),
		postTime: ({ postTime }) => convertToDateTime(postTime),
	}
}

module.exports = {
	typeDefs,
	resolvers,
}
