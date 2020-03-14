const mongoose = require('mongoose')
const {Schema, model} = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  __v: {
    type: Number,
    select: false
  }
})

module.exports = model('User', UserSchema)