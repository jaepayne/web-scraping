//I am changing this for a github example 3/8/2018

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/amazonPrice');
const schema = new mongoose.Schema({
  productId: { type: String, trim: true },
  productName: { type: String, trim: true },
  amazonPrice: { type: String, trim: true },
  resellerNewPrice: { type: String, trim: true },
  resellerUsedPrice: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Price', schema);