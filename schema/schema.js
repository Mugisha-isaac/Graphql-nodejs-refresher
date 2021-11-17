const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLId, GraphQLList, GraphQLSchema } = graphql


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        status: {
            type: GraphQLString,
            resolve (parent, args) {
                return 'Welcome to graphql. Get ready to join graphql community'
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
