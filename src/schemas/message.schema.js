const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	msg: String,
	userID: String
      });
     
const Message = mongoose.model('Message', messageSchema);      

module.exports = {Message} 