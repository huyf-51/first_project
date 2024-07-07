import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../store/slices/productApiSlice';
import ProductNotExist from './ProductNotExist';

function ListProductItem({ currentItems, refetch }) {
    const [id, setId] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [deleteProduct, { isError }] = useDeleteProductMutation();

    const handleUpdate = (id) => {
        navigate(`/product/update/${id}`);
    };

    const handleClickDelete = (id) => {
        setId(id);
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(id).unwrap();
            setShow(false);
            refetch();
        } catch (error) {}
    };

    if (isError) {
        return <ProductNotExist />;
    }

    return (
        <>
            <Container className="mt-5">
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.inStock}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            handleUpdate(item._id);
                                        }}
                                    >
                                        update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            handleClickDelete(item._id);
                                        }}
                                    >
                                        delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Delete this product ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ListProductItem;
