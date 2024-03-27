import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AccountButton() {
    const navigate = useNavigate()

    return (
        <Button variant="primary" onClick={() => navigate('user/login')} className='nav-link'>
            Account
        </Button>
    )
}

export default AccountButton