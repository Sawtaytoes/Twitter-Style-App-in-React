// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.includes}config-settings`)
const login = require(`${dir.middleware}login`)
const { typeDefs, resolvers } = require(`${dir.api}graphql-schema`)


// --------------------------------------------------------
// Server Setup
// --------------------------------------------------------

const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const app = express()

app
.use(compression())
.use(helmet())
.use(cors({ origin: config.getSafeUrl(config.getServerUrl), optionsSuccessStatus: 200 }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))

.use('/graphql', bodyParser.json(), graphqlExpress({
	schema: executableSchema,
}))

.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}))

.disable('x-powered-by')


// --------------------------------------------------------
// Login
// --------------------------------------------------------

.post('/login', ({ body }, res) => res.send(
	login.getUserId(body.username, body.password)
))


// --------------------------------------------------------
// Server Listener
// --------------------------------------------------------

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

const server = config.isSecure() ? secureServer(app) : app
server.listen(config.getAPIPort(), err => {
	if (err) { console.error(err) }
	console.info('Web Server running as', config.getAPIServerUrl())
})
