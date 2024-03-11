// Import necessary modules
const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware'); // Import your authentication middleware
const userTypeMiddleware = require('./middleware/userTypeMiddleware')
const UserController = require('./controllers/UserController'); // Import your user controller
const CycleController = require('./controllers/CycleController'); // Import your cycle controller
const { requestSelf, requestCoachClient, requestCoachClientOrSelf, requestAdmin } = require('./middleware/validateRequesterMiddleware')
const { populate } = require('./schemas/User');

/* 
// GET Endpoints
router.get('/users', authMiddleware, requestAdmin, UserController.getAllUsers);
router.get('/users/:id', authMiddleware, requestSelf, UserController.getUserById);
router.get('/users/:id/cycles', authMiddleware, requestCoachClientOrSelf, userTypeMiddleware.userTypeClient, CycleController.getCyclesByUserId);
router.get('/users/:id/clients', authMiddleware, requestSelf, userTypeMiddleware.userTypeCoach, UserController.getClientsByCoachId);

// POST Endpoints
router.post('/auth/login', UserController.login);
router.post('/auth/register', UserController.register);
router.post('/users/:id/cycles', authMiddleware, requestCoachClient, (req, res, next) => userTypeMiddleware.userTypeClient(req, res, next, false), CycleController.addCycle);

// Query param includes coachID (checked with middleware), 
// request body includes clientID
router.post('/users/:id/clients', authMiddleware, requestSelf, (req, res, next) => userTypeMiddleware.userTypeCoach(req, res, next, false), UserController.addClient);

// PATCH Endpoints
router.patch('/users/:id/cycles/:cycleid', authMiddleware, requestCoachClientOrSelf, (req, res, next) => userTypeMiddleware.userTypeClient(req, res, next, false), CycleController.updateCycle);
router.patch('/users/:id', authMiddleware, requestSelf, UserController.updateUser);

// DELETE Endpoints
// Delete user
router.delete('/users/:id', authMiddleware, requestAdmin, UserController.deleteUser);

// Delete cycle
router.delete('/users/:id/cycles/:cycleid', authMiddleware, requestCoachClient, (req, res, next) => userTypeMiddleware.userTypeClient(req, res, next, false), CycleController.deleteCycle);

// Delete client from coach (first id belongs to coach)
router.delete('/users/:id/clients/:clientid', authMiddleware, requestCoachClient, (req, res, next) => userTypeMiddleware.userTypeCoach(req, res, next, false), UserController.deleteClient);
 */

// GET Endpoints
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/users/:id/cycles', userTypeMiddleware.userTypeClient, CycleController.getCyclesByUserId);
router.get('/users/:id/clients', userTypeMiddleware.userTypeCoach, UserController.getClientsByCoachId);

// POST Endpoints
router.post('/auth/login', UserController.login);
router.post('/auth/register', UserController.register);
router.post('/users/:id/cycles', (req, res, next) => userTypeMiddleware.userTypeClient(req, res, next, false), CycleController.addCycle);

// Query param includes coachID (checked with middleware), 
// request body includes clientID
router.post('/users/:id/clients', (req, res, next) => userTypeMiddleware.userTypeCoach(req, res, next, false), UserController.addClient);

// PATCH Endpoints
router.patch('/users/:id/cycles/:cycleid', (req, res, next) => userTypeMiddleware.userTypeClient(req, res, next, false), CycleController.updateCycle);
router.patch('/users/:id',  UserController.updateUser);

// DELETE Endpoints
// Delete user
router.delete('/users/:id', UserController.deleteUser);

// Delete cycle
router.delete('/users/:id/cycles/:cycleid', (req, res, next) => userTypeMiddleware.userTypeClient(req, res, next, false), CycleController.deleteCycle);

// Delete client from coach (first id belongs to coach)
router.delete('/users/:id/clients/:clientid', (req, res, next) => userTypeMiddleware.userTypeCoach(req, res, next, false), UserController.deleteClient);

module.exports = router;
