// Views
import Home from 'views/home'
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
	component: Home,
}, {
	name: '404',
	component: NoMatch,
}]
