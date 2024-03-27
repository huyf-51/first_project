import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, setLogout } from './authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('authorization', token);
        }
        return headers;
    },
});

const baseQueryConfig = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery('refresh', api, extraOptions);
        if (refreshResult?.data) {
            api.dispatch(setCredentials(refreshResult?.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(setLogout());
        }
    }
    return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const apiSlice = createApi({
    baseQuery: baseQueryConfig,
    endpoints: () => ({}),
});
