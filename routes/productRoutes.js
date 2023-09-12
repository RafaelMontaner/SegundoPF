const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener todos los productos
router.get('/', productController.getProducts);

// Ruta para ver detalles de un producto específico
router.get('/:productId', productController.getProductDetails);

module.exports = router;
