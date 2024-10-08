import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useGetProductByIdQuery } from '../store/slices/productApiSlice';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAddToRedisCartMutation } from '../store/slices/cartApiSlice';
import { addToCart } from '../store/slices/cartSlice';
import { getQuantityOfProductInCart } from '../utils/cartUtils';

function Product() {
    const cart = useSelector((state) => state.cart);
    const { id } = useParams();
    const { data, isLoading, isSuccess } = useGetProductByIdQuery(id);
    const [outOfStock, setOutOfStock] = useState(false);
    const [productCount, setProductCount] = useState(1);
    const [minusButton, setMinusButton] = useState(true);
    const [plusButton, setPlusButton] = useState(false);
    const dispatch = useDispatch();
    const [addToRedisCart] = useAddToRedisCartMutation();
    const quantityInCart = getQuantityOfProductInCart(cart, id);
    const auth = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        if (productCount < 2) {
            setMinusButton(true);
        } else {
            setMinusButton(false);
        }
        if (productCount === data?.product?.inStock - quantityInCart) {
            setPlusButton(true);
        } else {
            setPlusButton(false);
        }
        if (data?.product?.inStock - quantityInCart === 0) {
            setOutOfStock(true);
        }
        if (data?.product?.inStock - quantityInCart < 2) {
            setPlusButton(true);
        }
    }, [productCount, data, cart]);

    if (isLoading) {
        <Container className="mt-5">
            <Spinner animation="border" variant="secondary" />
        </Container>;
    }

    const handleAddToCart = async () => {
        dispatch(addToCart({ ...data.product, quantity: productCount }));
        try {
            await addToRedisCart({ id, quantity: productCount }).unwrap();
        } catch (error) {
            console.log(error);
        }
        toast.success('Success add product to cart');
    };

    if (isSuccess) {
        return (
            <Container className="mt-5">
                <Row>
                    <Col>
                        <Image src={data.product.imageUrl} />
                    </Col>
                    <Col>
                        <Row className="mt-2">{data.product.productName}</Row>
                        <Row className="mt-2">{data.product.price}</Row>

                        {outOfStock ? (
                            <Row className="mt-2">Out of Stock</Row>
                        ) : (
                            <Row className="mt-2">
                                <Col>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setProductCount((pre) => pre - 1);
                                        }}
                                        disabled={minusButton}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                </Col>
                                <Col>
                                    <div>{productCount}</div>
                                </Col>
                                <Col>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setProductCount((pre) => pre + 1);
                                        }}
                                        disabled={plusButton}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </Col>
                            </Row>
                        )}

                        <Button
                            variant="primary"
                            disabled={!auth || outOfStock}
                            onClick={handleAddToCart}
                            className="mt-2"
                        >
                            Add to cart
                        </Button>
                        <ToastContainer />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Product;
