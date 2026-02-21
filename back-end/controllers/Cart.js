const Cart = require('../model/Cart')
 
const Cart = require('../model/Cart');

async function addtoCart(req, res) {
  try {
      const {id} = req.user;
      const cart = new Cart(...)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = addtoCart;