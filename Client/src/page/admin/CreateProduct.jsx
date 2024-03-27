import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import { useCreateProductMutation } from '../../slices/productApiSlice';

function CreateProduct() {
    const [message, setMessage] = useState(undefined);
    const [input, setInput] = useState({
        productName: '',
        image: '',
        price: '',
    });
    const [createProduct, result] = useCreateProductMutation();

    const handleInput = (e) => {
        setInput((preInput) => {
            return { ...preInput, [e.target.id]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // axios.post('/product/create', input).then((res) => {
        //     setMessage(res.data.message);
        // });
        const data = await createProduct(input).unwrap();
        setMessage(data.message);
        setInput({
            productName: '',
            image: '',
            price: '',
        });
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
                        Create
                    </Button>

                    <Form.Group>
                        <Form.Text>{message}</Form.Text>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default CreateProduct;
