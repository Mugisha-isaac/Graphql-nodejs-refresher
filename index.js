const express = require('express')
const schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql')
const PORT = process.env.port || 5000
const app = express()


app.get('/', (_, res) => {
    res.send('Welcome to graphql and nodejs tutorial')
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
