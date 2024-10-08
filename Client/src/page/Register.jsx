import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRegisterMutation } from '../store/slices/userApiSlice';

function Register() {
    const navigate = useNavigate();
    const [register, { error }] = useRegisterMutation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmedPassword: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('email not valid').required('required'),
            password: yup
                .string()
                .min(8, 'minimum 8 characters')
                .max(12, 'maximum 12 characters')
                .required('required'),
            confirmedPassword: yup
                .string()
                .oneOf([yup.ref('password')], 'password is not match')
                .required('required'),
        }),
        onSubmit: async (values) => {
            try {
                await register(values).unwrap();
                navigate('/user/login');
            } catch (error) {}
        },
    });

    return (
        <Container
            className="mt-5 border border-dark rounded pt-3 pb-3"
            style={{ width: 500 }}
        >
            <Form
                onSubmit={formik.handleSubmit}
                style={{ width: 400 }}
                className="mx-auto"
            >
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <Form.Text>{formik.errors.email}</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <Form.Text>{formik.errors.password}</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmedPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder=" Enter Confirmed Password"
                        value={formik.values.confirmedPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedPassword &&
                        formik.touched.confirmedPassword && (
                            <Form.Text>
                                {formik.errors.confirmedPassword}
                            </Form.Text>
                        )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {error && (
                    <Form.Group>
                        <Form.Text>{error.data.message}</Form.Text>
                    </Form.Group>
                )}
            </Form>
        </Container>
    );
}

export default Register;
