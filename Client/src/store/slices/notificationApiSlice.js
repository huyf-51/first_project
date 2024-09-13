import { privateApiSlice } from './privateApiSlice';

const notificationPrivateApi = privateApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: (userId) => `notification/get/${userId}`,
        }),
        viewNotification: builder.mutation({
            query: (data) => ({
                url: 'notification/set-viewed',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetNotificationQuery, useViewNotificationMutation } =
    notificationPrivateApi;
