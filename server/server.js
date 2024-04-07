//Express
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
//Mongoose import
const mongoose = require('mongoose')
const User = require('./schemas/User')
const Cycle = require('./schemas/Cycle')
// cors
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(bodyParser.json());

//Routing stuff import
const router = require('./router')

app.use('/api', router)

mongoose.connect("mongodb://localhost/gymbuddy")

app.listen(5000, () => { console.log("Server started on port 5000") })