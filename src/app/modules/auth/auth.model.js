const mongoose = require('mongoose');
const crypto = require('crypto');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },


  email: {
    type: String,
    required: [true, 'Please provide a unique email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    unique: false,
  },
  role: {
    type: String,
    enum: {
      values: ['seller', 'buyer', 'admin', 'unauthorized'],
    },
    default: 'unauthorized',
  },
  seller: { type: Boolean, default: false },
  mobile: { type: Number },
  address: { type: String },
  zipCode: { type: Number },
  country: { type: String },
  delete: { type: Boolean, default: false },
  publicProfile: { type: Boolean, default: false },
  city: { type: String },
  gender: {
    type: String,
    // enum: {
    //   values: ['Male', 'Female'],
    // },
  },
  profile: { type: String },
  delete_url: { type: String },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  confirmationToken: String,
  confirmationTokenExpires: Date,
});


UserSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');


  this.confirmationToken = token;


  const date = new Date();


  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;


  return token;
};


const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;