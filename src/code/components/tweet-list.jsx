import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class TweetList extends PureComponent {
	static propTypes = {
		tweets: PropTypes.arrayOf(PropTypes.shape({
			username: PropTypes.string,
			content: PropTypes.string,
			postDate: PropTypes.string,
		})),
		loading: PropTypes.bool,
		refresh: PropTypes.func,
	};

	static defaultProps = {
		tweets: [],
		loading: false,
		refresh: () => {},
	};

	render() {
		const { tweets, loading, refresh } = this.props
		return (
			<div>
				{tweets && <h2>Tweets
					{loading && <span> <span>
						<i className="fa fa-spinner fa-pulse fa-fw"></i>
					</span></span>}
				</h2>}

				<button onClick={refresh}>Refresh</button>

				<ul>
					{tweets.map(({ username, content, postTime }) => (
						<li key={postTime}>
							<div>Username: {username}</div>
							<div>Content: {content}</div>
							<div>Posted: {postTime}</div>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default connect(({ tweet }) => ({
	tweets: tweet.list,
	loading: tweet.loading,
}))(stylesLoader.render(TweetList))
