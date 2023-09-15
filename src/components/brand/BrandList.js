import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useLoaderData, useParams } from "react-router-dom";
import "../../styles/Pagination.scss";
import PaginationItems from "../pagination/PaginationItems";
import axiosInstance from "../../services/Axios";
import { useDispatch, useSelector } from "react-redux";
import {
  currentPosts,
  items,
  pages,
  updateCurrentItems,
  updateItems,
  updatePageCount,
} from "../../features/pagination/PaginationSlice";

function BrandList() {
  const products = useLoaderData();
  const dispatch = useDispatch();
  const currentItems = useSelector(currentPosts);
  const itemsOffset = useSelector(items);
  const pageCount = useSelector(pages);
  const params = useParams();
  const filterKey = params.brand;
  const itemsPerPage = 8;
  useEffect(() => {
    const endOffset = itemsOffset + itemsPerPage;
    dispatch(updateCurrentItems(products.slice(itemsOffset, endOffset)));
    dispatch(updatePageCount(Math.ceil(products.length / itemsPerPage)));
  }, [itemsOffset, products, dispatch]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    dispatch(updateItems(newOffset));
  };

  const box =
    currentItems &&
    currentItems.map((item, index) => (
      <PaginationItems item={item} filterKey={filterKey} key={index} />
    ));

  return (
    <section className="category-container w-full h-[100%] flex border border-green-500">
      <article className="w-full h-full sm:w-[80%] md:w-full flex flex-col justify-between border border-black">
        {" "}
        <article className="w-[100%] h-[95%] border border-black">
          <h1 className="text-[0.9rem] font-bold underline">RESULTS</h1>
          <h1 className="text-[0.9rem]">
            <strong>{filterKey.toUpperCase()} Devices</strong>
          </h1>
          <div className="flex flex-start flex-wrap overflow-hidden">{box}</div>
        </article>
        <article className="border border-red-500 w-full">
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
        </article>
      </article>
    </section>
  );
}

export default BrandList;

export const checkForBrand = async (val) => {
  const result = await axiosInstance.get(`products?brand=${val}`);
  return result.data;
};
