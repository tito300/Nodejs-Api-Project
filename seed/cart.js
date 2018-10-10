const mongoose = require('mongoose');
const User = require('../users/userModel');

mongoose.connect('mongodb://localhost/nodejsProject');

user = {
  registerDate: '2018-10-05T22:10:48.919Z',
  purchasesCount: 0,
  amoutSpent: 0,
  name: 'kellie',
  email: 'kellie@gmail.com',
  password: '$2b$13$Vwv8Fl1fTjLvKCObd5UocuQg5rIRjkazDxQVF7Uc8ZxtSL/U2uUOq',
  phone: '972-670-1500',
  cart: [
    mongoose.Types.ObjectId('5ba93a6d4793654eda724f2d'),
    mongoose.Types.ObjectId('5ba93a6d2744fa47b3367e6e'),
  ],
};

const newUser = new User(user);
newUser
  .save()
  .then(() => {
    console.log('saved sucessfuly');
  })
  .catch(err => console.log('something went wrong', err));

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true, index: true },
//   disc: { type: String, required: true },
//   category: { type: String, required: true, default: 'general', index: true },
//   available: {
//     type: Boolean,
//     required: true,
//     default: function() { // eslint-disable-line
//       if (this.instock === 0) return false;
//       return true;
//     },
//   },
//   instock: { type: Number, required: true },
//   price: { type: Number, required: true },
//   picture: { type: String, required: true },
//   brand: { type: String, required: false, default: 'T&K' },
//   shipping: { type: Object, required: false },
//   lastUpdated: { type: Date, required: false },
//   tags: [String],
// });

// const Product = mongoose.model('product', productSchema);

// User.find({ name: 'tarek' })
//   .populate('cart')
//   .exec((err, cart) => {
//     if (err) return console.log(err);

//     return console.log('result is ', cart);
//   });

// setTimeout(() => {
//   mongoose.disconnect();
// }, 2000);
