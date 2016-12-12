import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Match, Redirect, Link } from 'react-router'

// Components
import Login from 'components/login'
import Profile from 'components/profile'

// Actions
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
		const { isAuthenticated } = this.props
		return (
			<div>
				<nav>
					<ul>
						<li><Link to="/login" title="Login">Login</Link></li>
						<li><Link to="/sign-up" title="Sign-Up">Sign-Up</Link></li>
					</ul>
				</nav>

				<p><a href="javascript:" onClick={this.handleLogout.bind(this)}>LOGOUT</a></p>

				<h3>Defaults</h3>
				<dl>
					<dt>Username</dt>
					<dd>sample</dd>

					<dt>Password</dt>
					<dd>pass</dd>
				</dl>

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
				<Match pattern="/profile" render={() => !isAuthenticated ? <Redirect to="/login" /> : <Profile />} />
			</div>
		)
	}
}

export default connect(({ account }) => ({
	isAuthenticated: account.isAuthenticated,
}))(stylesLoader.render(Home))
