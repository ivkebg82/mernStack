const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db')

const {
    errorHandler
} = require('./middlewares/errorMiddleware')

const port = process.env.PORT || 5000


connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler) //errorHandler will overwrite default express error handler
app.listen(port, () => console.log(`Server started on port: ${port}`))