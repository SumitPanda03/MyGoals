const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require("./backend/config/db")
const {errorHandler} = require('./backend/middleware/errorMiddleware')

// const url = "mongodb+srv://sumitpanda1308:ZwKjMaPzKDpmaQfy@mongoose.ibdvkx1.mongodb.net/"

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./backend/routes/goalRoutes'))
app.use('/api/users', require('./backend/routes/userRoutes'));

app.use(errorHandler)//express errorHandler

app.listen(port, () => console.log(`On PORT ${port}`))
