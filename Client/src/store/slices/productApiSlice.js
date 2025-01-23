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
        searchOrGetProducts: builder.query({
            query: (keyword) =>
                keyword ? `product/search?keyword=${keyword}` : '/product/list',
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

export const { useSearchOrGetProductsQuery, useGetProductByIdQuery } =
    productApi;
