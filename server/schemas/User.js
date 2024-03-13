const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../secret')
const Cycle = require('./Cycle')

const clientSchema = new mongoose.Schema({
  emailnotif: Boolean,
  cycles: [mongoose.SchemaTypes.ObjectId]
})

const coachSchema = new mongoose.Schema({
  emailnotif: Boolean,
  clients: [mongoose.SchemaTypes.ObjectId]
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  _client: clientSchema,
  _coach: coachSchema,
  _admin: Boolean
})

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    return null; // User not found
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return user; // Authentication successful
  }

  return null; // Incorrect password
};

// Adding a method to the User model to generate a JWT token
userSchema.methods.generateAuthToken = function () {
  // You can customize the payload of the token based on your needs
  
  const client = this._client
  const coach = this._coach
  const admin = this._admin

  //console.log(client, coach, admin)
  const payload = {
    userId: this._id,
    email: this.email,
    name: this.name,
    client: client,
    coach: coach,
    admin: admin
    // Add other user-related data if needed...
  };

  // Sign the token with your secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: '12h' }); // Adjust the expiration time as needed

  return token;
};

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }

  next();
});

// Delete all associated cycle documents in case of user deletion
// userSchema.pre('deleteOne', async function (next) {
//   try {
//     // Extract the _id condition from the query
//     const userIdCondition = this.getQuery()._id;
//     console.log(userIdCondition)

//     // Check if _id condition is valid
//     if (!userIdCondition || userIdCondition === undefined) {
//       throw new Error("Invalid _id condition in the deleteOne query");
//     }

//     // Find the user by _id
//     const user = await User.findById(userIdCondition);

//     if (!user) {
//       throw new Error("User not found!");
//     }

//     if (user._client) {
//       console.log("User is a client, removing all associated cycles");
//       const cycleIdsToDelete = user._client.cycles.map(cycle => cycle._id);
//       await Cycle.deleteMany({ _id: { $in: cycleIdsToDelete } });
//     }

//     next();
//   } catch (error) {
//     console.error('Error deleting cycles:', error.message);
//     next(error);
//   }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;