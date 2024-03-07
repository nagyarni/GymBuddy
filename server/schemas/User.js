const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../secret')

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
    lowercase: true
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
  
  const client = this._client ? true : false
  const coach = this._coach ? true : false
  const admin = this._admin ? true : false

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
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Adjust the expiration time as needed

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

const User = mongoose.model('User', userSchema);

module.exports = User;