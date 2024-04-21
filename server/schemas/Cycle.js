const { default: mongoose } = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  series: [Number],
  reps: [Number],
  rpe: [Number],
  weight: [Number],
  extraInfo: [
    {
      series: Number,
      reps: Number,
      rpe: Number
    }
  ]
})

const cycleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  weeks: {
    type: Number,
    required: true,
    default: 1,
  },
  days: {
    type: [
            [exerciseSchema]
          ],
    required: true,
    default:[]
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
})

cycleSchema.statics.deleteManyByIdList = async function(cycleIDsToDelete) {
  try {
    // const user = await User.findOne({ _id: userID });
    console.log("Entering cycleSchema.statics.deleteMany");

    // if (!user) {
    //   throw new Error("User not found!")
    // }
    // else if (user._client === undefined) {
    //   throw new Error("User is not a client!");
    // }
    // else {
    //   // Iterate through user._client.cycles(array) and delete every cycle document with the id that matches the ._id attribute of these objects
    //   // Extract cycle IDs from the user's cycles array
    //   console.log("We are inside the middleware deleteMany function2")
    //   const cycleIdsToDelete = user._client.cycles.map(cycle => cycle._id);
    //   console.log("We are inside the middleware deleteMany function2")

    // Delete cycles where the _id is in the user's cycles array
    const result = await this.deleteMany({ _id: { $in: cycleIDsToDelete } });

    console.log(`${result.deletedCount} cycles deleted`);

  } catch (error) {
    console.error('Error deleting cycles in cycleSchema.statics.deleteMany:', error.message);
    throw error;
  }
}

const Cycle = mongoose.model('Cycle', cycleSchema);

module.exports = Cycle;