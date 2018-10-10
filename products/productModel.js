const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  disc: { type: String, required: true },
  category: {
    type: String,
    required: true,
    default: 'general',
    index: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: function() { // eslint-disable-line
      if (this.instock === 0) return false;
      return true;
    },
  },
  instock: { type: Number, required: true },
  price: { type: Number, required: true },
  picture: { type: String, required: true },
  brand: { type: String, required: false, default: 'T&K' },
  shipping: { type: Object, required: false },
  lastUpdated: { type: Date, required: false },
  tags: [String],
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
