import { apiSlice } from './apiSlice';

const orderApi = apiSlice.injectEndpoints({
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
        comfirmPaymentOrder: builder.mutation({
            query: (orderID) => ({
                url: `order/confirm-payment-order/${orderID}`,
                method: 'POST',
            }),
        }),
        getAllOrder: builder.query({
            query: () => 'order/get-all-order',
        }),
        setPayment: builder.mutation({
            query: (orderID) => ({
                url: `order/set-payment/${orderID}`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetPaypalClientIdQuery,
    useCreatePaymentOrderMutation,
    useComfirmPaymentOrderMutation,
    useGetAllOrderQuery,
    useSetPaymentMutation,
} = orderApi;
