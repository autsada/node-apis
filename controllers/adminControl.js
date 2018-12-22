const { Product } = require('../models/product');

const getAddProductPage = (req, res, next) => {
  res.render('admin/add-edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

const addProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);
  await product.save();
  res.redirect('/products');
};

const getEditProductPage = async (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);

    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/add-edit-product', {
      product,
      docTitle: `Edit Product: ${product.title}`,
      path: '/admin/edit-product',
      editing: editMode
    });
  } catch (err) {
    console.log(err);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const id = req.body.productId;
    const editedProduct = {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description
    };
    await Product.edit(id, editedProduct);
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

const getDeleteProductPage = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);

    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/delete-product', {
      product,
      docTitle: `Delete Product: ${product.title}`,
      path: '/admin/delete-product'
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.body.productId;
    await Product.delete(id);
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

const getProductsAdmin = async (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products-list-admin', {
  //     products,
  //     docTitle: 'Products List for Admin',
  //     path: '/admind/products'
  //   });
  // });

  const products = await Product.fetchAll();
  res.render('admin/products-list-admin', {
    products,
    docTitle: 'Products List for Admin',
    path: '/admin/products'
  }); // in app.js we set 'views' to 'views' folder already, so just to specify filename to us without extension
};

module.exports = {
  getAddProductPage,
  addProduct,
  getEditProductPage,
  editProduct,
  getDeleteProductPage,
  deleteProduct,
  getProductsAdmin
};
