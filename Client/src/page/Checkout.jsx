import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import totalPrice from '../utils/cartUtils';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../store/slices/orderApiSlice';
import { removeCart } from '../store/slices/cartSlice';

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const [createOrder] = useCreateOrderMutation();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            shippingAddress: '',
            phoneNumber: '',
        },
        validationSchema: yup.object({
            fullName: yup.string().required('required'),
            shippingAddress: yup.string().required('required'),
            phoneNumber: yup.string().required('required'),
        }),
        onSubmit: async (values) => {
            const orderId = await createOrder({
                ...formik.values,
                orderItems: cart,
                totalPrice: totalPrice(cart),
            }).unwrap();
            dispatch(removeCart());
            navigate(`/payment/${orderId}`);
        },
    });

    return (
        <Form
            onSubmit={formik.handleSubmit}
            className="mx-auto mt-5"
            id="payment-form"
        >
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.fullName &&
                                formik.touched.fullName && (
                                    <Form.Text className="text-danger">
                                        {formik.errors.fullName}
                                    </Form.Text>
                                )}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="shippingAddress"
                        >
                            <Form.Label>Shipping address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                value={formik.values.shippingAddress}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.shippingAddress &&
                                formik.touched.shippingAddress && (
                                    <Form.Text className="text-danger">
                                        {formik.errors.shippingAddress}
                                    </Form.Text>
                                )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=" Enter phone number"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.phoneNumber &&
                                formik.touched.phoneNumber && (
                                    <Form.Text className="text-danger">
                                        {formik.errors.phoneNumber}
                                    </Form.Text>
                                )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Container className="my-5">
                            {cart.length === 0 ? (
                                <div>
                                    <div>
                                        No items
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate('/')}
                                            className="ms-3"
                                        >
                                            Shopping now
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((cartItem, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Image
                                                            src={cartItem.image}
                                                            className="w-25"
                                                        />
                                                    </td>
                                                    <td>
                                                        {cartItem.productName}
                                                    </td>
                                                    <td>{cartItem.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="d-flex flex-row-reverse">
                                        <div className="d-flex flex-column">
                                            <div className="mb-2">
                                                Total price: {totalPrice(cart)}
                                            </div>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                            >
                                                Place Order
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}
