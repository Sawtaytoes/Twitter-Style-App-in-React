const dir = require(`${global.baseDir}/global-dirs`)
const Enum = require(`${dir.api}enum`)

const Table = (name = '', props = {}) => {
	const data = new Map()
	const primaryKey = `${name}Id`
	let nextId = 0
	let schema = {}

	// Setup Schema
	Object.keys(props).forEach(key => (
		schema[key] = Enum(key, props[key])
	))

	Object.freeze(schema)

	// Private
	const getId = () => {
		const id = nextId
		nextId += 1
		return id
	}

	// Public
	const get = id => data.get(Number(id))
	const getAll = () => Array.from(data.values())

	const getByManyValues = lookupParams => {
		const keys = Object.keys(lookupParams)

		return getAll().find(entry => (
			keys.every(key => entry[key] === lookupParams[key])
		))
	}
	const getByKeyValue = (key, value) => getByManyValues({ [key]: value })

	const getAllByManyValues = lookupParams => {
		const keys = Object.keys(lookupParams)

		return getAll().filter(entry => (
			keys.every(key => entry[key] === lookupParams[key])
		))
	}
	const getAllByKeyValue = (key, value) => getAllByManyValues({ [key]: value })

	const update = (itemId, entry) => {
		const id = Number(itemId)
		const currentEntry = get(id) || {}
		const newEntry = {}

		Object.keys(schema).forEach(key => {
			const entryValue = entry[key]
			const currentValue = currentEntry[key]
			let value

			// HACK: Make 0 truthy
			if (key === primaryKey && (id || id === 0)) {
				value = id == 0 ? 0 : id
			} else if (entryValue || entryValue === 0) {
				value = entryValue == 0 ? 0 : entryValue
			} else if (currentValue || currentValue === 0) {
				value = currentValue == 0 ? 0 : currentValue
			} else {
				value = schema[key].default()
			}

			newEntry[key] = value
		})

		data.set(id, newEntry)
		return newEntry
	}

	const add = entry => {
		const id = getId()
		return update(id, entry)
	}

	const remove = id => data.delete(id)

	const removeAll = () => {
		data.clear()
	}

	// Object Composition
	return Object.freeze({
		add,
		get,
		getAll,
		getAllByKeyValue,
		getAllByManyValues,
		getByKeyValue,
		getByManyValues,
		remove,
		removeAll,
		schema,
		update,
	})
}

const TableHelpers = () => Object.freeze({
	removeAllAndInsertSample: (table, entry) => {
		table.removeAll(entry)
		table.add(entry)
	},
})

module.exports = {
	Table,
	TableHelpers
}
