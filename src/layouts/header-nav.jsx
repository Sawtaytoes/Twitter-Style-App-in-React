import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// Actions
import { logout } from 'ducks/account'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Content
import navItems from 'content/nav-items'

// Styles
const stylesLoader = StylesLoader.create()
// .add(require('styl/header-nav'))

class HeaderNav extends PureComponent {
	handleLogout() {
		const { dispatch } = this.props
		dispatch(logout())
	}

	renderNavItems() {
		const { isAuthenticated } = this.props
		return (
			<ul className="header-nav__list">
				{navItems
					.filter(({ displayInHeader }) => displayInHeader)
					.filter(({ onlyDisplayWhenAuthenticated }) => (
						onlyDisplayWhenAuthenticated ? isAuthenticated : true
					))
					.map(x => this.renderNavItem(x))
				}
			</ul>
		)
	}

	renderNavItem({ name, to, description }) {
		return (
			<li className="header-nav__item" key={name}>
				<Link
					to={`/${to}`}
					className="header-nav__link"
					activeClassName="is-active"
					activeOnlyWhenExact={true}
					title={description || name}
				>{name}</Link>
			</li>
		)
	}

	render() {
		const { isAuthenticated } = this.props
		return (
			<nav className="header-nav">
				{this.renderNavItems()}
				<ul>
					{!isAuthenticated && [
						<li key="login">
							<Link to="/login" title="Login">Login</Link>
						</li>,
						<li key="sign-up">
							<Link to="/sign-up" title="Sign-Up">Sign-Up</Link>
						</li>,
					]}
					{isAuthenticated &&
						<li>
							<a href="javascript:" onClick={this.handleLogout.bind(this)}>LOGOUT</a>
						</li>
					}
				</ul>
			</nav>
		)
	}
}

export default connect(({ account }) => ({
	isAuthenticated: account.isAuthenticated,
}))(stylesLoader.render(HeaderNav))
