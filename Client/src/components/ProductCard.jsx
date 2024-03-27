import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';

function ProductCard({prop}) {

    return (
        <Container className='mt-3'>
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={prop.image} style={{ height: 140 }}/>
                <Card.Body>
                    <Card.Title>{prop.productName}</Card.Title>
                    <Card.Text>
                        {prop.price}$
                    </Card.Text>
                    <Button variant="primary">Buy</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ProductCard