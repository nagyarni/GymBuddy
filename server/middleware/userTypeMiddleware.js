const User = require('../schemas/User')
const Cycle = require('../schemas/Cycle')

// This file contains the TARGET side authentications; 
// if the target is of the correct type of document

// req.user → stores user data WITH cycles populated (only use with cycle related requests) 
// so it is basically just a check and then a join between the two collections
async function userTypeClient(req, res, next, populate = true) {
  const user = await User.findById(req.params.id);
  //console.log(user)
  if (!user._client) {
    res.status(400).json({ error: "Queried user is not a Client!" })
    return
  }
  let userWithCycles = user
  if (populate) {
    userWithCycles = await user.populate({
      path: '_client.cycles',
      model: 'Cycle',
    })
    console.log("running populate")
  }
  //console.log(userWithCycles)
  console.log("userTypeClient middleware recognized target user as Client. Proceeding...")
  req.user = userWithCycles
  next()
}

// req.user → stores user data WITH clients populated (only use with client-user related requests)
async function userTypeCoach(req, res, next, populate = true) {
  const user = await User.findById(req.params.id)
  if (!user._coach) {
    res.status(400).json({ error: "Queried user is not a Coach!" })
    return
  }
  let userWithClients = user
  if (populate) {
    userWithClients = await user.populate({
      path: '_coach.clients',
      model: 'User',
    })
    console.log("running populate")
  }
  console.log("userTypeCoach middleware recognized target user as Coach. Proceeding...")
  req.user = userWithClients
  next()
}

async function userTypeAdmin(req, res, next) {

}

module.exports = { userTypeClient, userTypeCoach, userTypeAdmin };