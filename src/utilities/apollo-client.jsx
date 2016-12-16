import ApolloClient, { createNetworkInterface } from 'apollo-client'

export const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		shouldBatch: true,
		uri: '/api/graphql',
	}),
})
