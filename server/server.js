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

//request, response
/* app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

app.listen(5000, () => { console.log("Server started on port 5000") }) */



const testCycle = {
    "name": "Cycle 1",
    "weeks": 4,
    "days": [
      [
        {
          "name": "Bench press",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        },
        {
          "name": "Squat",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        },
        {
          "name": "Deadlift",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        }
      ],
      [
        {
          "name": "Bench pressd2",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        },
        {
          "name": "Squatd2",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        },
        {
          "name": "Deadliftd2",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        }
      ],
      [
        {
          "name": "Bench pressd3",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        },
        {
          "name": "Squatd3",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        },
        {
          "name": "Deadliftd3",
          "series": 4,
          "reps": 3,
          "rpe": [5,6,7,8],
          "weight": [0,0,0,0]
        }
      ]
    ]
}

const testClient = {
    name: "TesterClient 1",
    email: "testerclient@gmail.com",
    password: "tester",
    _client: {
        emailnotif: false,
        cycles: [],
    },
}

//Populate method: basically a join!!!
async function run() {
    try {
        // //const newItem = await Cycle.create(testCycle)
        // //const newItem = await User.create(testClient)
        // const existingCycle = await Cycle.find()
        // const testUser = await User.findOne()
        // // console.log(existingCycle)
        // existingCycle.map((cycle) => {
        //     console.log(cycle._id)
        //     testUser._client.cycles.push(cycle._id)
        // })
        // await testUser.save()
        // console.log(testUser)

    } catch (error) {
        console.log(error.message)
    }
}
run()

app.listen(5000, () => { console.log("Server started on port 5000") })