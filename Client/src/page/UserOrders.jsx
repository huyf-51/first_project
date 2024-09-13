import {
    useDeleteOrderMutation,
    useGetAllUserOrderQuery,
} from '../store/slices/orderApiSlice';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import totalPrice from '../utils/orderUtils';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserOrders = () => {
    const { state } = useLocation();
    const [deleteOrder] = useDeleteOrderMutation();
    const [confirmed, setConfirmed] = useState(() => (state ? state : false));
    const navigate = useNavigate();
    const { data, isLoading, isSuccess, refetch } = useGetAllUserOrderQuery();
    const handleDeleteOrder = async (id) => {
        await deleteOrder(id).unwrap();
        refetch();
    };
    if (isLoading) {
        return (
            <Container className="mt-5">
                <Spinner animation="border" variant="secondary" />
            </Container>
        );
    }
    if (isSuccess) {
        return (
            <>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        setConfirmed(false);
                                    }}
                                    className="nav-link"
                                    style={{
                                        fontWeight: confirmed
                                            ? 'normal'
                                            : 'bold',
                                    }}
                                >
                                    Waiting for confirm
                                </Button>
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        setConfirmed(true);
                                    }}
                                    className="nav-link"
                                    style={{
                                        fontWeight: confirmed
                                            ? 'bold'
                                            : 'normal',
                                    }}
                                >
                                    Confirmed
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="mb-5">
                    {data
                        .filter((item) => item.isConfirmed === confirmed)
                        .map((item, index) => (
                            <Container key={index}>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            {!item.isConfirmed && <th></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.orderItems.map(
                                            (cartItem, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Image
                                                            src={
                                                                cartItem.product
                                                                    .imageUrl
                                                            }
                                                            className="w-25"
                                                        />
                                                    </td>
                                                    <td>
                                                        {
                                                            cartItem.product
                                                                .productName
                                                        }
                                                    </td>
                                                    <td>
                                                        {cartItem.product
                                                            .price *
                                                            cartItem.quantity}
                                                    </td>
                                                    <td>{cartItem.quantity}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                                <div className="mb-2 d-flex flex-row-reverse">
                                    Total price: {totalPrice(item.orderItems)}
                                </div>
                                <div className="d-flex">
                                    <div className="me-4">
                                        {item.isPayed ? (
                                            <div>Payed</div>
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    navigate(
                                                        `/payment/${item._id}`
                                                    )
                                                }
                                            >
                                                Pay
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        {!item.isConfirmed && (
                                            <td>
                                                <Button
                                                    onClick={() => {
                                                        handleDeleteOrder(
                                                            item._id
                                                        );
                                                    }}
                                                    variant="warning"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        )}
                                    </div>
                                </div>
                            </Container>
                        ))}
                </div>
            </>
        );
    }
};

export default UserOrders;
