import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader'
import { ApolloProvider as Provider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router'

// Components
import Routes from 'routes'

// Utilities
import { store } from 'utilities/store'
import { client } from 'utilities/apollo-client'

export default class ClientRoot extends Component {
	render() { return (
		<AppContainer>
			<Provider store={store} client={client}>
				<Router>
					<Routes />
				</Router>
			</Provider>
		</AppContainer>
	)}
}
