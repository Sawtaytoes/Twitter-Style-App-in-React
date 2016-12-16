import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Match, Redirect } from 'react-router'

// Components
import Login from 'components/login'
import Profile from 'components/profile'

// Actions
import { login } from 'ducks/account'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

const submissionHandler = (url, options) => fields => {
	const body = JSON.stringify(fields)
	return fetch(url, { ...options, headers: { 'Content-Type': 'application/json' }, body })
		.then(res => res.json())
		.catch(err => console.error(err))
}

class Home extends PureComponent {
	renderLogin() { return (
		<div>
			<h3>Credentials</h3>
			<dl>
				<dt>Username</dt>
				<dd>sample</dd>

				<dt>Password</dt>
				<dd>pass</dd>
			</dl>
			<Login
				title="Login"
				submit={submissionHandler('/api/login', { method: 'POST' })}
				action={login}
			/>
		</div>
	)}

	render() {
		const { isAuthenticated } = this.props
		return (
			<div>
				<h1>Welcome!</h1>
				<h2>This is my Twitter-style App done in React</h2>
				<p>
					This is a rough outline of how one of these async apps can be made using React, Redux, React-Router, and Node.js as an API server.
				</p>

				<hr />

				<Match
					pattern=""
					exactly
					render={() => (isAuthenticated ? <Redirect to="/login"/> : <Redirect to="/profile"/>)}
				/>
				<Match pattern="/login" render={() => isAuthenticated ? <Redirect to="/profile" /> : this.renderLogin()} />
				<Match pattern="/sign-up" render={() => isAuthenticated ? <Redirect to="/profile" /> : <Login
					title="Sign-Up"
					submit={submissionHandler('/api/user', { method: 'POST' })}
					action={login}
				/>} />
				<Match pattern="/profile" render={() => !isAuthenticated ? <Redirect to="/login" /> : <Profile />} />
			</div>
		)
	}
}

export default connect(({ account }) => ({
	isAuthenticated: account.isAuthenticated,
}))(stylesLoader.render(Home))
