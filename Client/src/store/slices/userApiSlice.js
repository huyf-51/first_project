import { apiSlice } from './apiSlice';
import { privateApiSlice } from './privateApiSlice';

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
        sendMail: builder.mutation({
            query: (email) => ({
                url: 'user/forgot-password/send-mail',
                method: 'POST',
                body: email,
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ newPassword, id, token }) => ({
                url: `user/forgot-password/reset/${id}/${token}`,
                method: 'PUT',
                body: { newPassword },
            }),
        }),
        getGoogleAuthUrl: builder.query({
            query: () => ({
                url: `user/auth/google`,
            }),
        }),
        refreshToken: builder.query({
            query: () => ({
                url: 'refresh',
            }),
        }),
    }),
});

const userPrivateApi = privateApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminId: builder.query({
            query: () => ({
                url: `user/get-admin-id`,
            }),
        }),
        getAllUserActivateMessage: builder.query({
            query: (data) => ({
                url: `user/get-all-user-activate-message/${data}`,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useSendMailMutation,
    useResetPasswordMutation,
    useGetGoogleAuthUrlQuery,
    useLazyRefreshTokenQuery,
} = userApi;

export const { useGetAdminIdQuery, useGetAllUserActivateMessageQuery } =
    userPrivateApi;
