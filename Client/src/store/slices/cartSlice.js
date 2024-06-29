import { createSlice } from '@reduxjs/toolkit';

const cartItemsStorage = localStorage.getItem('cartItems');
const initialState = cartItemsStorage ? JSON.parse(cartItemsStorage) : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const cartItem = action.payload;
            state.push(cartItem);
            localStorage.setItem('cartItems', JSON.stringify(state));
        },
        removeCart(state, action) {
            localStorage.removeItem('cartItems');
            return [];
        },
    },
});

export const { addToCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
