const Product = require('../models/Product');
const appError = require('../utils/appError');

class ProductController {
    async create(req, res) {
        const product = new Product(req.body);
        const newProduct = await product.save();
        console.log('save product: ', newProduct);
        res.json({ message: 'Create Product Successfully' });
    }

    async list(req, res, next) {
        console.log('list product');
        const allProduct = await Product.find();
        res.json(allProduct);
    }

    async edit(req, res) {
        const product = await Product.findById(req.params.id);
        if (!product) {
            next(new appError('No product for that id', 404));
        }
        res.json(product);
    }

    async update(req, res) {
        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            req.body
        );
        if (!updatedProduct) {
            return next(new appError('No product for that id', 404));
        }
        res.json({ message: 'update success' });
    }

    async delete(req, res) {
        const deletedProduct = await Product.deleteOne({
            _id: req.params.id,
        });
        console.log('product deleted');
        if (!deletedProduct) {
            return next(new appError('No product for that id', 404));
        }
        res.send('delete success');
    }
    // not completed
    listDeletedProduct(req, res, next) {
        Product.findDeleted({})
            .then((allDeletedProduct) => {
                res.json(allDeletedProduct);
            })
            .catch(next);
    }
    // not completed
    restoreProduct(req, res, next) {
        Product.restore({ _id: req.body.id })
            .then(() => {
                res.json({ message: 'restore success' });
            })
            .catch(next);
    }
    // not completed
    deletePermanentlyProduct(req, res, next) {
        Product.deleteOne({ _id: req.body.id })
            .then(() => {
                res.json({ message: 'delete success' });
            })
            .catch(next);
    }

    async sortByPrice(req, res) {
        const allProduct = await Product.find();
        res.json(allProduct.sort((a, b) => a.price - b.price));
    }

    async importProduct(req, res) {
        const insertProduct = await Product.insertMany(req.body);
        const allProducts = await Product.find();
        res.json(allProducts);
    }
    async searchProduct(req, res) {
        console.log('keyword: ', req.query.keyword);
        const foundProduct = await Product.find({
            productName: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        });
        res.json(foundProduct);
    }
}

module.exports = new ProductController();
