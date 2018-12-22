const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const rootDir = require('../utils/path');
const {Cart} = require('./cart')

const p = path.join(rootDir, 'data', 'products.json');

// const getProductsFromFile = callback => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       return callback([]);
//     }
//     callback(JSON.parse(fileContent));
//   });
// };

const getProductsFromFile = async () => {
  try {
    const fileContent = await readFile(p);
    if (!fileContent) {
      return [];
    }
    return JSON.parse(fileContent);
  } catch (err) {
    return [];
  }
};

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  // call on a single instance of product
  // save() {
  //   getProductsFromFile(products => {
  //     products.push(this);
  //     fs.writeFile(p, JSON.stringify(products), error => {
  //       console.log(error);
  //     });
  //   });
  // }

  async save() {
    this.id = Math.random().toString();
    try {
      let products = await getProductsFromFile();
      products.push(this);
      await writeFile(p, JSON.stringify(products));
    } catch (err) {
      console.log(err);
    }
  }

  // static fetchAll(callback) {
  //   getProductsFromFile(callback);
  // }

  static fetchAll() {
    return getProductsFromFile();
  }

  static async findById(id) {
    const products = await getProductsFromFile();
    const product = products.find(product => product.id === id);

    return product;
  }

  static async edit(id, editedProduct) {
    try {
      const products = await getProductsFromFile();
      const index = products.findIndex(product => product.id === id);

      products[index] = { id, ...editedProduct };
      await writeFile(p, JSON.stringify(products));
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(id) {
    try {
      const products = await getProductsFromFile();
      const deletedproduct = products.find(product => product.id === id)
      const updatedProducts = products.filter(product => product.id !== id);
      await writeFile(p, JSON.stringify(updatedProducts));
      await Cart.deleteProduct(id, deletedproduct.price)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { Product };
