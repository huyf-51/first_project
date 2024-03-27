import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: null,
    data: null,
};

const authSlice = createSlice({
    name: 'auth',
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

export const { setCredentials, setLogout } = authSlice.actions;

export default authSlice.reducer;
