import Button from 'react-bootstrap/esm/Button';
import gg_icon from '../../assets/gg_icon.png';
import Image from 'react-bootstrap/Image';
import { useGetGoogleAuthUrlQuery } from '../../store/slices/userApiSlice';

function GoogleLoginButton() {
    const { data } = useGetGoogleAuthUrlQuery();
    const handleGoogleLogin = () => {
        window.open(data.url, '_self');
    };
    return (
        <>
            <Button onClick={handleGoogleLogin} variant="none">
                <Image src={gg_icon} style={{ width: 50 }} />
            </Button>
        </>
    );
}

export default GoogleLoginButton;
