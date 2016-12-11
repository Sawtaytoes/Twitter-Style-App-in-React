// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)


// --------------------------------------------------------
// Generic Functions
// --------------------------------------------------------

const logger = config.isDev() ? console.log : () => {}


// --------------------------------------------------------
// User Functions
// --------------------------------------------------------

const formatUsername = (username = '') => username.toLowerCase()

const addSampleUser = () => {
	users.push({
		userId: 0,
		displayName: 'Sam Pull',
		username: 'sample',
		password: 'pass',
		joinDate: new Date('11/12/2016'),
	})
	nextUserId += 1
}

const resetUsers = () => {
	users.splice(0)
	addSampleUser()
}

const getUserById = (userId = -1) => {
	const formattedUserId = Number(userId)
	return users.find(user => user.userId === formattedUserId)
}

const getUserByUsername = (username = '') => {
	const formattedUsername = formatUsername(username)
	return users.find(user => user.username === formattedUsername)
}

const getUserInfo = (username = '', password = '') => {
	const formattedUsername = formatUsername(username)
	return users.find(user => (
		user.username === formattedUsername
		&& user.password === password
	))
}


// --------------------------------------------------------
// Tweet Functions
// --------------------------------------------------------

const addSampleTweet = () => {
	users.push({
		tweetId: 0,
		userId: 0,
		username: 'sample',
		password: 'pass',
		joinDate: new Date('11/12/2016'),
	})
	nextUserId += 1
}


// --------------------------------------------------------
// Data Storage
// --------------------------------------------------------

const users = []
let nextUserId = 0
addSampleUser()

const tweets = []
let nextTweetId = 0
addSampleTweet()


// --------------------------------------------------------
// Server Setup
// --------------------------------------------------------

const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')

const app = express()
const secureServer = app => {
	const https = require('https')
	const enforce = require('express-sslify')

	app
	.use(enforce.HTTPS({ trustProtoHeader: true }))

	return https.createServer({
		cert: fs.readFileSync('./conf/domain-crt.txt'),
		key: fs.readFileSync('./conf/key.pem'),
	}, app)
}

app
.use(compression())
.use(helmet())
.use(cors({ origin: config.getSafeUrl(config.getServerUrl), optionsSuccessStatus: 200 }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.disable('x-powered-by')


// --------------------------------------------------------
// Login
// --------------------------------------------------------

.post('/login', ({ body }, res) => {
	logger('\n-- Login --')

	let response
	const { username, password } = body

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
		const { userId } = getUserInfo(username, password) || {}
		if (typeof userId === 'number') {
			response = { userId }

		} else {
			response = {
				error: true,
				message: "Login failed for that username and password combination.",
			}
		}
	}

	logger(response)
	res.send(response)
})


// --------------------------------------------------------
// Users
// --------------------------------------------------------

.get('/user', (req, res) => {
	logger('\n-- Get Users --')

	let response = {
		users,
		message: "Successfully retrieved all users.",
	}

	logger(response)
	res.send(response)
})

.get('/user/:userId', ({ params }, res) => {
	logger('\n-- Get User --')

	let response
	const { userId } = params

	if (!userId) {
		response = {
			error: true,
			message: "Missing id for user.",
		}

	} else {
		const user = getUserById(userId)

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
	}

	logger(response)
	res.send(response)
})

.post('/user', ({ body }, res) => {
	logger('\n-- Register User --')

	let response
	const { username, password } = body

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

	} else if (getUserByUsername(username)) {
		response = {
			error: true,
			message: "User already exists with that name.",
		}

	} else {
		const userId = nextUserId

		nextUserId += 1
		users.push({
			userId,
			displayName: '',
			username: formatUsername(username),
			password: password,
			joinDate: new Date(),
		})
		response = {
			userId,
			message: "You've been registered successfully.",
		}
	}

	logger(response)
	res.send(response)
})

.put('/user/:userId', ({ params, body }, res) => {
	logger('\n-- Update User --')

	let response
	const { userId } = params
	const { displayName } = body

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
		const user = getUserById(userId)

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
	res.send(response)
})

.delete('/user/:userId', ({ params }, res) => {
	logger('\n-- Delete User --')

	let response
	const { userId } = params

	if (!userId) {
		response = {
			error: true,
			message: "Missing id for user.",
		}

	} else {
		const user = getUserById(userId)

		if (!user) {
			response = {
				error: true,
				message: "No user found with that id.",
			}

		} else {
			response = {
				message: "Successfully removed user.",
			}
		}
	}

	logger(response)
	res.send(response)
})

.delete('/private/users', (req, res) => {
	resetUsers()
	res.send({ message: "Successfully reset all users." })
})


// --------------------------------------------------------
// Server Listener
// --------------------------------------------------------

const server = config.isSecure() ? secureServer(app) : app
server.listen(config.getAPIPort(), err => {
	if (err) { console.error(err) }
	console.info('Web Server running as', config.getAPIServerUrl())
})
