import MyPaginate from '../../assets/styles/pagination';
import ListProductItem from '../../components/ListProductItem';
import { useSearchOrGetProductsQuery } from '../../store/slices/productApiSlice';
import ProductNotFound from '../../components/ProductNotFound';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import '../../assets/styles/Checkout.css';

function ListProduct() {
    const { data, isLoading, isSuccess, refetch } =
        useSearchOrGetProductsQuery();
    const itemsPerPage = 10;

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data?.length;
        setItemOffset(newOffset);
    };

    if (isSuccess) {
        if (data.length === 0) {
            return (
                <>
                    <ProductNotFound />
                </>
            );
        }
        return (
            <>
                <ListProductItem
                    currentItems={currentItems}
                    refetch={refetch}
                />
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
        return (
            <Container className="mt-5">
                <Spinner animation="border" variant="secondary" />
            </Container>
        );
    }
}

export default ListProduct;
