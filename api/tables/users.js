const dir = require(`${global.baseDir}/global-dirs`)
const { Table, TableHelpers } = require(`${dir.api}table`)

const Users = () => {
	const table = Table('user', {
		userId: Number,
		displayName: String,
		username: String,
		password: String,
		joinTime: Date,
	})

	// Setup Table
	const schema = table.schema
	const sampleEntry = () => ({
		[schema.userId]: 0,
		[schema.displayName]: 'Sam Pull',
		[schema.username]: 'sample',
		[schema.password]: 'pass',
		[schema.joinTime]: new Date('11/12/2016'),
	})

	table.add(sampleEntry())

	// Private
	const formatUsername = (username = '') => username.toLowerCase()

	// Table Overrides
	const getByUsername = username => (
		table.getByKeyValue(schema.username, formatUsername(username))
	)

	const getByUsernamePassword = (username, password) => (
		table.get({
			[schema.username]: formatUsername(username),
			[schema.password]: password,
		})
	)

	const add = entry => {
		const newEntry = Object.assign({}, entry, {
			[schema.username]: formatUsername(entry.username),
		})

		return table.add(newEntry)
	}

	const removeAll = () => (
		TableHelpers.removeAllAndInsertSample({
			add,
			removeAll: table.removeAll,
		}, sampleEntry())
	)

	// Object Composition
	return Object.freeze({
		add,
		getByUsername,
		getByUsernamePassword,
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

module.exports = Users()
