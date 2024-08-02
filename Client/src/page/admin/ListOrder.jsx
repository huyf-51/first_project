import MyPaginate from '../../assets/styles/pagination';
import { useGetAllOrderQuery } from '../../store/slices/orderApiSlice';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import '../../assets/styles/Checkout.css';
import ListOrderItem from '../../components/ListOrderItem';

function ListOrder() {
    const { data, isLoading, isSuccess, refetch } = useGetAllOrderQuery();
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
            return <>Dont have any order</>;
        }
        return (
            <>
                <ListOrderItem currentItems={currentItems} refetch={refetch} />
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

export default ListOrder;
