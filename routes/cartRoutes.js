const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ruta para ver el contenido del carrito
router.get('/:cid', cartController.getCart);

// Ruta para eliminar todos los productos del carrito
router.delete('/:cid', cartController.clearCart);

module.exports = router;
