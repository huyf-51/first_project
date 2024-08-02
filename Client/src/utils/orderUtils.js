const computeTotalPrice = (total, cartItem) => {
    return total + cartItem.product.price * cartItem.quantity;
};

const totalPrice = (cart) => {
    return cart.reduce(computeTotalPrice, 0);
};

export const getDateMonthYear = (date) => {
    return date.slice(0, 10);
};

export default totalPrice;
