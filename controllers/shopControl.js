const { Product } = require('../models/product');
const { Cart } = require('../models/cart');

const getIndexPage = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/index', {
      products,
      docTitle: 'Home Page',
      path: '/'
    }); // in app.js we set 'views' to 'views' folder already, so just to specify filename to us without extension
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/products-list', {
  //     products,
  //     docTitle: 'Shop',
  //     path: '/products'
  //   });
  // });

  try {
    const products = await Product.fetchAll();
    res.render('shop/products-list', {
      products,
      docTitle: 'Shop',
      path: '/products'
    }); // in app.js we set 'views' to 'views' folder already, so just to specify filename to us without extension
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    res.render('shop/product-details', {
      product,
      docTitle: `Product Details: ${product.title}`,
      path: ''
    });
  } catch (err) {
    console.log(err);
  }
};

// get method to get cart page
const getCartPage = async (req, res, next) => {
  
  try {
    const cart = await Cart.getCart()
    if (!cart.products) {
      cart.products = []
    } else {
      for (i = 0; i < cart.products.length; i++) {
        const item = await Product.findById(cart.products[i].id)
        cart.products[i] = {...item, qty: cart.products[i].qty, amount: (+item.price * +cart.products[i].qty)}
      }
    }
    
    res.render('shop/cart', {
      cart,
      docTitle: 'Your Cart',
      path: '/cart'
    });
  } catch (err) {
    console.log(err)
  }
};

// post method to add product to cart
const addProductToCart = async (req, res, next) => {
  try {
    const id = req.body.productId;
    const product = await Product.findById(id)
    await Cart.addProduct(id, product.price);
    res.redirect('/cart');
  } catch (err) {
    console.log(err)
  }
};

const deleteProductFromCart = async(req, res, next) => {
  try {
    const id = req.body.productId;
    const product = await Product.findById(id)
    await Cart.deleteProduct(id, product.price)
    res.redirect('/cart')
  } catch (err) {
    console.log(err)
  }
}

const getOrdersPage = (req, res, next) => {
  res.render('shop/orders', {
    docTitle: 'Your Orders',
    path: '/orders'
  });
};

const getCheckoutPage = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout Page',
    path: '/checkout'
  });
};

module.exports = {
  getIndexPage,
  getProducts,
  getProduct,
  getCartPage,
  addProductToCart,
  deleteProductFromCart,
  getOrdersPage,
  getCheckoutPage
};
