import { useEffect, useState } from 'react';
import socket from '../config/socket';
import { useSelector } from 'react-redux';
import { useGetAdminIdQuery } from '../store/slices/userApiSlice';
import {
    useGetMessageQuery,
    useSetMessageMutation,
} from '../store/slices/messageApiSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const UserChat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [setMessage] = useSetMessageMutation();
    const userData = useSelector((state) => state.user.data);
    const { data: adminId, isSuccess } = useGetAdminIdQuery();
    const message = useGetMessageQuery({ from: userData?._id, to: adminId });
    useEffect(() => {
        socket.on('receive message', (msg) => {
            setMessages((pre) => [...pre, msg]);
        });
        socket.on('connect_error', (error) => {
            console.log('socket error>>>', error);
        });
        socket.on('disconnect', (reason, details) => {
            console.log(reason);
        });
    }, []);

    useEffect(() => {
        if (message.data) {
            setMessages(message.data);
        }
    }, [message]);
    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        setMessages((pre) => {
            return [
                ...pre,
                { content: input, to: adminId, from: userData?._id },
            ];
        });
        if (isSuccess) {
            socket.emit('send message', {
                content: input,
                to: adminId,
                from: userData?._id,
            });
            await setMessage({
                content: input,
                from: userData?._id,
                to: adminId,
            }).unwrap();
        }
        setInput('');
    };
    return (
        <Container className="mt-5" style={{ width: '800px' }}>
            {messages?.length >= 1 && (
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
            )}
            <Form className="mx-auto d-flex mt-3">
                <Form.Group className="mb-3" controlId="input">
                    <Form.Control
                        type="input"
                        placeholder="Enter"
                        onChange={handleInput}
                        required
                        value={input}
                        style={{ width: '700px' }}
                        className="me-3"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="button">
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
    );
};

export default UserChat;
