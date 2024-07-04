import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';

function ProductCard({ prop }) {
    return (
        <Container className="mt-3">
            <Card style={{ width: '15rem' }}>
                <Link to={`/product/${prop._id}`}>
                    <Card.Img
                        variant="top"
                        src={prop.imageUrl}
                        style={{ height: 170 }}
                    />
                    <Card.Body>
                        <Card.Title>{prop.productName}</Card.Title>
                        <Card.Text>{prop.price}$</Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </Container>
    );
}

export default ProductCard;
