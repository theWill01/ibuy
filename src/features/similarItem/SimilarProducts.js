import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/rating/Rating";
import axiosInstance from "../../services/Axios";
import {
  allProducts,
  filterByRam,
  productsStatus,
  similarItems,
  singleItem,
} from "../products/ProductsSlice";
import ReactPaginate from "react-paginate";
import PaginationItems from "../../components/pagination/PaginationItems";
import "../../styles/Pagination.scss";
import { fetchItems, requestStatus, similar } from "./SimilarItemSlice";
import {useLoaderData} from "react-router-dom";

const SimilarProducts = (props) => {
  const loaderVal = useLoaderData()
  const dispatch = useDispatch();
  const singleProduct = useSelector(singleItem);
  const similarProducts = useSelector(similar);
  const status = useSelector(requestStatus);
  const ram = loaderVal[0].ram;
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = similarProducts.slice(itemOffset, endOffset);
  const itemsLength = similarProducts.length;
  useEffect(() => {
    setPageCount(Math.ceil(itemsLength / itemsPerPage));
    if (status === "idle") {
      dispatch(fetchItems(ram));
    }
  }, [dispatch, status, ram, itemsLength]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % itemsLength;
    setItemOffset(newOffset);
  };
  let page;
  switch (status) {
    case "loading":
      page = <>Loading</>;
      break;
    case "success":
      page =
        currentItems &&
        currentItems.map((item, index) => {
          const filterKey = item.brand;
          return (
            <PaginationItems
              item={item}
              key={index}
              filterKey={filterKey}
              className={loaderVal[0].id !== item.id ? "" : "hidden"}
            />
          );
        });
      break;

    default:
    case "idle":
      break;
  }
  return (
    <div className="h-[100%] w-[100%] border border-blue-700 ">
      {/*SIMILAR ITEMS*/}
      <article className="h-[75.3%] sm:h-[92%] lg:h-[85%] w-[100%]  overflow-hidden block md:flex flex-col md:flex-row flex-wrap border border-black relative md:justify-start lg:justify-evenly">
        {page}
      </article>
      <hr className="border border-[#709ad2]" />
      <article className="h-[34px] lg:h-[27px] relative top-0  border border-red-500 ">
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
    </div>
  );
};

export const MemoisedSimilarProducts = React.memo(SimilarProducts);
