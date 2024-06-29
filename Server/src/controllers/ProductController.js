const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const cloudinary = require('../config/cloudStoreFile');

class ProductController {
    async create(req, res) {
        console.log('handle create product');
        const product = new Product({
            ...req.body,
            image: req.imageUrl,
            imageId: req.imageId,
        });
        const newProduct = await product.save();
        res.status(200).json({ status: 'success' });
    }

    async setImage(req, res, next) {
        const { image } = req.body;
        await cloudinary.uploader.upload(image, (result, error) => {
            if (error) {
                return next(new AppError(error));
            }
            req.imageUrl = result.url;
            req.imageId = result.public_id;
        });
        next();
    }

    async list(req, res) {
        console.log('handle list product');
        const foundProduct = await Product.find({
            productName: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        });
        res.status(200).json(foundProduct);
    }

    async getProductById(req, res, next) {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (product) {
            res.json({ product });
        } else {
            next(new AppError('No product for that id', 404));
        }
    }

    async edit(req, res, next) {
        console.log('handle get product');
        const product = await Product.findById(req.params.id);
        if (!product) {
            next(new AppError('No product for that id', 404));
        }
        res.status(200).json(product);
    }

    async update(req, res, next) {
        console.log('handle update product');
        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            req.body
        );
        if (!updatedProduct) {
            return next(new AppError('No product for that id', 404));
        }
        res.status(200).json({ status: 'success' });
    }

    async delete(req, res, next) {
        console.log('handle delete product');
        const product = await Product.findById(req.params.id);
        const imageId = product?.imageId;
        const deletedProduct = await Product.deleteOne({
            _id: req.params.id,
        });
        if (!deletedProduct) {
            return next(new AppError('No product for that id', 404));
        }
        await cloudinary.uploader.destroy(imageId);
        res.status(200).json({ status: 'success' });
    }
    async sortByPrice(req, res) {
        console.log('handle sort product by price');
        const allProduct = await Product.find();
        res.status(200).json(allProduct.sort((a, b) => a.price - b.price));
    }

    async importProduct(req, res) {
        console.log('handle import product');
        const insertProduct = await Product.insertMany(req.body);
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    }
}

module.exports = new ProductController();
