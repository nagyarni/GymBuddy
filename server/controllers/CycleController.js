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
      res.json({ cycles: cycles, userName: user.name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // New method for the improved coach fetching logic
  getCycleByCycleId: async (req, res) => {
    try {
      const cycleid = req.params.cycleid

      if (!mongoose.Types.ObjectId.isValid(cycleid)) {
        return res.status(404).json({ message: 'Invalid cycleID format' });
      }

      // Check if queried client has the specified cycleID in their list of cycleIDs
      // Need to check req.user._client.cycles (array), each of these elements' _id attribute if it contains
      // one that matches the req.params.id
      const hasCycle = req.user._client.cycles.some(cycle => cycle._id.equals(cycleid));

      if (!hasCycle) {
        return res.status(401).json({ message: 'Client does not have the specified cycleID' });
      }

      const cycle = await Cycle.findById(cycleid)

      if (!cycle) {
        return res.status(404).json({ message: 'Cycle not found' });
      }

      const user = req.user
      
      res.json({ cycle: cycle, userName: user.name })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  addCycle: async (req, res) => {
    try {
      //Query the user based on query param ID
      const user = req.user;
      // Assuming req.body contains the cycle information
      //const cycle = await Cycle.create({ ...req.body });
      const exercisePerDay = parseInt(req.body.exercisePerDay);
      const cycleLength = parseInt(req.body.cycleLength);
      const weekLength = parseInt(req.body.weekLength);
  
      // Logic for randomized cycle creation
      if (req.body.randomize) {
        // These params need to be present
        if (!exercisePerDay || !cycleLength || !weekLength) {
          return res.status(400).json({ message: 'Bad data!' });
        }


        console.log(exercisePerDay, cycleLength, weekLength)
        console.log(Array(2).fill(0))
        // Fetch all the exercises in every cycle of the user that is requesting
        const userCycles = user._client.cycles;
        const previousExercises = [];
  
        // Iterate through every cycle of the user
        userCycles.forEach(cycle => {
          // Iterate through every day
          cycle.days.forEach(day => {
            // Iterate through every exercise
            day.forEach(exercise => {
              // Add exercise to collecting array
              previousExercises.push(exercise);
            });
          });
        });
  
        //console.log(previousExercises);
  
        let randomizedContent = {
          days: []
        };
        // Create a new object that will serve as the contents
        // of the new randomized cycle document.
        // Base parameters: ...randomizedContent
        // randomizedContent will contain the randomly generated exercises of the cycle
        // Steps: iterate through a loop (i < weekLength), under
        // randomizedContent.days: add a new array element
        for (let i = 0; i < weekLength; i++) {
          let day = []
          // Iterate through a loop (j < exercisePerDay), under randomizedContent.days[i] add
          // a new object to the array, that is a randomly selected exercise from previousExercises.
          for (let j = 0; j < exercisePerDay; j++) {
            const randomIndex = Math.floor(Math.random() * previousExercises.length);
            const randomExercise = previousExercises[randomIndex];
            //console.log(randomExercise)
            // const exercise = {
            //   ...randomExercise,
            //   weight: Array(cycleLength).fill(0),
            //   rpe: randomExercise.rpe.length < cycleLength ? 
            //     [...randomExercise.rpe, ...Array(cycleLength - randomExercise.rpe.length).fill(randomExercise.rpe.slice(-1)[0])] : 
            //     randomExercise.rpe,
            //   extraInfo: Array(cycleLength).fill({
            //     series: null,
            //     reps: null,
            //     rpe: null
            //   })
            // };
            randomExercise.weight = Array(cycleLength).fill(0)
            randomExercise.rpe = randomExercise.rpe.length < cycleLength ? 
              [...randomExercise.rpe, ...Array(cycleLength - randomExercise.rpe.length).fill(randomExercise.rpe.slice(-1)[0])] : 
              randomExercise.rpe.slice(0, cycleLength);
            randomExercise.extraInfo = Array(cycleLength).fill({
              series: null,
              reps: null,
              rpe: null
            })
            console.log(randomExercise)
            //randomizedContent.days[i].push(exercise);
            day.push(randomExercise)
          }
          randomizedContent.days.push(day)
        }
        //console.log(randomizedContent);
  
        // Now, you can create the cycle document using the randomizedContent
  
        const cycle = await Cycle.create({
          days: randomizedContent.days,
          name: req.body.name,
          weeks: cycleLength
        });
  
        //Update user cycles information with new cycle ID
        user._client.cycles.push(cycle._id);
        await user.save();
  
        res.json(cycle);
        //res.json({randomizedContent});
      } else {
        // If not randomizing, create the cycle normally
        const cycle = await Cycle.create({ ...req.body });
  
        //Update user cycles information with new cycle ID
        user._client.cycles.push(cycle._id);
        await user.save();

        res.json(cycle);
      }
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
