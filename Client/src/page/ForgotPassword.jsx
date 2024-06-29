import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSendMailMutation } from '../store/slices/userApiSlice';
import { useState } from 'react';

function ForgotPassword() {
    const [sendCodeByMail] = useSendMailMutation();
    const [toggleResult, setToggleResult] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('email not valid').required('required'),
        }),
        onSubmit: async (values) => {
            try {
                await sendCodeByMail({
                    email: formik.values.email,
                }).unwrap();
            } catch (error) {}
            setToggleResult(true);
        },
    });

    if (toggleResult) {
        return (
            <Container className="mt-5">
                Check your email to reset password (if it's valid)
            </Container>
        );
    }

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
                    {formik.errors.email && formik.touched.email && (
                        <Form.Text>{formik.errors.email}</Form.Text>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default ForgotPassword;
