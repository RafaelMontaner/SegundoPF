const Cart = require('../models/cart');

// Controlador para ver el contenido del carrito
exports.getCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products.product');
    res.render('cart', { cart });
  } catch (error) {
    next(error);
  }
};

// Ruta para eliminar todos los productos del carrito
exports.clearCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findByIdAndUpdate(cartId, { products: [] });
    res.json({ message: 'Carrito vaciado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Función para calcular el total del carrito
const calculateCartTotal = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate('products.product');
    let total = 0;
    for (const item of cart.products) {
      total += item.product.price * item.quantity;
    }
    return total;
  } catch (error) {
    throw error;
  }
};

