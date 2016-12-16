import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// Utilities
import { client } from 'utilities/apollo-client'

// Reducers
import account from 'ducks/account'
import location from 'ducks/location'
import tap from 'ducks/tap'
import tweet from 'ducks/tweet'

export default combineReducers({
	account,
	location,
	routing,
	tap,
	tweet,
	apollo: client.reducer(),
})
