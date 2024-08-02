import { createSlice } from '@reduxjs/toolkit';
const auth = JSON.parse(localStorage.getItem('auth'));
const data = JSON.parse(localStorage.getItem('data'));
const initialState = {
    auth: auth ? auth : null,
    data: data ? data : null,
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
            localStorage.setItem('data', JSON.stringify(data));
        },
        setLogout(state) {
            state.auth = null;
            state.data = null;
            localStorage.removeItem('auth');
            localStorage.removeItem('data');
        },
    },
});

export const { setCredentials, setLogout } = userSlice.actions;

export default userSlice.reducer;
