import { RouterProvider } from 'react-router-dom';

import { useEffect } from 'react';

import routes from './routes';

function App() {
    useEffect(() => {
        // axios
        //     .get('/user/google/success')
        //     .then((res) => {
        //         if (res.status === 200) {
        //             localStorage.setItem('persist', true);
        //         }
        //     })
        //     .catch(() => {});
    }, []);
    return <RouterProvider router={routes} />;
}

export default App;
