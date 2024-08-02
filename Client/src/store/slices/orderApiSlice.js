import { privateApiSlice } from './privateApiSlice';

const orderPrivateApi = privateApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: 'order/create-order',
                method: 'POST',
                body: data,
            }),
        }),
        getPaypalClientId: builder.query({
            query: () => 'order/get-paypal-client-id',
        }),
        createPaymentOrder: builder.mutation({
            query: (orderId) => ({
                url: `order/create-payment-order/${orderId}`,
                method: 'POST',
            }),
        }),
        confirmPaymentOrder: builder.mutation({
            query: (orderID) => ({
                url: `order/confirm-payment-order/${orderID}`,
                method: 'POST',
            }),
        }),
        getAllUserOrder: builder.query({
            query: () => 'order/get-all-user-order',
        }),
        getAllOrder: builder.query({
            query: () => 'order/get-all-order',
        }),
        getOrderById: builder.query({
            query: (id) => `order/get-order-by-id/${id}`,
        }),
        setPayment: builder.mutation({
            query: (orderID) => ({
                url: `order/set-payment/${orderID}`,
                method: 'POST',
            }),
        }),
        confirmOrder: builder.mutation({
            query: (orderID) => ({
                url: `order/confirm-order/${orderID}`,
                method: 'POST',
            }),
        }),
        deleteOrder: builder.mutation({
            query: (orderID) => ({
                url: `order/delete-order/${orderID}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetPaypalClientIdQuery,
    useCreatePaymentOrderMutation,
    useConfirmPaymentOrderMutation,
    useSetPaymentMutation,
    useGetAllUserOrderQuery,
    useGetAllOrderQuery,
    useGetOrderByIdQuery,
    useConfirmOrderMutation,
    useDeleteOrderMutation,
} = orderPrivateApi;
