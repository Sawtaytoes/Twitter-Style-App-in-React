const dir = require(`${global.baseDir}/global-dirs`)
const logger = require(`${dir.api}logger`)
const Users = require(`${dir.tables}users`)

const getAll = () => {
	logger('\n-- Get Users --')

	let response = {
		users: Users.getAll(),
		message: "Successfully retrieved all users.",
	}

	logger(response)
	return response
}

const get = userId => {
	logger('\n-- Get User --')

	let response
	const user = Users.get(userId)

	if (!user) {
		response = {
			error: true,
			message: "No user found with that id.",
		}

	} else {
		const { displayName, username, joinDate } = user

		response = {
			displayName,
			username,
			joinDate,
			message: "Successfully retrieved user data.",
		}
	}

	logger(response)
	return response
}

const add = (username, password) => {
	logger('\n-- Add User --')

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

	} else if (Users.getByUsername(username)) {
		response = {
			error: true,
			message: "User already exists with that name.",
		}

	} else {
		const { schema } = Users
		const { userId } = Users.add({
			[schema.username]: username,
			[schema.password]: password,
		})

		response = {
			userId,
			message: "You've been registered successfully.",
		}
	}

	logger(response)
	return response
}

const update = (userId, displayName) => {
	logger('\n-- Update User --')

	let response

	if (!userId) {
		response = {
			error: true,
			message: "Missing id for user.",
		}

	} else if (!displayName) {
		response = {
			error: true,
			message: "You must enter in a valid display name.",
		}

	} else {
		const user = Users.get(userId)

		if (!user) {
			response = {
				error: true,
				message: "No user found with that id.",
			}

		} else {
			user.displayName = displayName
			response = {
				message: "Successfully updated user info.",
			}
		}
	}

	logger(response)
	return response
}

const remove = id => {
	Users.remove(id)

	let response = { message: "Successfully removed user." }
	logger(response)
	return response
}

const removeAll = () => {
	Users.removeAll()

	let response = { message: "Successfully reset all users." }
	logger(response)
	return response
}

module.exports = {
	getAll,
	get,
	add,
	update,
	remove,
	removeAll,
}
