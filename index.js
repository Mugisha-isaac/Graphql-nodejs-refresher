const express = require('express')
const schema = require('./schema/schema')
const PORT = process.env.port || 5000
const app = express()


app.get('/', (_, res) => {
    res.send('Welcome to graphql and nodejs tutorial')
})


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
