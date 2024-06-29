import { useState } from 'react';
import MyPaginate from '../assets/styles/pagination';
import HomeProductItem from '../components/HomeProductItem';
import { useGetProductsQuery } from '../store/slices/productApiSlice';
import { useLocation } from 'react-router-dom';
import ProductNotFound from '../components/ProductNotFound';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

function Home() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword') ? query.get('keyword') : '';
    const { data, isSuccess, isLoading } = useGetProductsQuery(keyword);
    const itemsPerPage = 16;

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
            return <ProductNotFound />;
        }
        return (
            <>
                {/* <Carousel>
                    <Carousel.Item>
                        <Image
                            src="https://i.pinimg.com/736x/d0/e6/cb/d0e6cb61e5c861d5399700bd358cebf9.jpg"
                            className="mx-auto d-block"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>
                                Nulla vitae elit libero, a pharetra augue mollis
                                interdum.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                            src="https://img.freepik.com/free-vector/instagram-carousel-templates_23-2148792298.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705449600&semt=ais"
                            className="mx-auto d-block"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                            src="https://img.freepik.com/free-vector/instagram-carousel-templates_52683-51654.jpg"
                            className="mx-auto d-block"
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> */}
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
        return (
            <Container className="mt-5">
                <Spinner animation="border" variant="secondary" />
            </Container>
        );
    }
}

export default Home;
