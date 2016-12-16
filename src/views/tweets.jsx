import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// Components
import TweetList from 'components/tweet-list'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

const GET_TWEETS = gql`
query GetTweets {
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
}`

const QueryTweetList = graphql(GET_TWEETS, {
	props: ({ _, data: { loading, tweets, refetch } }) => ({
		tweets: tweets,
		loading: loading,
		refetch: refetch,
	})
})(TweetList)

class Tweets extends PureComponent {
	render() { return (
		<div>
			{/*<TweetList tweets={data.tweets} refresh={() => data.fetchMore(GET_TWEETS)} />*/}
			<QueryTweetList />
		</div>
	)}
}

export default stylesLoader.render(Tweets)
