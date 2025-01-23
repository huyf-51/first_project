const ProductService = require('../services/ProductService');

class CachingProductService {
    #productService;
    constructor(productService) {
        this.#productService = productService;
    }
    async getAllProduct() {
        const allProductCache = await this.#productService.getAllProductCache();
        if (allProductCache) {
            return JSON.parse(allProductCache);
        } else {
            const allProduct = await this.#productService.getAllProduct();
            await this.#productService.cachingProduct(allProduct);
            return allProduct;
        }
    }
}

module.exports = new CachingProductService(new ProductService());
