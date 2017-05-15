const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true}
});

const messageSchema = mongoose.Schema({
    fromUser: String,
    messageContent: String,
    createdAt: Date
});

const chatHistorySchema = mongoose.Schema({
    chatHistory: [messageSchema]
},
{
    timestamps: true
});

const User = mongoose.model('User',userSchema);
const Messages = mongoose.model('Messages',messageSchema);
const ChatHistory = mongoose.model('ChatHistory',chatHistorySchema);

module.exports = {User, Messages, ChatHistory};
