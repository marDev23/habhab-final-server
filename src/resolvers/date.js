import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import dayjs from 'dayjs'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      return dayjs(value)
    },
    serialize (value) {
      return dayjs(value).format('MM-DD-YYYY,hh:mm A')
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return dayjs(ast.value)
      }
      return null
    }
  })
}
