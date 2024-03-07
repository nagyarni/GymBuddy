// CycleController.js
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
      const user = await User.findById(req.params.id)
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
      // Assuming req.body contains the updated cycle information
      const cycle = await Cycle.findByIdAndUpdate(req.params.cycleid, req.body, { new: true });
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
      const cycle = await Cycle.findByIdAndDelete(req.params.cycleid);
      if (!cycle) {
        return res.status(404).json({ message: 'Cycle not found' });
      }
      res.json({ message: 'Cycle deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Other CycleController methods
};

module.exports = CycleController;
