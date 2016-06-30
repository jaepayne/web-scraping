const express = require('express');

const app = express();
const productData = require('./models.js')

app.set('view engine', 'ejs');
app.use(express.static('public'));

const values = obj => Object.keys(obj).map(key => obj[key]);

const uniqueByName = arr => {
  return values(arr.reduce((acc, current) => {
    acc[current.productName] = current;
    return acc;
  }, {}));
};

app.get('/', function(req, res, next) {
  productData.find()
    // .distinct('productsroductName')
    // .select('productName')
    .then(function(products) {
      res.render('index', { products: uniqueByName(products) });
    })
    .catch(next);
});

app.get('/:productId', function(req, res, next) {
  productData.find({ productId: req.params.productId })
    .then(function(products) {
      console.log(products)
      const name = products[0].productName;
      res.render('productPage', { name: name, products: products });
    })
    .catch(next);
});

app.listen(3030);