import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideBar from "../components/sidebar/Sidebar";
import PaginationItems from "../components/pagination/PaginationItems";
import ReactPaginate from "react-paginate";
import {
  allPosts,
  productsStatus,
  filterYear,
  byYear,
} from "../features/posts/PostsSlice";
import Pagination from "../components/pagination/Pagination";
import axiosInstance from "../services/Axios";
import "../styles/Pagination.scss";

export default function Year() {
  const params = useParams();
  const dispatch = useDispatch();
  const filterKey = params.year;

  const status = useSelector(productsStatus);
  const products = useSelector(byYear);
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const itemsLength = products.length;
  useEffect(() => {
    setPageCount(Math.ceil(itemsLength / itemsPerPage));
    if (status === "idle") {
      dispatch(filterYear(filterKey));
    }
  }, [dispatch, status, filterKey, itemsLength]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % itemsLength;
    console.log(
      `user requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const content =
    currentItems &&
    currentItems.map((item, index) => (
      <PaginationItems item={item} key={index} filterKey={filterKey} />
    ));

  return (
    <div className="flex h-full">
      <article className="w-[30%] border border-black hidden sm:block">
        <SideBar />
      </article>
      <article className="w-full sm:w-[70%] flex flex-col justify-between border border-black">
        <div>
          <h1>See Devices released in {filterKey}</h1>
          <article className="flex flex-wrap justify-start w-[100%]">
            {content}
          </article>
        </div>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            activeLinkClassName="active"
            activeClassName="active"
            pageClassName="page-num-box"
            previousClassName="prev"
            nextClassName="next"
          />
        </div>
      </article>
    </div>
  );
}
