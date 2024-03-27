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
    catchAsync(productController.create)
);
router.get('/list', catchAsync(productController.list));
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
// not completed
router.get(
    '/deleted_product',
    verifyToken,
    catchAsync(productController.listDeletedProduct)
);
// not completed
router.patch(
    '/restore',
    verifyToken,
    catchAsync(productController.restoreProduct)
);
// not completed
router.delete(
    '/permanently_deleted',
    verifyToken,
    catchAsync(productController.deletePermanentlyProduct)
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

router.get('/search', catchAsync(productController.searchProduct));

module.exports = router;
