import { apiSlice } from './apiSlice';

const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'product/list',
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: 'product/create',
                method: 'POST',
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
    }),
});

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useFindProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useSearchProductQuery,
} = productApi;
