const Product = require('../models/Product');
const client = require('../config/redis').getRedisInstance().getClient();

class ProductService {
    async getAllProduct() {
        console.log('get all product in db');
        const allProduct = await Product.find();
        return allProduct;
    }
    async getAllProductCache() {
        console.log('get all product in redis');
        const allProduct = await client.get('products');
        return allProduct;
    }
    async cachingProduct(allProduct) {
        console.log('caching products');
        await client.set('products', JSON.stringify(allProduct));
        await client.expire('products', 30);
    }
}

module.exports = ProductService;
