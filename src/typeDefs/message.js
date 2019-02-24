import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        message(id: ID!): Message
    }
    extend type Mutation { 
        deleteMessage(id: ID) : Boolean
        addMessage(userId: ID, title: String, body: String): Message
    }

    type Message {
        id: ID!
        userId: ID!
        title: String!
        body: String!
        isOpened: Boolean
    }
`
