import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import { CSVLink } from 'react-csv';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';
import { useImportProductsMutation } from '../store/slices/productApiSlice';

const HeaderListProduct = ({ data }) => {
    const [importProducts] = useImportProductsMutation();

    const handleSort = async () => {
        // try {
        //     const res = await axios.get('product/sortByPrice');
        //     setProducts(res.data);
        // } catch (error) {}
        // try {
        // }
    };

    const handleImport = (event) => {
        const importFile = event.target.files[0];
        if (!importFile) {
            toast.warn('no file imported');
        } else {
            if (importFile.type !== 'text/csv')
                toast.error('The format file must be text/csv');
            else {
                Papa.parse(importFile, {
                    header: true,
                    complete: async function (result) {
                        await importProducts(result.data).unwrap();
                        toast.success('import product success');
                    },
                });
            }
        }
    };
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Button onClick={handleSort}>Sort By Price</Button>
                    </Col>
                    <Col>
                        <CSVLink
                            data={data}
                            filename="product-data.csv"
                            className="btn btn-warning"
                        >
                            Export
                        </CSVLink>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label
                                htmlFor="import"
                                className="btn btn-success"
                            >
                                Import
                            </Form.Label>
                            <Form.Control
                                type="file"
                                id="import"
                                onChange={(event) => {
                                    handleImport(event);
                                }}
                                hidden
                            />
                            <ToastContainer />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HeaderListProduct;
