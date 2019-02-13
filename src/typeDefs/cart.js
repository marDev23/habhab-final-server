import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        cart: [Cart]
    }
    extend type Mutation { 
        addToCart(productId: ID, quantity: Float) : Cart
        updateQuantity(id: ID, quantity: Float): Cart
        deleteToCart(id: ID): Cart
    }
    type Cart {
        id: ID!
        product: ProductCart
        quantity: Float
    }
`
