const { default: mongoose } = require("mongoose");

const chatSchema = new mongoose.Schema({
  hasNewMessageClient: Boolean,
  hasNewMessageCoach: Boolean,
  clientId: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true, 
    required: true
  },
  coachId: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true,
    required: true
  },
  messages: [
    {
      content: String,
      timeStamp: {
        type: Date,
        default: () => Date.now(),
        immutable: true
      },
      sender: mongoose.SchemaTypes.ObjectId
    }
  ]  
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;