// Setup directories
const base = global.baseDir
const server = `${base}server/`
const configs = `${server}configs/`
const includes = `${server}includes/`
const services = `${server}services/`

const api = `${base}api/`
const tables = `${api}tables/`

module.exports = {
	api,
	base,
	configs,
	includes,
	server,
	services,
	tables,
}
