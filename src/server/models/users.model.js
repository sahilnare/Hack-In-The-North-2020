const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
    minlength: 3
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  pending: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  avatar: {
    type: Number,
    enums: [
        0,
        1,
        2,
        3,
    ]
  }
}, {
  timestamps: true
});



const User = mongoose.model('User', userSchema);

module.exports = User;
