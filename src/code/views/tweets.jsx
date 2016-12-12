import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Components
import TweetList from 'components/tweet-list'

// Actions
import { getTweets, setTweets } from 'ducks/tweet'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class Tweets extends PureComponent {
	componentWillMount() {
		this.loadTweets()
	}

	componentDidUpdate() {
		this.loadTweets()
	}

	loadTweets() {
		const { dispatch } = this.props

		dispatch(getTweets())

		return fetch(`/api/tweet`, { headers: { 'Content-Type': 'application/json' } })
			.then(res => res.json())
			.then(({ tweets }) => tweets.map(tweet => ({
				...tweet,
				username: tweet.userId,
			})))
			.then(res => dispatch(setTweets(res)))
			.catch(err => console.error(err))
	}

	render() {
		return (
			<div>
				<TweetList refresh={this.loadTweets.bind(this)} />
			</div>
		)
	}
}

export default connect(() => ({}))(stylesLoader.render(Tweets))
