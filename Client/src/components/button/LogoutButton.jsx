import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../store/slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../store/slices/userSlice';

function LogoutButton() {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await logout().unwrap();
        dispatch(setLogout());
        navigate('/');
    };
    return (
        <Button variant="primary" onClick={handleLogout} className="nav-link">
            Logout
        </Button>
    );
}

export default LogoutButton;
