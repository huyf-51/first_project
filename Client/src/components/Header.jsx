import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import CartButton from './button/CartButton';
import Management from './button/ManageButton';

import LogoutButton from './button/LogoutButton';
import AccountButton from './button/AccoutButton';
import Button from 'react-bootstrap/esm/Button';
import ProfileButton from './button/ProfileButton';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import UserChatButton from './button/UserChatButton';
import AdminChatButton from './button/AdminChatButton';
import NotifyButton from './button/NotifyButton';

function Header() {
    const auth = JSON.parse(localStorage.getItem('auth'));
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
                            {localStorage.getItem('auth') ? (
                                <Row>
                                    <Col>
                                        <ProfileButton />
                                    </Col>
                                    <Col>
                                        <LogoutButton />
                                    </Col>
                                </Row>
                            ) : (
                                <>
                                    <AccountButton />
                                </>
                            )}
                            {auth?.role === 'admin' && <Management />}
                            <SearchInput />
                            <CartButton />
                            {auth?.role === 'user' && <UserChatButton />}
                            {auth?.role === 'admin' && <AdminChatButton />}
                            {localStorage.getItem('auth') && <NotifyButton />}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default Header;
