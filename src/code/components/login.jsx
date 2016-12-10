import React, { PureComponent, PropTypes } from 'react'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class Login extends PureComponent {
	static propTypes = {
		title: PropTypes.string,
		action: PropTypes.string.isRequired,
		method: PropTypes.string,
	}

	static defaultProps = {
		title: '',
		method: 'post',
	}

	render() {
		const { title, action, method } = this.props
		return (
			<div>
				{title && <h2>{title}</h2>}

				<form action={action} method={method}>
					<input type="text" name="username" />
					<input type="password" name="password" />
				</form>
			</div>
		)
	}
}

export default stylesLoader.render(Login)
