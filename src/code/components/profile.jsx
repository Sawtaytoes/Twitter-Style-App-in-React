import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Components
import TweetList from 'components/tweet-list'
import TweetEditor from 'components/tweet-editor'

// Actions
import { getTweets, setTweets } from 'ducks/tweet'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class Profile extends PureComponent {
	componentWillMount() {
		this.loadTweets()
	}

	componentDidUpdate() {
		this.loadTweets()
	}

	loadTweets() {
		const { dispatch, userId, username } = this.props

		dispatch(getTweets())

		return fetch(`/api/user/${userId}/tweet`, { headers: { 'Content-Type': 'application/json' } })
			.then(res => res.json())
			.then(({ tweets }) => tweets.map(tweet => ({
				...tweet,
				username,
			})))
			.then(res => dispatch(setTweets(res)))
			.catch(err => console.error(err))
	}

	render() {
		const { userId, username } = this.props
		return (
			<div>
				<h1>Profile</h1>
				<p>UserId: {userId}</p>
				<p>Username: {username}</p>

				<TweetEditor refresh={this.loadTweets.bind(this)} />
				<TweetList refresh={this.loadTweets.bind(this)} />
			</div>
		)
	}
}

export default connect(({ account }) => ({
	userId: account.userId,
	username: account.username,
}))(stylesLoader.render(Profile))
