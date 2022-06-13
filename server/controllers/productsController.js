const { create, findProductById } = require('../models/products');
const getDb = require('../utils/mongo-client').getDb;
const { PRODUCTS_COLLECTION } = require('../utils/constants');

const createProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    if (isNotValid(title) || isNotValid(price)) {
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

const isNotValid = (data) => {
  return data == '';
};

const viewAllProducts = async (req, res, next) => {
  try {
    const db = getDb();
    const allProducts = await db.collection(PRODUCTS_COLLECTION);
    allProducts.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await findProductById(req.query.id);
    res.send(product);
  } catch (error) {}
};

module.exports = { createProduct, viewAllProducts, getById };
