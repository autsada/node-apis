const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'cart.json');

const getCartFromFile = async () => {
  try {
    const fileContent = await readFile(p);
    if (!fileContent) {
      return {};
    }
    return JSON.parse(fileContent);
  } catch (err) {
    return {};
  }
};

class Cart {
  static async addProduct(id, price) {
    try {
      const cart = await getCartFromFile();

      if (!cart.products) {
        // No item in cart -> {} 
        cart.products = [{ id, qty: 1 }] // -> first item of the cart
        cart.totalPrice = +price
      } else {
        //  cart already has items in -> { products: [[{id: '12345', qty: 1}, {id: '67890', qty: 1}], totalPrice: 25.00 }
        // Analyze the cart -> check if a new ordered product exists -> increase qty, or if not exists -> create a new ordered product object
        const index = cart.products.findIndex(product => product.id === id);

        
        if (index === -1) {
          // A new ordered product is not in the cart yet
          cart.products = [...cart.products, { id, qty: 1 }];
        } else {
          // A new ordered product is already in the cart
          cart.products[index].qty += 1;
        }

        // Calculate total amount
        cart.totalPrice += +price;
      }

      await writeFile(p, JSON.stringify(cart));
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteProduct(id, price) {
    try {
      const cart = await getCartFromFile();
      const deletedItem = cart.products.find(product => product.id === id)
      if (deletedItem) {
        const qty = +deletedItem.qty
        const deletedAmount = +price * qty
        cart.products = cart.products.filter(product => product.id !== id)
        cart.totalPrice -= deletedAmount
      }
      await writeFile(p, JSON.stringify(cart));
    } catch (err) {
      console.log(err)
    }
  }

  static getCart() {
    return getCartFromFile()
  }
}

module.exports = { Cart };
