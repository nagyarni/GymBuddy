// CycleController.js
const { default: mongoose } = require('mongoose');
const Cycle = require('../schemas/Cycle'); // Assuming you have a Cycle model
const User = require('../schemas/User')
const Chat = require('../schemas/Chat')


const ChatController = {
  getChatByUserIds: async (req, res) => {
    try {
      const clientId = req.params.clientId
      const coachId = req.params.coachId

      if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(404).json({ message: 'Invalid clientId format' });
      }
      if (!mongoose.Types.ObjectId.isValid(coachId)) {
        return res.status(404).json({ message: 'Invalid coachId format' });
      }

      let chat = await Chat.findOne({ clientId: clientId, coachId: coachId })

      // If chat doesn't exist, need to create a chat between two specified users
      if (!chat) {
        console.log("Chat doesn't exist between the two users, creating it now")
        chat = await Chat.create({ 
          clientId: clientId,
          coachId: coachId,
          hasNewMessageClient: false,
          hasNewMessageCoach: false,
          messages: []
        })
      }

      res.json( chat );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  postMessageByChatId: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.chatId)) {
        return res.status(404).json({ message: 'Invalid chatId format' });
      }
  
      const chat = await Chat.findById(req.params.chatId)
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found!' });
      }
  
      const newMessage = {
        content: req.body.content,
        sender: req.body.sender
      }
  
      chat.messages.push(newMessage);
  
      // Check if messages array exceeds 500 elements
      const MAX_MESSAGES = 500;
      console.log("Current chat length: " + chat.messages.length)
      if (chat.messages.length > MAX_MESSAGES) {
        // Remove overflowing messages from the beginning of the array
        const numToRemove = chat.messages.length - MAX_MESSAGES;
        console.log("Chat is overflowing, deleting " + numToRemove + "messages.")
        chat.messages.splice(0, numToRemove);
      }
  
      await chat.save();
  
      res.json(chat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  

};

module.exports = ChatController;
