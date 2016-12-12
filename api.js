// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const login = require(`${dir.middleware}login`)
const tweet = require(`${dir.middleware}tweet`)
const user = require(`${dir.middleware}user`)
const userTweet = require(`${dir.middleware}user-tweet`)


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

.post('/login', ({ body }, res) => res.send(
	login.getUserId(body.username, body.password)
))


// --------------------------------------------------------
// UserTweet
// --------------------------------------------------------

.get('/user/:userId/tweet/:tweetId', ({ params, body }, res) => res.send(
	userTweet.getAll()
))

.post('/user/:userId/tweet', ({ params, body }, res) => res.send(
	userTweet.add(params.userId, body.content)
))

.delete('/user/:userId/tweet', ({ params }, res) => res.send(
	userTweet.remove(params.userId)
))


// --------------------------------------------------------
// User
// --------------------------------------------------------

.get('/user', (_, res) => res.send(
	user.getAll()
))

.get('/user/:userId', ({ params }, res) => res.send(
	user.get(params.userId)
))

.get('/user/:userId/tweet', (_, res) => res.send(
	user.getAll()
))

.post('/user', ({ body }, res) => res.send(
	user.add(body.username, body.password)
))

.put('/user/:userId', ({ params, body }, res) => res.send(
	user.update(params.userId, body.displayName)
))

.delete('/user/:userId', ({ params }, res) => res.send(
	user.remove(params.userId)
))

.delete('/user', (_, res) => res.send(
	user.removeAll()
))


// --------------------------------------------------------
// Tweet
// --------------------------------------------------------

.get('/tweet', (_, res) => res.send(
	tweet.getAll()
))

.get('/tweet/:tweetId', ({ params }, res) => res.send(
	tweet.get(params.tweetId)
))

.put('/tweet/:tweetId', ({ params, body }, res) => res.send(
	tweet.update(params.tweetId, body.content)
))

.delete('/tweet/:tweetId', ({ params }, res) => res.send(
	tweet.remove(params.tweetId)
))

.delete('/tweet', (_, res) => res.send(
	tweet.removeAll()
))



// --------------------------------------------------------
// Server Listener
// --------------------------------------------------------

const server = config.isSecure() ? secureServer(app) : app
server.listen(config.getAPIPort(), err => {
	if (err) { console.error(err) }
	console.info('Web Server running as', config.getAPIServerUrl())
})
