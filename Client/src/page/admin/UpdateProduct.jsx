import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useFindProductByIdQuery,
    useUpdateProductMutation,
} from '../../slices/productApiSlice';

function UpdateProduct() {
    const [message, setMessage] = useState(undefined);
    const { id } = useParams();
    const [input, setInput] = useState({
        productName: '',
        image: '',
        price: '',
    });

    const handleInput = (e) => {
        setInput((preInput) => {
            return { ...preInput, [e.target.id]: e.target.value };
        });
    };

    // useEffect(() => {
    //     axios.get(`/product/edit/${id}`).then((res) => {
    //         setInput((preInput) => {
    //             return { ...preInput, ...res.data };
    //         });
    //     });
    // }, []);
    const { data } = useFindProductByIdQuery(id);
    const [updateProduct, result] = useUpdateProductMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // axios.patch(`/product/update/${id}`, input).then((res) => {
        //     console.log('updated');
        //     setMessage(res.data.message);
        // });
        const data = await updateProduct({ id, input }).unwrap();
        setMessage(data.message);
    };

    return (
        <>
            <Container className="mt-5">
                <Form>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={input.productName}
                            onChange={handleInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image url"
                            value={input.image}
                            onChange={handleInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter price"
                            value={input.price}
                            onChange={handleInput}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                    <Form.Group>
                        <Form.Text>{message}</Form.Text>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default UpdateProduct;
