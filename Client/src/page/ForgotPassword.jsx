import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useSendCodeByMailMutation,
    useUpdatePasswordMutation,
} from '../slices/userApiSlice';

function ForgotPassword() {
    const [notify, setNotify] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const navigate = useNavigate();
    const [sendCodeByMail, result] = useSendCodeByMailMutation();
    const [updatePassword, { isSuccess }] = useUpdatePasswordMutation();

    const handleSendCode = async () => {
        const data = await sendCodeByMail({
            email: formik.values.email,
        }).unwrap();
        if (data.message) {
            setNotify(data.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            code: '',
            newPassword: '',
            confirmedPassword: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('email not valid').required('required'),
            code: yup.string().required('required'),
            newPassword: yup
                .string()
                .min(8, 'minimum 8 characters')
                .max(12, 'maximum 12 characters')
                .required('required'),
            confirmedPassword: yup
                .string()
                .oneOf([yup.ref('newPassword')], 'password is not match')
                .required('required'),
        }),
        onSubmit: async (values) => {
            try {
                const data = await updatePassword(values).unwrap();
                console.log('isSuccess: ', isSuccess);
                if (isSuccess && data.message === 'success') {
                    navigate('/user/login');
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <Container
            className="mt-5 border border-dark rounded pt-3 pb-3"
            style={{ width: 500 }}
        >
            <Form
                onSubmit={formik.handleSubmit}
                className="mx-auto"
                style={{ width: 400 }}
            >
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {notify && (
                        <Form.Group>
                            <Form.Text>{notify}</Form.Text>
                        </Form.Group>
                    )}
                    {formik.errors.email && formik.touched.email && (
                        <Form.Text>{formik.errors.email}</Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="code">
                    <Form.Label>Code</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Enter code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                            />
                        </Col>
                        <Col>
                            <Button onClick={handleSendCode}>Send Code</Button>
                        </Col>
                    </Row>

                    {formik.errors.code && formik.touched.code && (
                        <Form.Text>{formik.errors.code}</Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.newPassword &&
                        formik.touched.newPassword && (
                            <Form.Text>{formik.errors.newPassword}</Form.Text>
                        )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmedPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
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
                {message && (
                    <Form.Group>
                        <Form.Text>{message}</Form.Text>
                    </Form.Group>
                )}
            </Form>
        </Container>
    );
}

export default ForgotPassword;
