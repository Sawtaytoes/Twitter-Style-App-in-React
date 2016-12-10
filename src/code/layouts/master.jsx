import React, { PureComponent } from 'react'

// Components
import Header from 'layouts/header'
import Footer from 'layouts/footer'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()
.add(require('normalize.css'))
.add(require('styl/global'))
.add(require('styl/site'))

class Master extends PureComponent {
	render() { return (
		<div className="site-container">
			<header className="site-header">
				<Header />
			</header>

			<div className="site-content">
				<main className="site-main">
					{this.props.children}
				</main>

				<footer className="site-footer">
					<Footer />
				</footer>
			</div>
		</div>
	)}
}

export default stylesLoader.render(Master)
