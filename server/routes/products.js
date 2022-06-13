const express = require('express');

const productsController = require('../controllers/productsController');
const router = express.Router();

router.post('/product', productsController.createProduct);
router.get('/products', productsController.viewAllProducts);
router.get('/id', productsController.getById);

module.exports = router;
