import Button from "react-bootstrap/esm/Button";
import gg_icon from "../../assets/gg_icon.png"
import Image from 'react-bootstrap/Image';

function GoogleLoginButton() {
    const handleGoogleLogin = async () => {
        window.open('http://localhost:3001/user/google/login', "_self")
    }
    return (
        <>
            <Button onClick={handleGoogleLogin} variant="none">
                <Image src={gg_icon} style={{ width: 50 }} />
            </Button>
        </>
    )
}

export default GoogleLoginButton