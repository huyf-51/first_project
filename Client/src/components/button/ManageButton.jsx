import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function Management() {
    const navigate = useNavigate();

    const navigateProduct = () => {
        navigate('/product/list');
    };

    return (
        <>
            <Button
                variant="light"
                className="nav-link"
                onClick={navigateProduct}
            >
                Management
            </Button>
        </>
    );
}

export default Management;
