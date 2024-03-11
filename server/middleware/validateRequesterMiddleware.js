const User = require('../schemas/User')
const Cycle = require('../schemas/Cycle');
const { default: mongoose } = require('mongoose');

// This file contains the REQUESTER side authentication;
// this middleware is supposed to run after the authMiddleware
// in routing, because it needs access to req.users containing
// JWT token payload information.

// Requester is USER, Target is SELF
function requestSelf(req, res, next) {
  adminBypass(req)

  // Extract requester userId from JWT request attribute
  const JWTuserId = req.user.userId

  if (req.params.id == JWTuserId || req.body.clientID == JWTuserId) {
    next()
  }
  else {
    return res.status(400).json({ message: 'Unauthorized 100' });
  }
}

// Requester is COACH, Target is one of THEIR CLIENTS
function requestCoachClient(req, res, next) {
  adminBypass(req)

  // Extract requester userId from JWT request attribute
  const JWTuserId = req.user.userId

  if (req.user.coach && req.user.coach.clients.includes(req.params.id)) {
    next()
  }
  else {
    return res.status(400).json({ message: 'Unauthorized 101' });
  }
}

// Requester is COACH, Target is one of THEIR CLIENTS OR Requester is CLIENT, Target is SELF
function requestCoachClientOrSelf(req, res, next) {
  adminBypass(req)

  // Extract requester userId from JWT request attribute
  const JWTuserId = req.user.userId

  if ((req.user.coach && req.user.coach.clients.includes(req.params.id)) || (req.params.id == JWTuserId)) {
    next()
  }
  else {
    return res.status(400).json({ message: 'Unauthorized 102' });
  }
}

// Requester is ADMIN (This should be able to bypass every other security check) - Will be included separately in every case
function adminBypass(req) {
  if (req.user.admin) {
    console.log("Bypassing access control with admin permissions.")
    return true
  }
}

function requestAdmin(req, res, next) {
  if (adminBypass(req)) {
    next()  
  }
  else {
    return res.status(400).json({ message: 'Unauthorized 103' });
  }
}

module.exports = { requestSelf, requestCoachClient, requestCoachClientOrSelf, requestAdmin }