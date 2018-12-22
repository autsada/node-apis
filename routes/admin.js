//const path = require('path');

// Route for admin of the shop
const express = require('express');

//const rootDir = require('../utils/path');
const {getAddProductPage, addProduct, getEditProductPage, editProduct, getDeleteProductPage, deleteProduct, getProductsAdmin} = require('../controllers/adminControl')

const adminRoutes = express.Router();

// '/admin/add-product' -> GET
adminRoutes.get('/add-product', getAddProductPage);

// '/admin/add-product' -> POST
adminRoutes.post('/add-product', addProduct);
adminRoutes.get('/edit-product/:productId', getEditProductPage)
adminRoutes.post('/edit-product/:productId', editProduct)
adminRoutes.get('/delete-product/:productId', getDeleteProductPage)
adminRoutes.post('/delete-product/:productId', deleteProduct)
adminRoutes.get('/products', getProductsAdmin);

module.exports = { adminRoutes };
