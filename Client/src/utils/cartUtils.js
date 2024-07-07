const computeTotalPrice = (total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
};

const totalPrice = (cart) => {
    return cart.reduce(computeTotalPrice, 0);
};

const getQuantityOfProductInCart = (cart, id) => {
    const cartItem = cart.find((item) => item._id === id);
    if (cartItem) {
        return cartItem.quantity;
    } else {
        return 0;
    }
};

export { totalPrice, getQuantityOfProductInCart };
