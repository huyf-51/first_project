import { createSlice } from '@reduxjs/toolkit';

const cartItemsStorage = localStorage.getItem('cart');
const initialState = cartItemsStorage ? JSON.parse(cartItemsStorage) : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const cartItem = action.payload;
            const existItem = state.find((item) => item._id === cartItem._id);
            if (existItem) {
                for (const item of state) {
                    if (item._id === existItem._id) {
                        item.quantity += cartItem.quantity;
                    }
                }
            } else {
                state.push(cartItem);
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeCart(state, action) {
            localStorage.removeItem('cart');
            return [];
        },
    },
});

export const { addToCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
