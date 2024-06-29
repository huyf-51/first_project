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
router.get('/list', catchAsync(productController.list));
router.get('/get-product/:id', catchAsync(productController.getProductById));
router.get(
    '/edit/:id',
    verifyToken,
    verifyRole('admin'),
    catchAsync(productController.edit)
);
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
router.get(
    '/sortByPrice',
    verifyToken,
    verifyRole('admin'),
    catchAsync(productController.sortByPrice)
);
router.post(
    '/import',
    verifyToken,
    verifyRole('admin'),
    catchAsync(productController.importProduct)
);

module.exports = router;
