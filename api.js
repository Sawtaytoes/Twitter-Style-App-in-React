// Data Storage

const users = [{
	username: 'sample',
	displayName: 'Sam Pull',
	password: '',
}]

// Functions

const findUserByName = (lookupName = '') => {
	return users.find(({ name }) => name === lookupName.toLowerCase())
}

// Webserver

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
	let response

	if (findUserByName(body.username)) {
		response = {
			error: true,
			message: "User already exists with that name.",
		}

	} else {
		response = {
			message: "You've been successfully registered."
		}
	}

	console.log(response)
	res.send(response)
})
.post('/api/login', ({ body }, res) => {
	let response

	const { id } = findUserByName(body.username) || {}
	if (id) {
		response = { userId: id }

	} else {
		response = {
			error: true,
			message: "Login failed for that username and password combination.",
		}
	}

	console.log(response)
	res.send(response)
})

app.listen(4000, () => console.log('[API Server]'))
