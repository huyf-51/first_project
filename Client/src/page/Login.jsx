import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import GoogleLoginButton from '../components/button/GoogleLoginButton';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [login, result] = useLoginMutation();

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const handleInput = (e) => {
        setInput((preInput) => {
            return { ...preInput, [e.target.id]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // axios.post('/user/login', input)
        //     .then((res) => {
        //         if (res.data?.error) {
        //             setError(res.data?.error)
        //         } else {
        //             localStorage.setItem("persist", true)
        //             setAuth(res.data)
        //             navigate('/')
        //         }
        //     })
        const data = await login(input).unwrap();
        if (data.error) {
            setError(data.error);
        } else {
            dispatch(setCredentials(data));
            navigate('/');
        }
    };
    return (
        <Container
            className="mt-5 border border-dark rounded pt-3 pb-3"
            style={{ width: 500 }}
        >
            <Form className="mx-auto" style={{ width: 400 }}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={handleInput}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={handleInput}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
                {error && (
                    <Form.Group>
                        <Form.Text>{error}</Form.Text>
                    </Form.Group>
                )}
                <Form.Group className="mt-2 mb-2">
                    <Link to="/user/forgotPassword">Forgot Password</Link>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Text className="text-dark">
                        Don't have account?{' '}
                        <Link to="/user/register">Create</Link>
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Text className="text-dark">
                        Or continue with <GoogleLoginButton />
                    </Form.Text>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Login;
