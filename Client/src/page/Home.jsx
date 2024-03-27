import { useState } from 'react';
import MyPaginate from '../assets/styles/pagination';
import HomeProductItem from '../components/HomeProductItem';
import { useGetProductsQuery } from '../slices/productApiSlice';

function Home() {
    const { data, isSuccess, isLoading } = useGetProductsQuery();
    const itemsPerPage = 16;
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

    if (isSuccess) {
        return (
            <>
                <HomeProductItem currentItems={currentItems} />
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

export default Home;
