import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

const typeDefs = gql`
    extend type User {
        age: Int!
    }

    extend type Pet {
        vaccinated: Boolean!
    }
`

const resolvers = {
    User: {
        age() {
            return 35
        }
    },

    Pet: {
        vaccinated(model) {
            return model.type === 'CAT'
        }
    }
}


const link = createHttpLink({ uri: 'http://localhost:4000' })
const cache = new InMemoryCache()

const client = new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers
})

export default client
