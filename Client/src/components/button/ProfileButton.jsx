import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
    const navigate = useNavigate();

    const navigateProfile = () => {
        navigate('/user/profile');
    };

    return (
        <>
            <Button
                variant="primary"
                className="nav-link"
                onClick={navigateProfile}
            >
                Profile
            </Button>
        </>
    );
}

export default ProfileButton;
