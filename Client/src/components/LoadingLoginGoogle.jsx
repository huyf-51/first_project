import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/slices/userSlice';
import { useEffect } from 'react';

const LoadingLoginGoogle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogin = () => {
        const query = new URLSearchParams(location.search);
        const data = JSON.parse(query.get('data'));
        const auth = JSON.parse(query.get('auth'));
        const userData = { data, auth };
        dispatch(setCredentials(userData));
        navigate('/');
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
