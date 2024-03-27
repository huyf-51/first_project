class CartController {
    getCart(req, res) {
        console.log('get cart');
        res.send('cart data');
    }
}

module.exports = new CartController();
