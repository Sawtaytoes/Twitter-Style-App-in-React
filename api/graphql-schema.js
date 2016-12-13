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
		tweet: (_, { tweetId }) => Tweets.get(tweetId),
		tweets: (_, { userId, content }) => Tweets.getAllFuzzy({
			[Tweets.schema.userId]: userId,
			[Tweets.schema.content]: content,
		}),
		user: (_, { userId }) => Users.get(userId),
		users: (_, { username }) => Users.getAllFuzzy({
			[Users.schema.username]: username
		}),
	},

	User: {
		tweets: ({ userId }) => {console.log('userId', Tweets.getAll({[Tweets.schema.userId]: userId})); return Tweets.getAllByUserId(userId)},
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
