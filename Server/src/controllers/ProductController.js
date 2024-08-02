const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const cloudinary = require('../config/cloudStoreFile');

class ProductController {
    async create(req, res) {
        const { quantity: inStock, ...other } = req.body;
        const product = new Product({
            ...other,
            imageUrl: req.imageUrl,
            imageId: req.imageId,
            inStock,
        });
        const newProduct = await product.save();
        res.status(200).json({ status: 'success' });
    }

    async setImage(req, res, next) {
        const { imageUrl } = req.body;
        await cloudinary.uploader.upload(imageUrl, (result, error) => {
            if (error) {
                return next(new AppError(error));
            }
            req.imageUrl = result.url;
            req.imageId = result.public_id;
        });
        next();
    }

    async list(req, res) {
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

    async update(req, res, next) {
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
}

module.exports = new ProductController();
