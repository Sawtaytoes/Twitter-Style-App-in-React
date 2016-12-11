import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

// Actions
import { setLoading, setLoaded } from 'ducks/account'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class Login extends PureComponent {
	static propTypes = {
		title: PropTypes.string,
		action: PropTypes.func.isRequired,
	};

	static defaultProps = {
		title: '',
	};

	constructor() {
		super()
		this.fields = {}
	}

	handleSubmission() {
		const { dispatch, submit, action, loading } = this.props
		if (loading) { return }

		dispatch(setLoading())

		submit(this.fields)
		.then(json => dispatch(action(json, this.fields)))
		.then(() => dispatch(setLoaded()))
	}

	handleInputChanged(fieldName) {
		return e => this.fields[fieldName] = e.target.value
	}

	render() {
		const { error, loading, message, title } = this.props
		return (
			<div>
				{title && <h2>{title}</h2>}

				<p style={{ color: 'white', background: error ? 'red' : 'green' }}>
					{message}
				</p>

				<form action="javascript:">
					<input
						type="text"
						name="username"
						defaultValue={this.fields.username}
						onChange={this.handleInputChanged('username')}
					/>
					<input
						type="password"
						name="password"
						defaultValue={this.fields.password}
						onChange={this.handleInputChanged('password')}
					/>
					<button onClick={this.handleSubmission.bind(this)}>{title}</button>
					{loading && <span><i className="fa fa-spinner fa-pulse fa-fw"></i></span>}
				</form>
			</div>
		)
	}
}

export default connect(({ account }) => ({
	error: account.error,
	loading: account.loading,
	message: account.message,
}))(stylesLoader.render(Login))
