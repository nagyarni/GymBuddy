// Import necessary modules
const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware'); // Import your authentication middleware
const userTypeMiddleware = require('./middleware/userTypeMiddleware')
const UserController = require('./controllers/UserController'); // Import your user controller
const CycleController = require('./controllers/CycleController'); // Import your cycle controller
const { populate } = require('./schemas/User');

// GET Endpoints
router.get('/users', (req, res) => authMiddleware(req, res, () => UserController.getAllUsers(req, res)));
router.get('/users/:id', (req, res) => authMiddleware(req, res, () => UserController.getUserById(req, res)));
router.get('/users/:id/cycles', authMiddleware, userTypeMiddleware.userTypeClient, CycleController.getCyclesByUserId);
router.get('/users/:id/clients', authMiddleware, userTypeMiddleware.userTypeCoach, UserController.getClientsByCoachId);

// POST Endpoints
router.post('/auth/login', (req, res) => UserController.login(req, res));
router.post('/auth/register', (req, res) => UserController.register(req, res));
router.post('/users/:id/cycles', authMiddleware, (req, res) => userTypeMiddleware.userTypeClient(req, res, () => CycleController.addCycle(req, res), { populate: false }));
router.post('/users/:id/clients', (req, res) => authMiddleware(req, res, () => UserController.addClient(req, res)));

// PATCH Endpoints
router.patch('/users/:id/cycles/:cycleid', (req, res) => authMiddleware(req, res, () => CycleController.updateCycle(req, res)));
router.patch('/users/:id', (req, res) => authMiddleware(req, res, () => UserController.updateUser(req, res)));

// DELETE Endpoints
router.delete('/users/:id', (req, res) => authMiddleware(req, res, () => UserController.deleteUser(req, res)));
router.delete('/users/:id/cycles/:cycleid', (req, res) => authMiddleware(req, res, () => CycleController.deleteCycle(req, res)));

module.exports = router;
