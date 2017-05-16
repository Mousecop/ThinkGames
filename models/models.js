const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    email: {type: String, require: true, unique: true, lowercase: true}
});

//Before we save we encrypt the password
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}


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
