import React, { PureComponent } from 'react'
import { Match } from 'react-router'
import { Link } from 'react-router'

// Components
import Login from 'components/login'

// Actions
import { login } from 'ducks/account-management'

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
	render() { return (
		<div>
			<h1>Hello World</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
			</p>

			<nav>
				<ul>
					<li><Link to="/login" title="Login">Login</Link></li>
					<li><Link to="/sign-up" title="Sign-Up">Sign-Up</Link></li>
				</ul>
			</nav>

			<Match pattern="/login" render={() => <Login
				title="Login"
				submit={submissionHandler('/api/login', { method: 'POST' })}
				action={login}
			/>} />
			<Match pattern="/sign-up" render={() => <Login
				title="Sign-Up"
				submit={submissionHandler('/api/user', { method: 'POST' })}
				action={login}
			/>} />
		</div>
	)}
}

export default stylesLoader.render(Home)
