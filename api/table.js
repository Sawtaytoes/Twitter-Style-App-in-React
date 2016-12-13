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

	const allEntries = () => Array.from(data.values())

	const filterByValues = (looper, checkMatch, lookupParams = {}) => {
		const keys = Object.keys(lookupParams).filter(key => lookupParams[key] !== undefined)

		return looper.call(allEntries(), entry => (
			keys.every(key => checkMatch(entry[key], lookupParams[key]))
		))
	}

	const exactMatch = (a, b) => a === b
	const fuzzyMatch = (a, b) => {
		if (a.includes && b.includes) {
			const aLower = a.toLowerCase()
			const bLower = b.toLowerCase()
			return aLower.includes(bLower) || bLower.includes(aLower) || aLower === bLower
		}

		return exactMatch(a, b)
	}

	const getByManyValues = lookupParams => (
		filterByValues(Array.prototype.find, exactMatch, lookupParams)
	)
	const getAllByManyValues = lookupParams => (
		filterByValues(Array.prototype.filter, exactMatch, lookupParams)
	)
	const getAllByManyValuesFuzzy = lookupParams => (
		filterByValues(Array.prototype.filter, fuzzyMatch, lookupParams)
	)

	// Public
	const getByKeyValue = (key, value) => getByManyValues({ [key]: value })
	const getAllByKeyValue = (key, value) => getAllByManyValues({ [key]: value })
	const getAllByKeyValueFuzzy = (key, value) => getAllByManyValues({ [key]: value })

	const get = lookupParams => {
		if (typeof lookupParams === 'object') {
			return getByManyValues(lookupParams)
		}

		const id = lookupParams
		return data.get(id)
	}

	const getAll = lookupParams => getAllByManyValues(lookupParams)
	const getAllFuzzy = lookupParams => getAllByManyValuesFuzzy(lookupParams)

	const update = (id, entry) => {
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
		getAllFuzzy,
		getByKeyValue,
		getAllByKeyValue,
		getAllByKeyValueFuzzy,
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
