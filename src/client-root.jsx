import React, { Component } from 'react'
import { ApolloProvider as Provider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router'

// Components
import Routes from 'routes'

// Utilities
import { store } from 'utilities/store'
import { client } from 'utilities/apollo-client'

export default class ClientRoot extends Component {
	render() { return (
		<Provider store={store} client={client}>
			<Router>
				<Routes />
			</Router>
		</Provider>
	)}
}
