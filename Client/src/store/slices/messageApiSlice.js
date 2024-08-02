import { privateApiSlice } from './privateApiSlice';

const messagePrivateApi = privateApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setMessage: builder.mutation({
            query: (data) => ({
                url: 'message/set-message',
                method: 'POST',
                body: data,
            }),
        }),
        getMessage: builder.query({
            query: (data) => `message/get-message/${data.from}/${data.to}`,
        }),
    }),
});

export const { useGetMessageQuery, useSetMessageMutation } = messagePrivateApi;
