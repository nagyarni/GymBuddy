const User = require('../schemas/User')
const Cycle = require('../schemas/Cycle');
const { default: mongoose } = require('mongoose');

// This file contains the TARGET side authentications; 
// if the target is of the correct type of document

// req.user → stores user data WITH cycles populated (only use with cycle related requests) 
// so it is basically just a check and then a join between the two collections
async function userTypeClient(req, res, next, populate = true) {
  // Check if ID is correct
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const user = await User.findById(req.params.id);

  // Check if a user was found or not
  if (!user) {
    return res.status(401).json({ message: 'No user found with the provided ID' });
  }

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
  // Check if ID is correct
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  const user = await User.findById(req.params.id)

  // Check if a user was found or not
  if (!user) {
    return res.status(401).json({ message: 'No user found with the provided ID' });
  }

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

// Functions for checking validity and if user exists within the database 
async function isClientIDValid(clientID) {
  const result = { error: false, message: '' };

  // Check if clientID is a valid ID format
  if (!mongoose.Types.ObjectId.isValid(clientID)) {
    result.error = true;
    result.message = 'Provided ClientID is invalid!';
    return result;
  }

  const user = await User.findById(clientID);

  if (!user) {
    result.error = true;
    result.message = 'No user found with the provided ID!';
    return result;
  }

  if (!user._client) {
    result.error = true;
    result.message = 'Queried user is not a Client!';
    return result;
  }

  return result;
}

async function isCoachIDValid(coachID) {
  const result = { error: false, message: '' };

  // Check if coachID is a valid ID format
  if (!mongoose.Types.ObjectId.isValid(coachID)) {
    result.error = true;
    result.message = 'Provided CoachID is invalid!';
    return result;
  }

  const user = await User.findById(coachID);

  if (!user) {
    result.error = true;
    result.message = 'No user found with the provided ID!';
    return result;
  }

  if (!user._coach) {
    result.error = true;
    result.message = 'Queried user is not a Coach!';
    return result;
  }

  return result;
}


module.exports = { userTypeClient, userTypeCoach, userTypeAdmin, isClientIDValid, isCoachIDValid };