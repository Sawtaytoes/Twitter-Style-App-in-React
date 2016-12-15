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

const MutationTweetEditor = graphql(GET_USER_TWEETS)(graphql(ADD_TWEET)(TweetEditor))
const QueryTweetList = graphql(GET_USER_TWEETS, {
	props: ({ _, data: { loading, user, refetch } }) => ({
		tweets: user && user.tweets,
		loading: loading,
		refetch: refetch,
	})
})(TweetList)

class Profile extends PureComponent {
	static propTypes = {
		userId: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired,
	};

	// static defaultProps = {};

	render() {
		const { userId, username } = this.props
		return (
			<div>
				<h1>Profile</h1>
				<p>UserId: {userId}</p>
				<p>Username: {username}</p>

				<MutationTweetEditor />
				<QueryTweetList />
			</div>
		)
	}
}

export default connect(({ account }) => ({
	userId: account.userId,
	username: account.username,
}))(stylesLoader.render(Profile))
