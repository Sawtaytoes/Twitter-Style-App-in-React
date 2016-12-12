import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class TweetEditor extends PureComponent {
	static propTypes = {
		userId: PropTypes.number.isRequired,
		refresh: PropTypes.func,
	};

	static defaultProps = {
		refresh: () => {},
	};

	constructor() {
		super()
		this.fields = {}
	}

	handleSubmission() {
		const { userId, refresh } = this.props
		const body = JSON.stringify(this.fields)

		return fetch(`/api/user/${userId}/tweet`, {
				body,
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			})
			.then(res => res.json())
			.then(() => refresh())
			.catch(err => console.error(err))
	}

	handleKeyDown(e) {
		const keyCode = e.keyCode || e.which
		if (e.key === 'Enter' || keyCode === 13) {
			this.handleSubmission()
		}
	}

	handleInputChanged(fieldName) {
		return e => this.fields[fieldName] = e.target.value
	}

	render() {
		return (
			<form action="javascript:">
				<textarea
					name="content"
					defaultValue={this.fields.content}
					onChange={this.handleInputChanged('content')}
					onKeyDown={this.handleKeyDown.bind(this)}
				/>
				<button onClick={this.handleSubmission.bind(this)}>Add</button>
			</form>
		)
	}
}

export default connect(({ account, tweet }) => ({
	userId: account.userId,
	showEditor: tweet.showEditor,
}))(stylesLoader.render(TweetEditor))
