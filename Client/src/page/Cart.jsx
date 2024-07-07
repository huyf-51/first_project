import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { totalPrice } from '../utils/cartUtils';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useUpdateCartMutation } from '../store/slices/cartApiSlice';

function Cart() {
    const [updateCart] = useUpdateCartMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const handleAddProduct = async (itemId) => {
        dispatch(addProduct(itemId));
        await updateCart({ id: itemId, count: 1 }).unwrap();
    };

    const handleRemoveProduct = async (itemId) => {
        dispatch(removeProduct(itemId));
        await updateCart({ id: itemId, count: -1 }).unwrap();
    };

    return (
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
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((cartItem, index) => (
                                <tr key={index}>
                                    <td>
                                        <Image
                                            src={cartItem.imageUrl}
                                            className="w-25"
                                        />
                                    </td>
                                    <td>{cartItem.productName}</td>
                                    <td>
                                        {cartItem.price * cartItem.quantity}
                                    </td>
                                    <td>
                                        <Row className="mt-2">
                                            <Col>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {
                                                        handleRemoveProduct(
                                                            cartItem._id
                                                        );
                                                    }}
                                                    disabled={
                                                        cartItem.quantity === 1
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faMinus}
                                                    />
                                                </Button>
                                            </Col>
                                            <Col>
                                                <div>{cartItem.quantity}</div>
                                            </Col>
                                            <Col>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {
                                                        handleAddProduct(
                                                            cartItem._id
                                                        );
                                                    }}
                                                    disabled={
                                                        cartItem.quantity ===
                                                        cartItem.inStock
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                    />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
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
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default Cart;
