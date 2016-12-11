import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Match, Redirect, Link } from 'react-router'

// Components
import Login from 'components/login'

// Actions
import {
	login,
	logout,
} from 'ducks/account'
import { login, logout } from 'ducks/account'

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

const Test = props => {
	console.debug('props', props.isAuthenticated)
	return <div />
}

Test.propTypes = { isAuthenticated: PropTypes.bool }

class Home extends PureComponent {
	handleLogout() {
		const { dispatch } = this.props
		dispatch(logout())
	}

	render() {
		const { isAuthenticated, userId, username } = this.props
		return (
			<div>
				<nav>
					<ul>
						<li><Link to="/login" title="Login">Login</Link></li>
						<li><Link to="/sign-up" title="Sign-Up">Sign-Up</Link></li>
					</ul>
				</nav>

				<p><a href="javascript:" onClick={this.handleLogout.bind(this)}>LOGOUT</a></p>

				<Match
					pattern="/"
					exactly
					render={() => (isAuthenticated ? <Redirect to="/login"/> : <Redirect to="/profile"/>)}
				/>
				<Match pattern="/login" render={() => <Test {...this.props} />} />

				<Match pattern="/login" render={() => isAuthenticated ? <Redirect to="/profile" /> : <Login
					title="Login"
					submit={submissionHandler('/api/login', { method: 'POST' })}
					action={login}
				/>} />
				<Match pattern="/sign-up" render={() => isAuthenticated ? <Redirect to="/profile" /> : <Login
					title="Sign-Up"
					submit={submissionHandler('/api/user', { method: 'POST' })}
					action={login}
				/>} />
				<Match pattern="/profile" render={() => !isAuthenticated ? <Redirect to="/login" /> : <div>
					<h1>Profile</h1>
					<p>UserId: {userId}</p>
					<p>Username: {username}</p>
				</div>} />
			</div>
		)
	}
}

export default connect(({ account }) => ({
	isAuthenticated: account.isAuthenticated,
	userId: account.userId,
	username: account.username,
}))(stylesLoader.render(Home))
