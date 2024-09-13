import { RouterProvider } from 'react-router-dom';

import routes from './routes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../src/config/socket';

function App() {
    const sessionId = useSelector((state) => state.user.sessionId);
    useEffect(() => {
        if (sessionId) {
            socket.auth = { sessionId };
            socket.connect();
        } else {
            socket.disconnect();
        }
    }, [sessionId]);
    return <RouterProvider router={routes} />;
}

export default App;
