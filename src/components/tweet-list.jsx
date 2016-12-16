import React, { PureComponent, PropTypes } from 'react'
// import { connect } from 'react-redux'

// Utilities
import StylesLoader from 'utilities/styles-loader'

// Styles
const stylesLoader = StylesLoader.create()
stylesLoader.add(require('components/tweet-list.styl'))

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
		refetch: PropTypes.func,
	};

	static defaultProps = {
		tweets: [],
		loading: false,
		refetch: () => {},
	};

	render() {
		const { tweets, loading, refetch } = this.props
		console.debug('loading', loading)

		return (
			<div>
				{tweets && <h2>Tweets
					{loading && <span> <span>
						<i className="fa fa-spinner fa-pulse fa-fw"></i>
					</span></span>}
				</h2>}

				<button onClick={() => refetch()}>Refresh</button>

				<ul>
					{tweets.sort((a, b) => (
						b.postTime.unixTime - a.postTime.unixTime
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
