// Views
import Home from 'views/home'
import About from 'views/about'
import NoMatch from 'views/404'

export const redirs = [{
	pattern: '/redirect',
	to: '/',
}, {
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
	name: 'about',
	pattern: '/about',
	component: About,
}, {
	name: '404',
	component: NoMatch,
}]

console.error('kevin')
