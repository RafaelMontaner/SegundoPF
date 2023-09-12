const Product = require('../models/product');
const Cart = require('../models/cart');

// Controlador para obtener todos los productos
exports.getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    const query = req.query.query || '';
    const skip = (page - 1) * limit;

    const filter = {};
    if (query) {
      filter.category = query;
    }

    const products = await Product.find(filter)
      .sort(sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : '')
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage: prevPage !== null,
      hasNextPage: nextPage !== null,
      prevLink: prevPage !== null ? `/products?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
      nextLink: nextPage !== null ? `/products?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
    });
  } catch (error) {
    next(error);
  }
};

// Controlador para ver detalles de un producto específico
exports.getProductDetails = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.render('productDetails', { product });
  } catch (error) {
    next(error);
  }
};

// Controlador para agregar un producto al carrito
exports.addToCart = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const cartId = req.params.cartId;
    const quantity = req.body.quantity || 1;

    const cart = await Cart.findById(cartId);
    const existingProduct = cart.products.find(item => item.product.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    next(error);
  }
};
