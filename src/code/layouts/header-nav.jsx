import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Content
import navItems from 'content/nav-items'

// Styles
const stylesLoader = StylesLoader.create()
// .add(require('styl/header-nav'))

class HeaderNav extends PureComponent {
	renderNavItems() { return (
		<ul className="header-nav__list">
			{
				navItems
				.filter(({displayInHeader}) => displayInHeader)
				.map(x => this.renderNavItem(x))
			}
		</ul>
	)}

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

	render() { return (
		<nav className="header-nav">
			{this.renderNavItems()}
		</nav>
	)}
}

export default connect(() => ({
	// Placeholder
}))(stylesLoader.render(HeaderNav))
