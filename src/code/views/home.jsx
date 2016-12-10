import React, { PureComponent } from 'react'
import { Match } from 'react-router'
import { Link } from 'react-router'

// Components
import Login from 'components/login'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

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
				action="/api/login"
			/>} />
			<Match pattern="/sign-up" render={() => <Login
				title="Sign-Up"
				action="/api/register"
			/>} />
		</div>
	)}
}

export default stylesLoader.render(Home)
