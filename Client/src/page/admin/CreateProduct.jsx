import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useRef, useState } from 'react';
import { useCreateProductMutation } from '../../store/slices/productApiSlice';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/esm/Row';

function CreateProduct() {
    const [input, setInput] = useState({
        productName: '',
        imageUrl: '',
        price: '',
        quantity: undefined,
        category: 'ipad',
    });
    const inputFile = useRef();

    const [createProduct, { data }] = useCreateProductMutation();

    const handleInput = (e) => {
        setInput((preInput) => {
            return { ...preInput, [e.target.id]: e.target.value };
        });
    };

    const handleInputFile = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        setInput((preInput) => {
            return { ...preInput, [e.target.id]: '' };
        });

        reader.onloadend = () => {
            setInput((preInput) => {
                return { ...preInput, [e.target.id]: reader?.result };
            });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(input).unwrap();
            inputFile.current.value = '';
            setInput({
                productName: '',
                imageUrl: '',
                price: '',
                quantity: '',
                category: 'ipad',
            });
        } catch (error) {}
    };

    return (
        <>
            <Container className="mt-5 mb-5">
                <Form encType="multipart/form-data">
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
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            onChange={handleInput}
                            value={input.category}
                        >
                            <option value="ipad">Ipad</option>
                            <option value="iphone">Iphone</option>
                            <option value="mac">Mac</option>
                            <option value="watch">Watch</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            ref={inputFile}
                            type="file"
                            onChange={handleInputFile}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Row>
                            <Form.Label>Image Preview</Form.Label>
                        </Row>
                        <Row>
                            <Image src={input.imageUrl} className="w-50" />
                        </Row>
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
                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter quantity"
                            value={input.quantity}
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

                    {data && (
                        <Form.Group>
                            <Form.Text>{data.status}</Form.Text>
                        </Form.Group>
                    )}
                </Form>
            </Container>
        </>
    );
}

export default CreateProduct;
