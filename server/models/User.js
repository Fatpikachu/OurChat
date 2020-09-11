const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  chatID: {
    type: String,
    required: true
  },
  screenName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  contacts: { 
    type : Array , 
    default : [] 
  }
})

module.exports = mongoose.model('User', userSchema)