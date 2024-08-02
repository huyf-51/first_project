import { Outlet } from 'react-router-dom';
import ProfileNavbar from '../components/ProfileNavbar';

function UserLayout() {
    return (
        <>
            <ProfileNavbar />
            <Outlet />
        </>
    );
}

export default UserLayout;
