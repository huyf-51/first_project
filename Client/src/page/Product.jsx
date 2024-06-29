import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useGetProductByIdQuery } from '../store/slices/productApiSlice';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading, isSuccess } = useGetProductByIdQuery(id);
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (isLoading) {
        <Container className="mt-5">
            <Spinner animation="border" variant="secondary" />
        </Container>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(data.product));
        toast.success('Success add product to cart');
    };

    if (isSuccess) {
        return (
            <Container className="mt-5">
                <Row>
                    <Col>
                        <Image src={data.product.image} />
                    </Col>
                    <Col>
                        <Row>{data.product.productName}</Row>
                        <Row>{data.product.price}</Row>
                        <Button
                            variant="primary"
                            disabled={!auth}
                            onClick={handleAddToCart}
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
