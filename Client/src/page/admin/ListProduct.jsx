import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import { CSVLink } from 'react-csv';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';
import MyPaginate from '../../assets/styles/pagination';
import ListProductItem from '../../components/ListProductItem';
import { useGetProductsQuery } from '../../slices/productApiSlice';

function ListProduct() {
    const { data, isLoading, isSuccess } = useGetProductsQuery();
    console.log('manage product');

    const itemsPerPage = 10;
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data?.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    // useEffect(() => {
    //     const getProduct = async () => {
    //         try {
    //             const res = await axios.get('/product/list')
    //             setProducts(res.data)
    //         } catch (error) {
    //             await logout()
    //             navigate('/user/login')
    //         }
    //     }
    //     getProduct()
    // }, [])

    const handleSort = async () => {
        // try {
        //     const res = await axios.get('product/sortByPrice');
        //     setProducts(res.data);
        // } catch (error) {}
    };

    const handleImport = (event) => {
        // const importFile = event.target.files[0];
        // if (!importFile) {
        //     toast('no file imported');
        // } else {
        //     if (importFile.type !== 'text/csv')
        //         toast('The format file must be text/csv');
        //     else {
        //         Papa.parse(importFile, {
        //             header: true,
        //             complete: async function (result) {
        //                 const res = await axios.post(
        //                     '/product/import',
        //                     result.data
        //                 );
        //                 console.log('import success');
        //                 setProducts(res.data);
        //                 toast('import product success');
        //             },
        //         });
        //     }
        // }
    };

    if (isSuccess) {
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
                <ListProductItem currentItems={currentItems} />
                <MyPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }

    if (isLoading) {
        return <>Loading ...</>;
    }
}

export default ListProduct;
