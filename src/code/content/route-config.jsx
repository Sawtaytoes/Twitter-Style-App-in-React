// Views
import Home from 'views/home'
import Tweets from 'views/tweets'
import NoMatch from 'views/404'

export const redirs = [{
	pattern: '**/',
	to: ({ location }) => location.pathname.slice(0, -1),
	exactly: true,
}].map(redir => {
	const { to } = redir
	return {
		...redir,
		to: typeof to !== 'function' ? () => to : to
	}
})

export const routes = [{
	name: 'home',
	pattern: '/',
	exactly: true,
	component: Home,
}, {
	name: 'home',
	pattern: '/login',
	component: Home,
}, {
	name: 'home',
	pattern: '/sign-up',
	component: Home,
}, {
	name: 'profile',
	pattern: '/profile',
	component: Home,
}, {
	name: 'tweets',
	pattern: '/tweets',
	component: Tweets,
}, {
	name: '404',
	component: NoMatch,
}]
