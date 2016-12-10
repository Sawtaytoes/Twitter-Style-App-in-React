require('./api.js')
require('isomorphic-fetch')
const test = require('tape')

const urlRoot = 'http://localhost:4000/api/'
const request = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
}
const username = `fakeUsername${Math.random()}`
const password = 'fakePassword'
console.log(username);

const responseWrapper = func => response => {
	func(response || {})
	return response
}

const shouldError = t => responseWrapper(({ error, message }) => (
	t.ok(error, `Received Error: ${message}`)
))

const shouldNotError = t => responseWrapper(({ error, message }) => (
	t.ok(!error, `Received Error: ${message}`)
))

const getUserId = t => responseWrapper(({ userId }) => (
	t.equal(typeof userId, 'number', `Received UserId: ${userId}`)
))

//- Registration

test('Registration: No Data', t => {
	fetch(`${urlRoot}user`, Object.assign({}, request))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Registration: Username Only', t => {
	const body = JSON.stringify({ username })
	fetch(`${urlRoot}user`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Registration: Password Only', t => {
	const body = JSON.stringify({ password })
	fetch(`${urlRoot}user`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Registration: Username and Blank Password', t => {
	const body = JSON.stringify({ username, password: '' })
	fetch(`${urlRoot}user`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Registration: Username and Password', t => {
	const body = JSON.stringify({ username, password })
	fetch(`${urlRoot}user`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldNotError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

//- Login

test('Login: No Data', t => {
	fetch(`${urlRoot}login`, Object.assign({}, request))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Login: Username Only', t => {
	const body = JSON.stringify({ username })
	fetch(`${urlRoot}login`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Login: Password Only', t => {
	const body = JSON.stringify({ password })
	fetch(`${urlRoot}login`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Login: Username and Blank Password', t => {
	const body = JSON.stringify({ username, password: '' })
	fetch(`${urlRoot}login`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Login: Non-existent Username and Password', t => {
	const body = JSON.stringify({ username: 'asdfkljasdlfkj', password: 'asdfkljasdlfkj' })
	fetch(`${urlRoot}login`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldError(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})

test('Login: Username and Password', t => {
	const body = JSON.stringify({ username: 'sample', password: 'pass' })
	fetch(`${urlRoot}login`, Object.assign({}, request, { body }))
	.then(res => res.json())
	.then(shouldNotError(t))
	.then(getUserId(t))
	.catch(err => t.error(err))
	.then(() => t.end())
})
