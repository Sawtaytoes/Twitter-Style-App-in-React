const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)

const logger = config.isDev() ? console.log : () => {}

module.exports = logger
