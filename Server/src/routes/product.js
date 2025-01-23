const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const verifyToken = require('../middleware/verifyToken');
const catchAsync = require('../utils/catchAsync');
const verifyRole = require('../middleware/verifyRole');

router.post(
    '/create',
    verifyToken,
    verifyRole('admin'),
    catchAsync(productController.setImage),
    catchAsync(productController.create)
);
router.get('/search', catchAsync(productController.search));
router.get('/list', catchAsync(productController.list));

router.get('/get-product/:id', catchAsync(productController.getProductById));
router.patch(
    '/update/:id',
    verifyToken,
    verifyRole('admin'),
    catchAsync(productController.update)
);
router.delete(
    '/delete/:id',
    verifyToken,
    verifyRole('admin'),
    catchAsync(productController.delete)
);

module.exports = router;
