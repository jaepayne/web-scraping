'use strict';

const request = require('request');
const cheerio = require('cheerio');
const Price = require('./models');
let numberOfResponses = 0;
const productIds = require('./productIds.json');

const processError = function(err) {
  console.error(err);
  process.exit(1);
}

const getPrice = function(selection) {
  return processPrice(processSelection(selection));
}

const processSelection = function(selection) {
  return selection.text().trim();
};

const processPrice = function(text) {
  const start = text.indexOf('$');
  let end = text.indexOf('.');
  if (end === -1) {
    while (end === -1) {
      if (text[start + i] === ' ') {
        end = start + i - 1;
      }
      i++;
    }
  }
  else {
    end = end + 3;
  }
  return text.slice(start, end).trim();
}

productIds.forEach(function (productId) {
  request('https://www.amazon.com/dp/' + productId, function (error, response, body) {
    try {
      const $ = cheerio.load(body);
      // console.log(body);
      const product = {
        amazonPrice: getPrice($('.dp-price-col .a-color-price')),
        resellerNewPrice: getPrice($('.dp-new-col span')),
        resellerUsedPrice: getPrice($('.dp-used-col span')),
        productName: processSelection($('#productTitle')),
        productId: productId
      }
      console.log(product);
      Price.create(product, function(err) {
        if(err) {
          return processError(err);
        }
        numberOfResponses++;
        if(numberOfResponses === productIds.length)  {
          console.log('finished!')
          process.exit(0);
        }
      })
      
    } catch(e) {
      processError(e)
    }
   
  })
})