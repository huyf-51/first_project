import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../slices/productApiSlice';

function ListProductItem({ currentItems }) {
    const [id, setId] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [productInPage, setProductInPage] = useState([]);
    const [deleteProduct, result] = useDeleteProductMutation();
    // const [remove, setRemove] = useState(false)
    console.log('current item: ', currentItems);
    // console.log('product in page: ', productInPage);
    useEffect(() => {
        setProductInPage(currentItems);
    }, [currentItems]);

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
        // axios.delete(`/product/delete/${id}`).then(() => {
        //     console.log('delete success');
        //     const currentProducts = productInPage.filter(
        //         (product) => product._id !== id
        //     );
        //     setProductInPage(currentProducts);
        // });
        await deleteProduct(id).unwrap();
        const currentProducts = productInPage.filter(
            (product) => product._id !== id
        );
        setProductInPage(currentProducts);
        // setRemove(false)
        setShow(false);
    };

    return (
        <>
            <Container className="mt-5">
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productInPage.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
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
