//- Functions

const addSampleUser = () => {
	users.push({
		id: 0,
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

const formatUsername = (username = '') => username.toLowerCase()

const findUserByUsername = (username = '') => {
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

//- Data Storage

const users = []
let nextUserId = 0
addSampleUser()

//- Webserver

const bodyParser = require('body-parser')
// const compression = require('compression')
const cors = require('cors')
const express = require('express')
// const fs = require('fs')
// const helmet = require('helmet')

// const config = require(__includes + 'config-settings')
const app = express()
app
.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))

.disable('x-powered-by')

.get('*', (req, res) => res.send(''))

.get('/private/reset-users', (req, res) => {
	resetUsers()
	res.send()
})

.post('/api/register', ({ body }, res) => {
	console.log('-- User Registration --')

	let response
	const { username, password } = body

	if (findUserByUsername(username)) {
		response = {
			error: true,
			message: "User already exists with that name.",
		}

	} else if (!username) {
		console.log('username', username)
		response = {
			error: true,
			message: "You must enter in a valid username.",
		}

	} else if (!password) {
		console.log('password', password)
		response = {
			error: true,
			message: "You must enter in a valid password.",
		}

	} else {
		users.push({
			id: nextUserId,
			displayName: '',
			username: formatUsername(username),
			password: password,
			joinDate: new Date(),
		})
		nextUserId += 1
		console.log(findUserByUsername(username));
		response = {
			message: "You've been successfully registered."
		}
	}

	console.log(response)
	res.send(response)
})

.post('/api/login', ({ body }, res) => {
	console.log('-- User Login --')

	let response
	const { username, password } = body

	if (!username) {
			console.log('username', username)
			response = {
				error: true,
				message: "You must enter in a valid username.",
			}

	} else if (!password) {
		console.log('password', password)
		response = {
			error: true,
			message: "You must enter in a valid password.",
		}

	} else {
		const { id } = getUserInfo(username, password) || {}
		if (typeof id === 'number') {
			response = { userId: id }

		} else {
			response = {
				error: true,
				message: "Login failed for that username and password combination.",
			}
		}
	}

	console.log(response)
	res.send(response)
})

app.listen(4000, () => console.log('[API Server]'))
