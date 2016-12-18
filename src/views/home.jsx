import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Match, Redirect } from 'react-router'

// Components
import Login from 'components/login'
import Profile from 'components/profile'

// Actions
// import { login } from 'ducks/account'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

const LOGIN_USER = gql`
mutation LoginUser($input: LoginUserInput!) {
	user: loginUser(input: $input) {
		userId
		username
	}
}`

const ADD_USER = gql`
mutation AddUser($input: AddUserInput!) {
	user: addUser(input: $input) {
		userId
		username
	}
}`

const UserLogin = graphql(LOGIN_USER)(Login)
const UserSignUp = graphql(ADD_USER)(Login)

class Home extends PureComponent {
	render() {
		const { isAuthenticated } = this.props
		console.debug('isAuthenticated', isAuthenticated)
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
					render={() => (isAuthenticated ? <Redirect to="/login"/>
						: <Redirect to="/profile"/>
					)}
				/>
				<Match
					pattern="/login"
					render={() => (isAuthenticated ? <Redirect to="/profile" />
						:
						<div>
							<h3>Credentials</h3>
							<dl>
								<dt>Username</dt>
								<dd>sample</dd>

								<dt>Password</dt>
								<dd>pass</dd>
							</dl>
							<UserLogin title="Login" />
						</div>
					)}
				/>
				<Match
					pattern="/sign-up"
					render={() => (isAuthenticated ? <Redirect to="/profile" />
						: <UserSignUp title="Sign-Up" />
					)}
				/>
				<Match
					pattern="/profile"
					render={() => (!isAuthenticated ? <Redirect to="/login" />
						: <Profile />
					)}
				/>
			</div>
		)
	}
}

export default connect(({ account: { isAuthenticated } }) => ({
	isAuthenticated,
}))(stylesLoader.render(Home))
