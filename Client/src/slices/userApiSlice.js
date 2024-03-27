import { apiSlice } from './apiSlice';

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: 'user/register',
                method: 'POST',
                body: userData,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'user/logout',
                method: 'POST',
            }),
        }),
        sendCodeByMail: builder.mutation({
            query: (email) => ({
                url: 'user/forgotPassword/sendCode',
                method: 'POST',
                body: email,
            }),
        }),
        updatePassword: builder.mutation({
            query: (credentials) => ({
                url: 'user/forgotPassword/update',
                method: 'PUT',
                body: credentials,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useSendCodeByMailMutation,
    useUpdatePasswordMutation,
} = userApi;
