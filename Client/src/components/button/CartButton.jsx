import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function CartButton() {
    const navigate = useNavigate()

    const navigateCart = () => {
        navigate('/cart')
    }

    return (
        <>
            <Button variant="light" className='nav-link' onClick={navigateCart}>
                Cart
            </Button>
        </>
    )
}

export default CartButton