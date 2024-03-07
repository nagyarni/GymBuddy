const { default: mongoose } = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  series: Number,
  reps: Number,
  rpe: [Number],
  weight: [Number]
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
    immutable: true
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
  }
})

const Cycle = mongoose.model('Cycle', cycleSchema);

module.exports = Cycle;