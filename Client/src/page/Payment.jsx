import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
    useConfirmPaymentOrderMutation,
    useCreatePaymentOrderMutation,
    useGetPaypalClientIdQuery,
    useSetPaymentMutation,
} from '../store/slices/orderApiSlice';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';

function Payment() {
    const { id: orderId } = useParams();
    const [setPayment] = useSetPaymentMutation();
    const navigate = useNavigate();
    const [createPaymentOrder] = useCreatePaymentOrderMutation();
    const [confirmPaymentOrder] = useConfirmPaymentOrderMutation();
    const { data: clientId } = useGetPaypalClientIdQuery();
    const initialOptions = {
        'client-id': clientId,
        currency: 'USD',
    };

    const handleCreateOrder = async () => {
        const orderData = await createPaymentOrder(orderId).unwrap();

        if (orderData.id) {
            return orderData.id;
        }
    };

    const handleError = (err) => {
        console.log('error in onerror>>>', err.message);
    };

    const handleApprove = async (data, actions) => {
        const orderData = await confirmPaymentOrder(data.orderID).unwrap();

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
            return actions.restart();
        } else {
            await setPayment(orderId).unwrap();
            navigate('/payment-success');
        }
    };

    return (
        <Container className="mt-5">
            {clientId && (
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        style={{
                            shape: 'rect',
                            layout: 'vertical',
                            color: 'gold',
                            label: 'paypal',
                        }}
                        createOrder={handleCreateOrder}
                        onError={handleError}
                        onApprove={handleApprove}
                    />
                </PayPalScriptProvider>
            )}
            <Button variant="primary" onClick={() => navigate('/')}>
                Pay later
            </Button>
        </Container>
    );
}

export default Payment;
