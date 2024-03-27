import ProductCard from './ProductCard';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function HomeProductItem({ currentItems }) {
    return (
        <>
            <Container className="mt-3 mb-4">
                <Row>
                    {currentItems.map((product, index) => (
                        <Col key={index}>
                            <ProductCard prop={product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default HomeProductItem;
