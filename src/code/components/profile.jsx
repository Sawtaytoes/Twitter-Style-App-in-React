import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// Components
import TweetList from 'components/tweet-list'
import TweetEditor from 'components/tweet-editor'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

const GET_USER_TWEETS = gql`
query GetUserTweets {
	user(userId: 1) {
		tweets {
			content
			postTime {
				time
				unixTime
			}
			user {
				username
			}
		}
	}
}`

const ADD_TWEET = gql`
mutation AddUserTweet($input: AddTweetInput!) {
	addTweet(input: $input) {
		tweetId
	}
}`

class Profile extends PureComponent {
	static propTypes = {
		userId: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired,
		mutate: PropTypes.func.isRequired,
	};

	// static defaultProps = {};

	render() {
		const { userId, username, data, mutate } = this.props
		return (
			<div>
				<h1>Profile</h1>
				<p>UserId: {userId}</p>
				<p>Username: {username}</p>
				<button onClick={() => mutate.call(this, { variables: { input: { userId, content: 'TEST' } }})}>TEST</button>

				<TweetEditor
					add={input => mutate.call(this, { variables: { input }})}
					refresh={() => data.fetchMore(GET_USER_TWEETS)}
				/>
				<TweetList tweets={data.user && data.user.tweets} refresh={() => data.fetchMore(GET_USER_TWEETS)} />
			</div>
		)
	}
}

export default connect(({ account }) => ({
	userId: account.userId,
	username: account.username,
}))(graphql(GET_USER_TWEETS)(graphql(ADD_TWEET)(stylesLoader.render(Profile))))
