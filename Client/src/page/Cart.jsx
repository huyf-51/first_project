import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import totalPrice from '../utils/cartUtils';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

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
                                    <td>{cartItem.productName}</td>
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
