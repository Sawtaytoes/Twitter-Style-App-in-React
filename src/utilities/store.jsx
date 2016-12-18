import { compose, applyMiddleware, createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'

// Utilities
import rootReducer from 'reducers'
import { client } from 'utilities/apollo-client'
import { getInitialState } from 'utilities/initial-state'

const initialState = getInitialState()
const history = createBrowserHistory()

const middlewares = [
	client.middleware(),
]

const store = compose(applyMiddleware(...middlewares))(
	window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
)(rootReducer, initialState)

module.hot && module.hot.accept('reducers', () => {
	store.replaceReducer(require('reducers'))
})

syncHistoryWithStore(history, store)

export {
	history,
	store,
}
