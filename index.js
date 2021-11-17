const express = require('express')
const schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.port || 5000
const app = express()

mongoose.connect(" mongodb+srv://isaac:Mugisha12!@cluster0.plwsu.mongodb.net/article-contributor-managment-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to database')
}).catch(err => {
    console.log("Failed to connect to database", err)
})



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
