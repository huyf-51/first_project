import { useGetAllOrderQuery } from '../store/slices/orderApiSlice';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import totalPrice from '../utils/orderUtils';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const { data, isLoading, isSuccess } = useGetAllOrderQuery();
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
                {data.map((item, index) => (
                    <Container key={index}>
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
                                {item.orderItems.map((cartItem, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Image
                                                src={cartItem.product.imageUrl}
                                                className="w-25"
                                            />
                                        </td>
                                        <td>{cartItem.product.productName}</td>
                                        <td>
                                            {cartItem.product.price *
                                                cartItem.quantity}
                                        </td>
                                        <td>{cartItem.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="mb-2 d-flex flex-row-reverse">
                            Total price: {totalPrice(item.orderItems)}
                        </div>
                        <div>
                            {item.isPayed ? (
                                <div>Payed</div>
                            ) : (
                                <Button
                                    onClick={() =>
                                        navigate(`/payment/${item._id}`)
                                    }
                                >
                                    Pay
                                </Button>
                            )}
                        </div>
                    </Container>
                ))}
            </>
        );
    }
};

export default Profile;
