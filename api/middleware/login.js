const dir = require(`${global.baseDir}/global-dirs`)
const logger = require(`${dir.api}logger`)
const Users = require(`${dir.tables}users`)

const getUserId = (username, password) => {
	logger('\n-- Login --')

	let response

	if (!username) {
			response = {
				error: true,
				message: "You must enter in a valid username.",
			}

	} else if (!password) {
		response = {
			error: true,
			message: "You must enter in a valid password.",
		}

	} else {
		const { userId } = Users.getByUsernamePassword(username, password) || {}

		if (typeof userId !== 'number') {
			response = {
				error: true,
				message: "Login failed for that username and password combination.",
			}

		} else {
			response = { userId }
		}
	}

	logger(response)
	return response
}

module.exports = {
	getUserId,
}
