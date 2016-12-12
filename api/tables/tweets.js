const dir = require(`${global.baseDir}/global-dirs`)
const { Table, TableHelpers } = require(`${dir.api}table`)

const Tweets = () => {
	const table = Table('user', {
		tweetId: Number,
		userId: Number,
		content: String,
		postDate: Date,
	})

	// Setup Table
	const schema = table.schema
	const sampleEntry = () => ({
		[schema.userId]: 0,
		[schema.content]: 'Sam Pull',
	})

	table.add(sampleEntry())

	// Table Overrides
	const getByUserId = userId => (
		table.getByKeyValue(schema.userId, userId)
	)

	const removeAll = () => (
		TableHelpers.removeAllAndInsertSample(table, sampleEntry())
	)

	// Object Composition
	return Object.freeze({
		getByUserId,
		removeAll,
		schema,
		add: table.add,
		delete: table.delete,
		get: table.get,
		getAll: table.getAll,
		remove: table.remove,
		update: table.update,
	})
}

module.exports = Tweets()
