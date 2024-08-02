import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { getDateMonthYear } from '../utils/orderUtils';

function ListOrderItem({ currentItems }) {
    const navigate = useNavigate();

    return (
        <>
            <Container className="mt-5">
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Total Price</th>
                            <th>Payment</th>
                            <th>Created At</th>
                            <th>Confirmation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item._id}</td>
                                <td>{item.totalPrice}</td>
                                <td>{item.isPayed ? 'done' : 'pending'}</td>
                                <td>{getDateMonthYear(item.createdAt)}</td>
                                <td>{item.isConfirmed ? 'done' : 'not yet'}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            navigate(
                                                `/order/detail/${item._id}`
                                            );
                                        }}
                                    >
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ListOrderItem;
