import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../store/slices/userApiSlice';
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [updatePassword, resultUpdatePassword] = useResetPasswordMutation();

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmedPassword: '',
        },
        validationSchema: yup.object({
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
                await updatePassword({
                    newPassword: values.newPassword,
                    id,
                    token,
                }).unwrap();
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
                className="mx-auto"
                style={{ width: 400 }}
            >
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
                {resultUpdatePassword.error && (
                    <Form.Group>
                        <Form.Text>
                            {resultUpdatePassword.error.message}
                        </Form.Text>
                    </Form.Group>
                )}
            </Form>
        </Container>
    );
}

export default ResetPassword;
