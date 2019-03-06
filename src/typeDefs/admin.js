import { gql } from 'apollo-server-express'
export default gql`

type Admin {
	id: ID
	name: String
	email: String
	position: String
}

extend type Query {
	adminMe: Admin
	isAdminSign: Boolean
}
extend type Mutation {
	signUpAdmin(name: String!, email: String, position: String!, password: String): Admin
	signInAdmin(email: String!, password: String!): Boolean
}

`