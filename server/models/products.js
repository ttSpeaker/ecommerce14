const getDb = require('../utils/mongo-client').getDb;
const { PRODUCTS_COLLECTION } = require('../utils/constants');
const ObjectId = require('mongodb').ObjectId;

const create = async (newProduct) => {
  try {
    const db = getDb();
    await db.collection(PRODUCTS_COLLECTION).insertOne(newProduct);
    return newProduct;
  } catch (error) {
    throw new Error(error);
  }
};

const findProductById = async (id) => {
  try {
    const o_id = new ObjectId(id);
    const db = getDb();
    const result = await db
      .collection(PRODUCTS_COLLECTION)
      .findOne({ _id: o_id });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { create, findProductById };
