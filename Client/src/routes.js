import { createBrowserRouter } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import ForgotPassword from './page/ForgotPassword';
import Layout from './page/Layout';
import Home from './page/Home';
import Search from './page/Search';
import RequireAuth from './components/RequireAuth';
import Cart from './page/Cart';
import NavbarProduct from './page/admin/NavbarProduct';
import ListProduct from './page/admin/ListProduct';
import CreateProduct from './page/admin/CreateProduct';
import UpdateProduct from './page/admin/UpdateProduct';
import PageNotFound from './page/PageNotFound';
import Unauthorized from './page/Unauthorized';

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
        path: 'user/forgotPassword',
        element: <ForgotPassword />,
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
                path: '/search',
                element: <Search />,
            },
            {
                element: <RequireAuth allowedRole={['admin', 'user']} />,
                children: [
                    {
                        path: '/cart',
                        element: <Cart />,
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
        path: '/unauthorized',
        element: <Unauthorized />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);

export default routes;
