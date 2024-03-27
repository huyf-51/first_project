import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        navigate('/search')
    }

    return (
        <Form style={{ width: 600 }} onSubmit={handleSubmit}>
            <Container fluid>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="search product by name"
                            name="keyword"
                        />
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default SearchInput;