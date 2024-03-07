// UserController.js
const { default: mongoose } = require('mongoose');
const User = require('../schemas/User'); // Assuming you have a User model

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClientsByCoachId: async (req, res) => {
    try {
      const user = req.user;
      const clients = user._coach.clients
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Assuming you have a method in your User model to authenticate users
      const user = await User.authenticate(email, password);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Assuming you have a method to generate a JWT token
      const token = user.generateAuthToken();

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Type = 0 -> client, 1 -> coach
  register: async (req, res) => {
    try {
      // Checking if registration data contains user type
      if (req.body.type === undefined || req.body.type === null) {
        return res.status(401).json({ message: 'Bad data 621' });
      }
      if (req.body.type !== 0 && req.body.type !== 1) {
        return res.status(401).json({ message: 'Bad data 622' });
      }
      
      // Setting special fields based on user type
      req.body.type === 0 ? 
      req.body._client = {
        emailNotif: false,
        cycles: []
      } :
      req.body._coach = {
        emailNotif: false,
        clients: []
      }

      // Assuming req.body contains user registration data
      const newUser = await User.create(req.body);

      // Assuming you have a method to generate a JWT token
      const token = newUser.generateAuthToken();

      // Checking if data includes coachID (user has to be Client type), setting coach
      if (req.body.coachID && req.body.type === 0) {

        // Check if the provided coachID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.body.coachID)) {
          return res.status(400).json({ message: 'Invalid coachID format' });
        }

        const coach = await User.findById(req.body.coachID)

        if (!coach._coach) {
          return res.status(401).json({ message: 'Bad coach ID!' });
        }

        coach._coach.clients.push(newUser._id)
        await coach.save()
        console.log("Registration request incluced coachID, successfully set created client to specified coach: " + coach._id)
      }

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      // Assuming req.body contains the updated user information
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Assuming you have a method to delete all associated cycles
      await Cycle.deleteMany({ userId: req.params.id });

      res.json({ message: 'User and associated cycles deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Other UserController methods (login, register, updateUser, deleteUser, etc.)
};

module.exports = UserController;
