import { privateApiSlice } from './privateApiSlice';
import { apiSlice } from './apiSlice';

const productPrivateApi = privateApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (product) => ({
                url: 'product/create',
                method: 'POST',
                body: product,
            }),
        }),
        updateProduct: builder.mutation({
            query: ({ id, product }) => ({
                url: `product/update/${id}`,
                method: 'PATCH',
                body: product,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `product/delete/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (keyword) => `product/list?keyword=${keyword}`,
        }),
        getProductById: builder.query({
            query: (id) => `/product/get-product/${id}`,
        }),
    }),
});

export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productPrivateApi;

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
