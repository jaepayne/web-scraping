'use strict';

const request = require('request');
const cheerio = require('cheerio');
const Price = require('./models');
const productIds = require('./productIds.json');

/**
 * HOW TO ADD DATA TO THE PRICE TABLE:
 * Price.create({
 *   productId: '0984782850',
 *   productName: 'Towels',
 *   amazonPrice: '$39.99',
 *   resellerNewPrice: '$35.24',
 *   resellerUsedPrice: '$0.66'
 * }, function(err, price) { ... });
 *
 * `Price.create` is a function that takes an object. This object contains the data you want stored in MongoDB. The keys of the object you use must conform to the example above.
 *
 * When Node is finished inserting the document, it will call the function passed into parameter two of create.
 */