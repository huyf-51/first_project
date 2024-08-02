import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../store/slices/orderApiSlice';
import { useConfirmOrderMutation } from '../../store/slices/orderApiSlice';

export default function DetailOrder() {
    const [confirmOrder] = useConfirmOrderMutation();
    const { id } = useParams();
    const { data, isSuccess, refetch } = useGetOrderByIdQuery(id);
    const handleConfirmOrder = async () => {
        try {
            await confirmOrder(id).unwrap();
            refetch();
        } catch (error) {}
    };
    if (isSuccess) {
        return (
            <Form className="mx-auto mt-5" id="payment-form">
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="fullName">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={data.fullName}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="shippingAddress"
                            >
                                <Form.Label>Shipping address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your address"
                                    value={data.shippingAddress}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="phoneNumber"
                            >
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=" Enter phone number"
                                    value={data.phoneNumber}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Container className="my-5">
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.orderItems.map(
                                            (dataItem, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Image
                                                            src={
                                                                dataItem.product
                                                                    .imageUrl
                                                            }
                                                            className="w-25"
                                                        />
                                                    </td>
                                                    <td>
                                                        {
                                                            dataItem.product
                                                                .productName
                                                        }
                                                    </td>
                                                    <td>
                                                        {dataItem.product
                                                            .price *
                                                            dataItem.quantity}
                                                    </td>
                                                    <td>{dataItem.quantity}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                                {data.isConfirmed ? (
                                    'Order is confirmed'
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={handleConfirmOrder}
                                    >
                                        Confirm Order
                                    </Button>
                                )}
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Form>
        );
    }
}
