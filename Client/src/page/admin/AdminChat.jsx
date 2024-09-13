import { useEffect, useState } from 'react';
import socket from '../../config/socket';
import { useSelector } from 'react-redux';
import { useGetAllUserActivateMessageQuery } from '../../store/slices/userApiSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
    useSetMessageMutation,
    useGetMessageQuery,
} from '../../store/slices/messageApiSlice';
import ListGroup from 'react-bootstrap/ListGroup';

const AdminChat = () => {
    const [msg, setMsg] = useState();
    const [userId, setUserId] = useState();
    const [listUser, setListUser] = useState([]);
    const [messages, setMessages] = useState([]);
    const [setMessage] = useSetMessageMutation();
    const [input, setInput] = useState('');
    const userData = useSelector((state) => state.user.data);
    const { data, isSuccess } = useGetAllUserActivateMessageQuery(
        userData?._id
    );
    const message = useGetMessageQuery({ from: userData?._id, to: userId });
    useEffect(() => {
        socket.on('receive message', (msg, newUser) => {
            setMsg(msg);
            if (newUser && newUser._id !== userData._id) {
                setListUser((pre) => [...pre, newUser]);
            }
        });
        socket.on('connect_error', (error) => {
            console.log('socket error>>>', error);
        });
        socket.on('disconnect', (reason, details) => {
            console.log(reason);
        });
    }, []);

    useEffect(() => {
        if (msg?.from === userId && msg?.from !== undefined) {
            setMessages((pre) => [...pre, msg]);
        }
    }, [msg]);

    useEffect(() => {
        if (message.data) {
            setMessages(message.data);
        }
    }, [message]);

    useEffect(() => {
        message.refetch();
    }, [userId]);

    useEffect(() => {
        setListUser(data);
    }, [data]);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        setMessages((pre) => [
            ...pre,
            { content: input, to: userId, from: userData?._id },
        ]);
        socket.emit('send message', {
            content: input,
            to: userId,
            from: userData?._id,
        });
        await setMessage({
            content: input,
            from: userData?._id,
            to: userId,
        }).unwrap();
        setInput('');
    };

    if (isSuccess) {
        return (
            <Container className="mt-5">
                <Row>
                    <Col>
                        {listUser?.length >= 1 &&
                            listUser.map((user, index) => {
                                return (
                                    <div key={index}>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setUserId(user._id);
                                            }}
                                            key={index}
                                            className="mt-2"
                                        >
                                            {user?.email}
                                        </Button>
                                        <br />
                                    </div>
                                );
                            })}
                    </Col>
                    <Col>
                        {userId && (
                            <Container>
                                <ListGroup>
                                    {messages.map((message, index) => (
                                        <ListGroup.Item key={index}>
                                            {message.from === userData._id ? (
                                                <div className="d-flex justify-content-end">
                                                    {message.content}
                                                </div>
                                            ) : (
                                                message.content
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Form className="mx-auto d-flex mt-3 ms-5">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="email"
                                    >
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={handleInput}
                                            required
                                            value={input}
                                            style={{ width: '500px' }}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3 ms-2"
                                        controlId="email"
                                    >
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            onClick={handleSend}
                                        >
                                            Send
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Container>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default AdminChat;
