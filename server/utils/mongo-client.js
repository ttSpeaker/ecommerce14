const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let db;

const connectMongoDB = async () => {
  try {
    const connection = await MongoClient.connect(process.env.DATABASE_URL);
    db = connection.db("ecommerce14");
  } catch (error) {
    throw new Error("Could not connect to MongoDB");
  }
};

const getDb = () => {
  if (db) {
    return db;
  }
  throw new Error("Database not available");
};

module.exports = { connectMongoDB, getDb };
