import React, { PureComponent, PropTypes } from 'react'
// import { connect } from 'react-redux'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()

class TweetList extends PureComponent {
	static propTypes = {
		tweets: PropTypes.arrayOf(PropTypes.shape({
			content: PropTypes.string,
			postTime: PropTypes.shape({
				time: PropTypes.string,
				unixTime: PropTypes.string,
			}),
			user: PropTypes.shape({
				username: PropTypes.string,
			}),
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
					{tweets.sort((a, b) => (
						a.postTime.unixTime - b.postTime.unixTime
					)).map(({ user, content, postTime }) => (
						<li key={user.username + postTime.unixTime}>
							<div>Username: {user.username}</div>
							<div>Content: {content}</div>
							<div>Posted: {postTime.time}</div>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default stylesLoader.render(TweetList)

// export default connect(({ tweet }) => ({
// 	tweets: tweet.list,
// 	loading: tweet.loading,
// }))(stylesLoader.render(TweetList))
