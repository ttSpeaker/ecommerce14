const { create, findProductById, search } = require('../models/products');

const createProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const price = +req.body.price;
    if (!isValidTitle(title) || !isValidPrice(price)) {
      res.statusCode = 400;
      res.send('Cannot be empty');
      return;
    }
    const newProduct = await create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isValidTitle = (title) => {
  return title && title !== '';
};
const isValidPrice = (price) => {
  return price && price > 0;
};
const searchProducts = async (req, res, next) => {
  try {
    const query = {};
    const title = req.query.title;
    if (title && title !== '') {
      query.title = title;
    }
    const maxPrice = +req.query.maxPrice;

    if (maxPrice && maxPrice > 0) {
      query.price = { $lte: maxPrice };
    }
    console.log(query);
    const allProducts = await search(query);
    res.send(allProducts);
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await findProductById(req.params.id);
    res.send(product);
  } catch (error) {}
};

module.exports = { createProduct, searchProducts, getById };
