//- Data Storage

const users = [{
	id: 0,
	displayName: 'Sam Pull',
	username: 'sample',
	password: 'pass',
	joinDate: new Date('11/12/2016'),
}]
let nextUserId = 1


//- Functions

const findUserByUsername = (username = '') => {
	const lowercaseUsername = username.toLowerCase()
	return users.find(user => user.username === lowercaseUsername)
}

const getUserInfo = (username = '', password = '') => {
	const lowercaseUsername = username.toLowerCase()
	return users.find(user => (
		user.username === lowercaseUsername
		&& user.password === password
	))
}


//- Webserver

const bodyParser = require('body-parser')
// const compression = require('compression')
// const config = require(__includes + 'config-settings')
// const cors = require('cors')
const express = require('express')
// const fs = require('fs')
// const helmet = require('helmet')

const app = express()
app
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))

.disable('x-powered-by')

.get('/', (req, res) => res.send('Nothing here :('))

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
			username: username,
			password: password,
			joinDate: new Date(),
		})
		nextUserId += 1
		console.log(findUserByUsername(username));
		response = {
			message: "You've been successfully registered."
		}
	}

	console.log('users', users)
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
		if (id) {
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
