import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth({ allowedRole }) {
    const location = useLocation();
    const auth = JSON.parse(localStorage.getItem('auth'));

    return allowedRole.includes(auth?.role) ? (
        <Outlet />
    ) : auth?.accessToken ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/user/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
