const express = require('express');

const authAdmin = require('../middlewares/authorization').authAdmin;
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/create', authAdmin, productsController.createProduct);
router.get('/search', productsController.searchProducts);
router.get('/id/:id', productsController.getById);

module.exports = router;
