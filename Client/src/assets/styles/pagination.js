import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const MyPaginate = styled(ReactPaginate).attrs({
    // You can redefine classes here, if you want.
    activeClassName: 'active', // default to "selected"
})`
    margin-bottom: 2rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0 5rem;
    justify-content: center;
  
    li a {
      padding: 0.1rem 1rem;
      border: gray 1px solid;
      cursor: pointer;
    }

    li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
      border: gray 1px solid;
      text-decoration: none;
    }
    li.previous a {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    li.next a {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    li.next a: hover ,
    li.previous a: hover {
        background-color: #007bff;
        color: white;
    }
    li.active a {
      background-color: #0366d6;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disabled a: hover {
      background-color: white;
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;

export default MyPaginate;
