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
        setCart(state, action) {
            const cart = action.payload;
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        },
        addProduct(state, action) {
            const itemId = action.payload;
            for (const item of state) {
                if (itemId === item._id) {
                    item.quantity++;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeProduct(state, action) {
            const itemId = action.payload;
            for (const item of state) {
                if (itemId === item._id) {
                    item.quantity--;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart, removeCart, setCart, addProduct, removeProduct } =
    cartSlice.actions;

export default cartSlice.reducer;
