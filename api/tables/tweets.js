const dir = require(`${global.baseDir}/global-dirs`)
const { Table, TableHelpers } = require(`${dir.api}table`)

const Tweets = () => {
	const table = Table('tweet', {
		tweetId: Number,
		userId: Number,
		content: String,
		postTime: Date,
	})

	// Setup Table
	const schema = table.schema
	const sampleEntry = () => ({
		[schema.userId]: 0,
		[schema.content]: 'I love the pies!',
		[schema.postTime]: new Date('11/13/2016'),
	})

	table.add(sampleEntry())

	// Table Overrides
	const getAllByUserId = userId => (
		table.getAllByKeyValue(schema.userId, Number(userId))
	)

	const removeAll = () => (
		TableHelpers.removeAllAndInsertSample(table, sampleEntry())
	)

	// Object Composition
	return Object.freeze({
		getAllByUserId,
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
