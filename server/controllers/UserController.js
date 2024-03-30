// UserController.js
const { default: mongoose } = require('mongoose');
const User = require('../schemas/User'); // Assuming you have a User model
const Cycle = require('../schemas/Cycle')
const { isClientIDValid } = require('../middleware/userTypeMiddleware');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      let users = await User.find().select("-password");

      // Create an array to store promises
      const populatePromises = [];

      // Iterate through each user
      for (const user of users) {
        // Check if the user has a _coach attribute
        if (user._coach) {
          // Push the promise returned by populate() to the array
          populatePromises.push(
            user.populate({
              path: "_coach.clients",
              model: "User",
            })
          );
        }
      }

      // Wait for all populate() promises to resolve
      await Promise.all(populatePromises);

      // Send the populated users array in the response
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      // Check if ID is correct
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

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
      const token = await user.generateAuthToken();

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Type = 0 -> client, 1 -> coach
  register: async (req, res) => {
    try {
      console.log(req.body)
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
        emailNotif: req.body.allowExtraEmails ? true : false,
        cycles: []
      } :
      req.body._coach = {
        emailNotif: req.body.allowExtraEmails ? true : false,
        clients: []
      }

      // Preliminary coachID checks
      let coachIDCheckPassed = false
      let fetchedCoach = null
      if (req.body.coachID && req.body.type === 0) {

        // Check if the provided coachID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.body.coachID)) {
          return res.status(400).json({ message: 'Invalid coachID format' });
        }

        const coach = await User.findById(req.body.coachID)

        // Check if a user was found or not
        if (!coach) {
          return res.status(401).json({ message: 'No coach found with the provided ID' });
        }

        if (!coach._coach) {
          return res.status(401).json({ message: 'Bad coach ID!' });
        }
        fetchedCoach = coach
        coachIDCheckPassed = true
      }

      // Assuming req.body contains user registration data
      const newUser = await User.create(req.body);

      // Checking if data includes coachID (user has to be Client type), setting coach
      if (coachIDCheckPassed) {
        console.log(fetchedCoach)
        fetchedCoach._coach.clients.push(newUser._id)
        await fetchedCoach.save()
        console.log("Registration request incluced coachID, successfully set created client to specified coach: " + fetchedCoach._id)
      }

      // Assuming you have a method to generate a JWT token
      const token = await newUser.generateAuthToken();

      res.json({ token });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        // Duplicate key violation for the email field
        const duplicateEmail = error.keyValue.email;
        console.error(`Error creating user: Email '${duplicateEmail}' is already in use.`);
        // Send a user-friendly response to the client
        return res.status(400).json({ error: `Email '${duplicateEmail}' is already in use.` });
      } else {
        // Handle other errors
        console.error('Error creating user:', error.message);
        // Send a generic error response to the client
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },

  addClient: async (req, res) => {
    try {
      //Query the user based on query param ID
      // Client inside body will be added to this user (coach)
      const user = req.user

      // Request body clientID validity checks
      if (req.body.clientID === undefined || req.body.clientID === null) {
        return res.status(401).json({ message: 'No clientID received in request!' });
      }
      
      const result = await isClientIDValid(req.body.clientID)
      if (result.error) {
        return res.status(401).json({ message: result.message })
      }

      const clientID = req.body.clientID

      // First, make sure that the coach clients list does NOT
      // contain the ClientID to be added - no duplicates
      if (user._coach.clients.some(client => client._id.toString() === clientID)) {
        return res.status(400).json({ message: 'Client is already added to the coach' });
      }

      // Update user information with new ClientID
      user._coach.clients.push(clientID)

      await user.save()

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      // Since there is no user type middleware included, check for ID validity is required
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

      const oldPassword = req.body.oldPassword
      const email = req.body.email
      const user = await User.authenticate(email, oldPassword);

      if (user === null) {
        return res.status(400).json({ message: 'Wrong password!' });
      }

      // Filter out permission change requests from newUserInfo
      const { _admin, _client, _coach, ...userInfo } = req.body.newUserInfo;

      let clientNotif = null
      let coachNotif = null

      if (_client) {
        clientNotif = _client.emailnotif
      }
      if (_coach) {
        coachNotif = _coach.emailnotif
      }

      if (clientNotif !== null) {
        userInfo._client = user._client
        userInfo._client.emailnotif = clientNotif
      }
      if (coachNotif !== null) {
        userInfo._coach = user._coach
        userInfo._coach.emailnotif = coachNotif
      }

      console.log(userInfo)

      // Assuming req.body contains the updated user information
      const updatedUser = await User.findByIdAndUpdate(req.params.id, userInfo, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(updatedUser)

      const token = await updatedUser.generateAuthToken();

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      let message = "User deleted successfully"
      // Since there is no user type middleware included, check for ID validity is required
      const userId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

      // const user = await User.findById(req.params.id);

      // if (!user) {
      //   return res.status(404).json({ message: 'Failed to find user.' });
      // }

      // if (user._client) {
      //   // We need to delete all associated cycles first if the user is a client
      //   await Cycle.deleteMany({ user });
      //   message = "User and associated cycles deleted successfully"
      // }



      // Find the user by _id
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found!");
      }

      if (user._client && user._client.cycles && user._client.cycles.length > 0) {
        console.log("User is a client, removing all associated cycles");
        const cycleIdsToDelete = user._client.cycles.map(cycle => cycle._id);
        await Cycle.deleteManyByIdList(cycleIdsToDelete);
      }
      console.log("breakpoint")

      const deletedUser = await User.deleteOne({ _id: userId });
      if (!deletedUser) {
        return res.status(404).json({ message: 'Failed to delete user.' });
      }
      console.log(deletedUser)
      res.json({ message: message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteClient: async (req, res) => {
    try {
      // Coach ID and existence already verified by middleware
      const coach = req.user
      //console.log(coach)

      // Need to make sure given clientID is correct and exists within coach data
      if (!mongoose.Types.ObjectId.isValid(req.params.clientid)) {
        return res.status(400).json({ message: 'Invalid clientID format' });
      }

      // Remove given clientID from _coach.clients array and save coach document to db
      coach._coach.clients = coach._coach.clients.filter(_id => _id.toString() !== req.params.clientid);
      // This won't check if the given clientID exists within the coaches clients!

      // Save the modified coach document to the database
      await coach.save();

      res.json({ message: 'Client deleted from coach successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Other UserController methods (login, register, updateUser, deleteUser, etc.)
};

module.exports = UserController;
