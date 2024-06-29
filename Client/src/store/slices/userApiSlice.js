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
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useSendMailMutation,
    useResetPasswordMutation,
    useGetGoogleAuthUrlQuery,
} = userApi;
