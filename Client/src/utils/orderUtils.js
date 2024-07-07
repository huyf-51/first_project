const computeTotalPrice = (total, cartItem) => {
    return total + cartItem.product.price * cartItem.quantity;
};

const totalPrice = (cart) => {
    return cart.reduce(computeTotalPrice, 0);
};

export default totalPrice;
