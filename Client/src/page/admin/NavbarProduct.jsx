import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button';

function NavbarProduct() {
    const navigate = useNavigate()

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant="light" onClick={() => { navigate('/') }} className='nav-link'>
                                Home
                            </Button>
                            <Button variant="light" onClick={() => { navigate('/product/list') }} className='nav-link'>
                                Product List
                            </Button>
                            <Button variant="light" onClick={() => { navigate('/product/create') }} className='nav-link'>
                                Create Product
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default NavbarProduct