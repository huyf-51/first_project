import { createBrowserRouter } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import ForgotPassword from './page/ForgotPassword';
import Layout from './page/Layout';
import Home from './page/Home';
import RequireAuth from './components/RequireAuth';
import Cart from './page/Cart';
import AdminNavbar from './page/admin/AdminNavbar';
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
import UserLayout from './page/UserLayout';
import UserOrders from './page/UserOrders';
import ListOrder from './page/admin/ListOrder';
import DetailOrder from './page/admin/DetailOrder';
import UserChat from './page/UserChat';
import AdminChat from './page/admin/AdminChat';

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
                ],
            },
        ],
    },
    {
        element: <RequireAuth allowedRole={['user']} />,
        children: [
            {
                path: 'user/chat',
                element: <UserChat />,
            },
        ],
    },
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                element: <RequireAuth allowedRole={['admin', 'user']} />,
                children: [
                    {
                        path: 'user/profile',
                        element: <Profile />,
                    },
                    {
                        path: 'user/orders',
                        element: <UserOrders />,
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
                element: <AdminNavbar />,
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
            {
                path: '/',
                element: <AdminNavbar />,
                children: [
                    {
                        path: 'order/list',
                        element: <ListOrder />,
                    },
                    {
                        path: 'order/detail/:id',
                        element: <DetailOrder />,
                    },
                ],
            },
            {
                path: '/admin/chat',
                element: <AdminChat />,
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
