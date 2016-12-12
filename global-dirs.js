// Setup directories
const base = global.baseDir
const includes = `${base}includes/`
const services = `${base}services/`
const webpack = `${base}webpack/`

const api = `${base}api/`
const middleware = `${api}middleware/`
const tables = `${api}tables/`

module.exports = {
	api,
	base,
	includes,
	middleware,
	services,
	tables,
	webpack,
}
