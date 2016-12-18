import React, { PureComponent } from 'react'

// Components
import HeaderNav from 'layouts/header-nav'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()
// .add(require('styl/header'))

class Header extends PureComponent {
	render() { return (
		<header className="header">
			<HeaderNav />
		</header>
	)}
}

export default stylesLoader.render(Header)
