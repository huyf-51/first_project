import { privateApiSlice } from './privateApiSlice';

const cartPrivateApi = privateApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToRedisCart: builder.mutation({
            query: (data) => ({
                url: 'cart/add-to-cart',
                method: 'POST',
                body: data,
            }),
        }),
        getCart: builder.query({
            query: () => 'cart/get-cart',
        }),
        updateCart: builder.mutation({
            query: (data) => ({
                url: 'cart/update-cart',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useAddToRedisCartMutation,
    useGetCartQuery,
    useLazyGetCartQuery,
    useUpdateCartMutation,
} = cartPrivateApi;
