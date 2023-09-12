const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  availability: Boolean,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
