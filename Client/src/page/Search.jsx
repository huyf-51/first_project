import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MyPaginate from '../assets/styles/pagination';

import { useLocation } from 'react-router-dom';

function Items({ currentItems }) {
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

function Search() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');
    console.log('search page');
    const [products, setProducts] = useState([]);
    const itemsPerPage = 16;
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    // useEffect(() => {
    //     axios.get(`/search?keyword=${keyword}`).then((res) => {
    //         setProducts(res.data);
    //     });
    // }, [keyword]);

    return (
        <>
            <Items currentItems={currentItems} />
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

export default Search;
