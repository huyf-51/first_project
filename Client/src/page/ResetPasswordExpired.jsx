import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordExpired() {
    const navigate = useNavigate();
    return (
        <>
            <Container className="mt-5">
                Reset password fail
                <Button
                    onClick={() => navigate('/user/forgot-password')}
                    className="ms-3"
                >
                    Again
                </Button>
            </Container>
        </>
    );
}
