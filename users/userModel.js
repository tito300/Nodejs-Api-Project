const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  price: { type: Number, required: true },
  link: { type: String },
});
const usersSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, minlength: 6, maxlength: 50 },
  phone: { type: String, min: 6, max: 20 },
  password: { type: String, required: true, minlength: 3, maxlength: 500 },
  registerDate: { type: Date, default: Date.now() },
  purchasesCount: { type: Number, default: 0 },
  amoutSpent: { type: Number, default: 0 },
  cart: [cartSchema], // make sure object subSchemas are rapped in array.
  totalItems: { type: Number, default: 0 },
  totalPrice: { type: Number },
});

usersSchema.methods.createJwt = async function() {
  const token = await jwt.sign(
    {
      name: this.name,
      id: this._id,
    },
    config.get('secret')
  );
  return token;
};

const User = mongoose.model('user', usersSchema);

module.exports = User;
