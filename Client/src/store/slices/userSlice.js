import { createSlice } from '@reduxjs/toolkit';
const auth = JSON.parse(localStorage.getItem('auth'));
const initialState = {
    auth: auth ? auth : null,
    data: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { auth, data } = action.payload;
            state.auth = auth;
            state.data = data;
            localStorage.setItem('auth', JSON.stringify(auth));
        },
        setLogout(state) {
            state.auth = null;
            state.data = null;
            localStorage.removeItem('auth');
        },
    },
});

export const { setCredentials, setLogout } = userSlice.actions;

export default userSlice.reducer;
