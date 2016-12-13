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

	const add = entry => {
		const newEntry = Object.assign({}, entry, {
			[schema.userId]: Number(entry.userId),
		})

		return table.add(newEntry)
	}

	const removeAll = () => (
		TableHelpers.removeAllAndInsertSample(table, sampleEntry())
	)

	// Object Composition
	return Object.freeze({
		add,
		getAllByUserId,
		removeAll,
		schema,
		delete: table.delete,
		get: table.get,
		getAll: table.getAll,
		getAllFuzzy: table.getAllFuzzy,
		remove: table.remove,
		update: table.update,
	})
}

module.exports = Tweets()
