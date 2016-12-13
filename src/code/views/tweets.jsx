import React, { PureComponent, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// Components
import TweetList from 'components/tweet-list'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

const GET_TWEETS = gql`query {
tweets {
	content
	postTime {
		time
		unixTime
	}
	user {
		username
	}
}}`

class Tweets extends PureComponent {
	static propTypes = { data: PropTypes.object };
	static defaultProps = { data: {} };

	render() {
		const { data } = this.props
		return (
			<div>
				<TweetList tweets={data.tweets} refresh={() => data.fetchMore(GET_TWEETS)} />
			</div>
		)
	}
}

export default graphql(GET_TWEETS)(stylesLoader.render(Tweets))
