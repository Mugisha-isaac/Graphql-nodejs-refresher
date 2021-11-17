const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql
// const _ = require('lodash')
const Article = require('../model/article')
const Contributor = require('../model/contributor')


// let articles = [
//     { name: 'The history of Node.js', topic: 'Node.js', date: Date.now(), id: '1', contributorId: '1' },
//     { name: 'Understanding Docker concepts', topic: 'Containers', date: Date.now(), id: '2', contributorId: '2' },
//     { name: 'Linting in Node.js using ESLint', topic: 'Node.js', date: Date.now(), id: '3', contributorId: '2' },
//     { name: 'REST APIS - Introductory quide ', topic: 'API', date: Date.now(), id: '4', contributorId: '1' }
// ]


// let contributors = [
//     { name: 'John Doe', url: '/john-doe', major: 'Computer Science', id: '1' },
//     { name: 'Jane Doe', url: '/jane-doe', major: 'Physics', id: '2' }
// ]

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
                // return _.find(contributors, { id: parent.contributorId })
                Contributor.findById(parent.contributorId)
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
                // return _.filter(articles, { contributorId: parent.id })
                Article.find({ contributorId: parent.id })
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addArticle: {
            type: ArticleType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                topic: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                contributorId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve (parent, args) {
                let article = new Article({
                    name: args.name,
                    topic: args.topic,
                    date: args.date,
                    contributorId: args.contributorId
                })
                return article.save()
            }
        },
        addContributor: {
            type: ContributorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                url: { type: new GraphQLNonNull(GraphQLString) },
                major: { type: GraphQLString }
            },
            resolve (parent, args) {
                let contributor = new Contributor({
                    name: args.name,
                    url: args.url,
                    major: args.major
                })
                return contributor.save()
            }

        }
    }
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
                // return _.find(articles, { 'id': args.id })
                return Article.findById(args.id)
            }
        },
        contributor: {
            type: ContributorType,
            args: { id: { type: GraphQLID } },
            resolve (parent, args) {
                // return_.find(contributors, { 'id': args.id })
                return Contributor.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
