import React from 'react';
import styled from 'styled-components'
import Pagination from "react-js-pagination";
import LeftArrowActive from '../../images/left-arrow-active.svg'
import LeftArrowInActive from '../../images/left-arrow-inactive.svg'
import RightArrowActive from '../../images/right-arrow-active.svg'
import RightArrowInActive from '../../images/right-arrow-inactive.svg'


const PaginationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    li {
        float: left !important;
    }

    .pagination li a {
        color: #7d96a1;
        background-color: white;
        font-weight: bold;
        padding: 5px 10px;
        text-decoration: none;
        transition: background-color .3s;
        border: 1px solid #ddd;
    }

    .pagination li:first-child a {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        font-weight: bold;
    }

    .pagination .disabled #prev {
        content: url(${LeftArrowInActive});
    }

    .pagination .disabled #next {
        content: url(${RightArrowInActive});
    }

    .pagination .active a {
        color: salmon;
    }

    .pagination li:last-child a {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        font-weight: bold;
    }
`

const PageLimitSelector = styled.select`
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 2px;
    margin-top: -8px;
    color: #7d96a1;
    font-weight: bold;
    outline: none;
`


const PaginationBar = ({ pageRangeDisplayed, activePage, itemsCountPerPage, totalItemsCount, onChange, pageLimit, onPageLimitChange }) => (
    <PaginationWrapper>
        <Pagination
            hideFirstLastPages
            pageRangeDisplayed={pageRangeDisplayed}
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            prevPageText={<img src={LeftArrowActive} id='prev' alt="" />}
            nextPageText={<img src={RightArrowActive} id='next' alt="" />}
            onChange={onChange}
        />

        <PageLimitSelector
            value={pageLimit || "25"}
            onChange={(e) => onPageLimitChange(e.target.value)}
            label="Age"
        >
            <option disabled value={""}>Page Limit</option>
            <option value={"25"}>25</option>
            <option value={"50"}>50</option>
            <option value={"100"}>100</option>
            <option value={"500"}>500</option>
        </PageLimitSelector>
    </PaginationWrapper>
);

export default PaginationBar;