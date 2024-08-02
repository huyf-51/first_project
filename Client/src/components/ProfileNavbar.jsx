import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

function ProfileNavbar() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button
                                onClick={() => {
                                    navigate('/');
                                }}
                                variant="light"
                                className="nav-link me-4"
                            >
                                Home
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('/user/profile');
                                }}
                                variant="light"
                                className="nav-link me-4"
                            >
                                User Info
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('/user/orders');
                                }}
                                variant="light"
                                className="nav-link me-4"
                            >
                                Orders
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default ProfileNavbar;
