import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from 'react';
import socket from '../../../src/config/socket';
import {
    useGetNotificationQuery,
    useViewNotificationMutation,
} from '../../store/slices/notificationApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NotifyButton() {
    const [viewNotification] = useViewNotificationMutation();
    const navigate = useNavigate();
    const { _id: userId } = useSelector((state) => state.user.data);
    const { data } = useGetNotificationQuery(userId);
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        socket.on('notification', (msg, callback) => {
            callback('ok');
            setNotifications((preMsg) => [...preMsg, msg]);
            setCount((preCount) => preCount + 1);
        });
    }, []);
    useEffect(() => {
        if (data) {
            setNotifications(data);
            setCount(data.filter((item) => !item.viewed));
        }
    }, [data]);

    return (
        <>
            <DropdownButton
                id="dropdown-basic-button"
                title={
                    <>
                        <FontAwesomeIcon icon={faBell} />
                        {count !== 0 && <Badge bg="danger">{count}</Badge>}
                    </>
                }
                variant="light"
            >
                {notifications.length === 0 ? (
                    <Dropdown.Item>No notification</Dropdown.Item>
                ) : (
                    notifications.map((notification, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={async () => {
                                await viewNotification({
                                    id: notification._id,
                                }).unwrap();
                                navigate('/user/orders', { state: true });
                            }}
                            className={!notification.viewed && 'bg-light'}
                        >
                            {notification.content}
                        </Dropdown.Item>
                    ))
                )}
            </DropdownButton>
        </>
    );
}

export default NotifyButton;
