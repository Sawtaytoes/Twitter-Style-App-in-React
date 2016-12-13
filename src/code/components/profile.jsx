import React, { PureComponent } from 'react'
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

const GET_USER_TWEETS = gql`query {
user(userId: 0) {
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
}}`

class Profile extends PureComponent {
	render() {
		const { userId, username, data } = this.props
		return (
			<div>
				<h1>Profile</h1>
				<p>UserId: {userId}</p>
				<p>Username: {username}</p>

				<TweetEditor refresh={() => data.fetchMore(GET_USER_TWEETS)} />
				<TweetList tweets={data.user.tweets} refresh={() => data.fetchMore(GET_USER_TWEETS)} />
			</div>
		)
	}
}

export default connect(({ account }) => ({
	userId: account.userId,
	username: account.username,
}))(graphql(GET_USER_TWEETS)(stylesLoader.render(Profile)))
