import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../slices/authSlice';

function LogoutButton() {
    const navigate = useNavigate();
    const [logout, result] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await logout().unwrap();
        dispatch(setLogout());
        navigate('/user/login');
    };
    return (
        <Button variant="primary" onClick={handleLogout} className="nav-link">
            Logout
        </Button>
    );
}

export default LogoutButton;
