const express = require('express');

const productsController = require('../controllers/productsController');
const router = express.Router();

router.post('/create', productsController.createProduct);
router.get('/search', productsController.searchProducts);
router.get('/id/:id', productsController.getById);

module.exports = router;
