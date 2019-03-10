import { gql } from 'apollo-server-express'
export default gql`

type Delivery {
	id: ID
	name: String
	email: String
	mobile: String
	isAvailable: Boolean
}

extend type Query {
	deliveryGuy(id: ID!): Delivery
	deliveryGuys: [Delivery]
}
extend type Mutation {
	editDeliveryMan(id: ID!, name: String!, email: String!, mobile: String!, isAvailable: Boolean!): Delivery
	createDeliveryMan(name: String!, email: String!, mobile: String!, isAvailable: Boolean!): Delivery 
}
`