const dir = require(`${global.baseDir}/global-dirs`)
let configCustom = {}
try {
	configCustom = require(`${dir.configs}config`)
} catch (e) {
	// Do Nothing
}

const configDefaults = {
	env: 'production',                            // Can be 'development' or 'production'.

	//- Server (use this in your browser)
	protocol: 'http',                             // Using `https` requires valid certificates.
	hostname: '0.0.0.0',                          // Can be 0.0.0.0 for binding to all ports.
	port: 3000,                                   // Port of webserver.

	//- Proxy (Webpack Dev Server)
	// proxyPort: 3001,                           // Optional. Will be `port + 1` if not defined.

	//- API
	// apiPort: 3002,                             // Optional. Will be `port + 2` if not defined.
	apiPath: '/api',                              // Path used when performing data calls to the api

	//- Testing
	testsPath: '/tests',                          // Path used when performing unit-tests

	//- Email Submission
	mailSendPath: '/contact/send',                // Path that's used when doing a POST to send mail.
	mailOptions: {                                // Options for Nodemailer.
		from: 'Fake User <fake.user@example.com>', // When sending mail, this appears in the `FROM` field
	},
	smtpCredentials: {                            // Configuration for a local maildev server.
		host: 'localhost',
		port: 1025,
		tls: {
			rejectUnauthorized: false,
		}
	}
}

const configEnv = {
	env: process.env.NODE_ENV,
	protocol: process.env.PROTOCOL,
	hostname: process.env.HOSTNAME,
	port: process.env.PORT,
	proxyHostname: process.env.PROXY_HOSTNAME,
	proxyPort: process.env.PROXY_PORT,
	testsPath: process.env.TESTS_PATH,
	mailSendPath: process.env.MAIL_SEND_PATH,
	mailOptions: process.env.MAIL_FROM && { from: process.env.MAIL_FROM },
	smtpCredentials: process.env.SMTP_CREDENTIALS,
}

Object.keys(configEnv)
.forEach(key => typeof configEnv[key] === 'undefined' && delete configEnv[key])

const config = Object.assign({}, configDefaults, configEnv, configCustom)
config.port = Number(config.port)
config.proxyHostname = config.proxyHostname || config.hostname !== '0.0.0.0' && config.hostname || 'localhost'
config.proxyPort = Number(config.proxyPort || config.port + 1)
config.apiPort = Number(config.apiPort || config.port + 2)

module.exports = {
	isSecure: () => config.protocol === 'https',
	isDev: () => config.env === 'development',
	isProd: () => config.env === 'production',

	getEnv: () => config.env,

	getProtocol: () => config.protocol,
	getHostname: () => config.hostname,
	getPort: () => config.port,

	getProxyPort: () => config.proxyPort,
	getProxyHostname: () => config.proxyHostname,

	getAPIPort: () => config.apiPort,
	getAPIPath: () => config.apiPath,

	getSafeUrl: portFunc => portFunc().replace('0.0.0.0', 'localhost'),

	getTestsPath: () => config.testsPath,

	getServerUrl: () => `${config.protocol}://${config.hostname}:${config.port}`,
	getProxyServerUrl: () => `http://${config.proxyHostname}:${config.proxyPort}`,
	getAPIServerUrl: () => `${config.protocol}://${config.hostname}:${config.apiPort}`,

	getMailSendPath: () => config.mailSendPath,
	getMailOptions: () => config.mailOptions,
	getSmtpCredentials: () => config.smtpCredentials,
}
