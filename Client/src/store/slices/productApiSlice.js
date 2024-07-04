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
        findProductById: builder.query({
            query: (id) => ({
                url: `product/edit/${id}`,
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
        searchProduct: builder.query({
            query: (keyword) => `product/search?keyword=${keyword}`,
        }),
        importProducts: builder.mutation({
            query: (products) => ({
                url: 'product/import',
                method: 'POST',
                body: products,
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
    useFindProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useSearchProductQuery,
    useImportProductsMutation,
} = productPrivateApi;

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
