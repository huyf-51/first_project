import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function UserChatButton() {
    const navigate = useNavigate();

    const navigateUserChat = () => {
        navigate('/user/chat');
    };

    return (
        <>
            <Button
                variant="light"
                className="nav-link ms-2"
                onClick={navigateUserChat}
            >
                Chat with Shop
            </Button>
        </>
    );
}

export default UserChatButton;
