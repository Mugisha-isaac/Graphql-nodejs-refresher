const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } = graphql
const _ = require('lodash')


let articles = [
    { name: 'The history of Node.js', topic: 'Node.js', date: Date.now(), id: '1', contributorId: '1' },
    { name: 'Understanding Docker concepts', topic: 'Containers', date: Date.now(), id: '2', contributorId: '2' },
    { name: 'Linting in Node.js using ESLint', topic: 'Node.js', date: Date.now(), id: '3', contributorId: '2' },
    { name: 'REST APIS - Introductory quide ', topic: 'API', date: Date.now(), id: '4', contributorId: '1' }
]


let contributors = [
    { name: 'John Doe', url: '/john-doe', major: 'Computer Science', id: '1' },
    { name: 'Jane Doe', url: '/jane-doe', major: 'Physics', id: '2' }
]

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        topic: { type: GraphQLString },
        date: { type: GraphQLString },
        contributorId: { type: GraphQLID },
        contributor: {
            type: ContributorType,
            resolve (parent, args) {
                return _.find(contributors, { id: parent.contributorId })
            }
        }

    })
})

const ContributorType = new GraphQLObjectType({
    name: 'Contributor',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        major: { type: GraphQLString },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve (parent, args) {
                return _.filter(articles, { id: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        status: {
            type: GraphQLString,
            resolve (parent, args) {
                return 'Welcome to graphql. Get ready to join graphql community'
            }
        },
        article: {
            type: ArticleType,
            args: { id: { type: GraphQLID } },
            resolve (parent, args) {
                return _.find(articles, { 'id': args.id })
            }
        },
        contributor: {
            type: ContributorType,
            args: { id: { type: GraphQLID } },
            resolve (parent, args) {
                return_.find(contributors, { 'id': args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
