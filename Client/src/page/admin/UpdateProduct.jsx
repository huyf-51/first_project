import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useFindProductByIdQuery,
    useUpdateProductMutation,
} from '../../store/slices/productApiSlice';
import ProductNotExist from '../../components/ProductNotExist';

function UpdateProduct() {
    console.log('update');
    const { id } = useParams();
    const [product, setProduct] = useState({
        productName: '',
        image: '',
        price: '',
    });

    const handleproduct = (e) => {
        setProduct((preProduct) => {
            return { ...preProduct, [e.target.id]: e.target.value };
        });
    };
    const { data, isError } = useFindProductByIdQuery(id);
    useEffect(() => {
        setProduct((preproduct) => {
            return { ...preproduct, ...data };
        });
    }, [data]);
    const [updateProduct, resultUpdate] = useUpdateProductMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({ id, product }).unwrap();
        } catch (error) {}
    };

    if (isError || resultUpdate.isError) {
        return <ProductNotExist />;
    }

    return (
        <>
            <Container className="mt-5">
                <Form>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={product.productName}
                            onChange={handleproduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image url"
                            value={product.image}
                            onChange={handleproduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter price"
                            value={product.price}
                            onChange={handleproduct}
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
                    {resultUpdate.data && (
                        <Form.Group>
                            <Form.Text>{resultUpdate.data.status}</Form.Text>
                        </Form.Group>
                    )}
                </Form>
            </Container>
        </>
    );
}

export default UpdateProduct;
