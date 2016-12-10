import React, { PureComponent } from 'react'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()
// .add(require('styl/footer'))

class Footer extends PureComponent {
	render() { return (
		<footer className="footer">
			<p className="footer__copyright">
				<span className="footer__copyright__group">© Kevin Ghadyani</span>
			</p>
		</footer>
	)}
}

export default stylesLoader.render(Footer)
