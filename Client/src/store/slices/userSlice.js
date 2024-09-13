import { createSlice } from '@reduxjs/toolkit';
const auth = localStorage.getItem('auth');
const data = localStorage.getItem('data');
const sessionId = localStorage.getItem('sessionId');
const initialState = {
    auth: auth ? JSON.parse(auth) : null,
    data: data ? JSON.parse(data) : null,
    sessionId: sessionId ? sessionId : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { auth, data, sessionId } = action.payload;
            state.auth = auth;
            state.data = data;
            localStorage.setItem('auth', JSON.stringify(auth));
            localStorage.setItem('data', JSON.stringify(data));
            if (sessionId) {
                state.sessionId = sessionId;
                localStorage.setItem('sessionId', sessionId);
            }
        },
        setLogout(state) {
            state.auth = null;
            state.data = null;
            state.sessionId = null;
            localStorage.removeItem('auth');
            localStorage.removeItem('data');
            localStorage.removeItem('sessionId');
        },
    },
});

export const { setCredentials, setLogout } = userSlice.actions;

export default userSlice.reducer;
