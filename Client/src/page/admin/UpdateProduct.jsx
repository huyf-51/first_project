import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/esm/Row';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useFindProductByIdQuery,
    useUpdateProductMutation,
} from '../../store/slices/productApiSlice';
import ProductNotExist from '../../components/ProductNotExist';

function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        productName: '',
        price: '',
        inStock: '',
    });

    const handleProduct = (e) => {
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
            <Container className="mt-5 mb-5">
                <Form>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={product.productName}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter price"
                            value={product.price}
                            onChange={handleProduct}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="inStock">
                        <Form.Label>In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter quantity"
                            value={product.inStock}
                            onChange={handleProduct}
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
