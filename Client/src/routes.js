import { createBrowserRouter } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import ForgotPassword from './page/ForgotPassword';
import Layout from './page/Layout';
import Home from './page/Home';
import RequireAuth from './components/RequireAuth';
import Cart from './page/Cart';
import NavbarProduct from './page/admin/NavbarProduct';
import ListProduct from './page/admin/ListProduct';
import CreateProduct from './page/admin/CreateProduct';
import UpdateProduct from './page/admin/UpdateProduct';
import PageNotFound from './page/PageNotFound';
import Unauthorized from './page/Unauthorized';
import ResetPassword from './page/ResetPassword';
import Product from './page/Product';
import LoadingLoginGoogle from './components/LoadingLoginGoogle';
import Account from './page/Account';
import Checkout from './page/Checkout';
import PaymentSuccess from './page/PaymentSuccess';
import Payment from './page/Payment';
import Profile from './page/Profile';
import ResetPasswordExpired from './page/ResetPasswordExpired';

const routes = createBrowserRouter([
    {
        path: 'user/register',
        element: <Register />,
    },
    {
        path: 'user/login',
        element: <Login />,
    },
    {
        path: 'user/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: 'user/reset-password/:id/:token',
        element: <ResetPassword />,
    },
    {
        path: 'user/reset-password-fail',
        element: <ResetPasswordExpired />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/product/:id',
                element: <Product />,
            },
            {
                element: <RequireAuth allowedRole={['admin', 'user']} />,
                children: [
                    {
                        path: '/cart',
                        element: <Cart />,
                    },
                    {
                        path: '/account',
                        element: <Account />,
                    },
                    {
                        path: '/checkout',
                        element: <Checkout />,
                    },
                    {
                        path: '/payment-success',
                        element: <PaymentSuccess />,
                    },
                    {
                        path: '/payment/:id',
                        element: <Payment />,
                    },
                    {
                        path: 'user/profile',
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
    {
        element: <RequireAuth allowedRole={['admin']} />,
        children: [
            {
                path: 'product',
                element: <NavbarProduct />,
                children: [
                    {
                        path: 'list',
                        element: <ListProduct />,
                    },
                    {
                        path: 'create',
                        element: <CreateProduct />,
                    },
                    {
                        path: 'update/:id',
                        element: <UpdateProduct />,
                    },
                ],
            },
        ],
    },
    {
        path: '/google/auth/callback',
        element: <LoadingLoginGoogle />,
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);

export default routes;
