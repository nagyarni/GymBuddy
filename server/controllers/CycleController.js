// CycleController.js
const { default: mongoose } = require('mongoose');
const Cycle = require('../schemas/Cycle'); // Assuming you have a Cycle model
const User = require('../schemas/User')


const CycleController = {
  //User data stored in req.user (already queried by userTypeMiddleware)
  getCyclesByUserId: async (req, res) => {
    try {
      const user = req.user;
      const cycles = user._client.cycles
      //console.log(cycles)
      res.json({ cycles: cycles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addCycle: async (req, res) => {
    try {
      //Query the user based on query param ID
      const user = req.user
      // Assuming req.body contains the cycle information
      const cycle = await Cycle.create({ ...req.body });
      //Update user cycles information with new cycle ID
      user._client.cycles.push(cycle._id)
      await user.save()

      res.json(cycle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCycle: async (req, res) => {
    try {
      // Check if cycleid is a valid ID format
      if (!mongoose.Types.ObjectId.isValid(req.params.cycleid)) {
        return res.status(404).json({ message: 'Invalid cycleID format' });
      }

      // Check if queried client has the specified cycleID in their list of cycleIDs
      // Need to check req.user._client.cycles (array), each of these elements' _id attribute if it contains
      // one that matches the req.params.id
      const hasCycle = req.user._client.cycles.some(cycle => cycle._id.equals(req.params.cycleid));

      if (!hasCycle) {
        return res.status(401).json({ message: 'Client does not have the specified cycleID' });
      }
      
      // Assuming req.body contains the updated cycle information
      const cycle = await Cycle.findByIdAndUpdate(req.params.cycleid, req.body, { new: true });
      // This shouldn't throw EVER -> if it throws we fucked up
      if (!cycle) {
        return res.status(404).json({ message: 'Cycle not found' });
      }
      res.json(cycle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCycle: async (req, res) => {
    try {
      // Need to make sure given cycleID is valid
      if (!mongoose.Types.ObjectId.isValid(req.params.cycleid)) {
        return res.status(404).json({ message: 'Invalid cycleID format' });
      }

      const cycle = await Cycle.findByIdAndDelete(req.params.cycleid);
      if (!cycle) {
        return res.status(404).json({ message: 'Cycle not found' });
      }

      // If cycle is successfully deleted, the ID still needs to be removed from its corresponding client user
      // req.user stores the user data, need to modify this and then save into database
      //console.log(req.user._client.cycles)
      req.user._client.cycles = req.user._client.cycles.filter(_id => _id.toString() !== req.params.cycleid);

      // Save the modified user data
      await req.user.save();

      res.json({ message: 'Cycle deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Other CycleController methods
};

module.exports = CycleController;
