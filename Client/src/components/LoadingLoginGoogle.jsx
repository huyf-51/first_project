import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/slices/userSlice';
import { useEffect } from 'react';
import { setCart } from '../store/slices/cartSlice';
import { useLazyGetCartQuery } from '../store/slices/cartApiSlice';

const LoadingLoginGoogle = () => {
    const [getCart] = useLazyGetCartQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        const query = new URLSearchParams(location.search);
        const data = JSON.parse(query.get('data'));
        const auth = JSON.parse(query.get('auth'));
        const userData = { data, auth };
        dispatch(setCredentials(userData));
        try {
            const cart = await getCart().unwrap();
            dispatch(setCart(cart));
        } catch (error) {
        } finally {
            navigate('/');
        }
    };
    useEffect(() => {
        handleLogin();
    }, []);
    return (
        <Container className="mt-5">
            <Spinner animation="border" variant="secondary" />
        </Container>
    );
};

export default LoadingLoginGoogle;
