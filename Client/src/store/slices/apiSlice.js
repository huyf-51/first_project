import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
        credentials: 'include',
        prepareHeaders: (headers) => {
            const sessionId = localStorage.getItem('sessionId');
            if (sessionId) {
                headers.set('sessionId', sessionId);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    keepUnusedDataFor: 5,
});
