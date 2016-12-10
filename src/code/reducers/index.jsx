import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import accountManagement from 'ducks/account-management'
import locationChange from 'reducers/location-change'
import tap from 'reducers/tap'

export default combineReducers({
	accountManagement,
	locationChange,
	tap,
	routing: routerReducer,
})
