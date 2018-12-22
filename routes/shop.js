//const path = require('path');
// Route for shop page
const express = require('express');

const {
  getIndexPage,
  getProducts,
  getProduct,
  getCartPage,
  addProductToCart,
  deleteProductFromCart,
  getOrdersPage,
  getCheckoutPage
} = require('../controllers/shopControl');

const shopRoutes = express.Router();

shopRoutes.get('/', getIndexPage);
shopRoutes.get('/products', getProducts);
shopRoutes.get('/products/:productId', getProduct);
shopRoutes.get('/cart', getCartPage); // user to display the cart
shopRoutes.post('/cart', addProductToCart); // post ordered product to cart
shopRoutes.post('/delete-cart-item', deleteProductFromCart);
shopRoutes.get('/orders', getOrdersPage);
shopRoutes.get('/checkout', getCheckoutPage);

module.exports = { shopRoutes };
