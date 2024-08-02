import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function AdminChatButton() {
    const navigate = useNavigate();

    const navigateAdminChat = () => {
        navigate('/admin/chat');
    };

    return (
        <>
            <Button
                variant="light"
                className="nav-link ms-2"
                onClick={navigateAdminChat}
            >
                Messenger
            </Button>
        </>
    );
}

export default AdminChatButton;
