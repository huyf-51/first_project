const computeTotalPrice = (total, cartItem) => {
    return total + cartItem.price;
};

const totalPrice = (cart) => {
    return cart.reduce(computeTotalPrice, 0);
};

export default totalPrice;
