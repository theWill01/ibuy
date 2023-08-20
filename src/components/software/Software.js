import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  allProducts,
  productsStatus,
  softwareFilter,
} from "../../features/products/ProductsSlice";
import SideBar from "../sidebar/Sidebar";
import PaginationItems from "../pagination/PaginationItems";
import "../../styles/Pagination.scss";
export default function Software() {
  const params = useParams();
  const dispatch = useDispatch();
  const software = params.software;
  const products = useSelector(allProducts);
  const status = useSelector(productsStatus);

  const itemsPerPage = 8;
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));

    if (status === "idle") {
      dispatch(softwareFilter(software));
    }
  }, [status, dispatch, software, itemOffset, products]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };


  let content;

  switch (status) {
    case "loading":
      content = <>Loading......</>;
      break;
    case "success":
      content =
        currentItems &&
        currentItems.map((item) => <PaginationItems item={item} />);
      break;

    default:
      break;
  }

  return (
    <div className="flex h-full">
      <article className="w-[30%] border border-black hidden sm:block">
        <SideBar />
      </article>

      <article className="w-full sm:w-[70%] h-full flex flex-col justify-between">
        <div>
          <h1 className="text-[0.99rem]">
            <strong> {software.toUpperCase()}</strong>
          </h1>
          <article className="flex flex-wrap justify-start w-[100%] border border-black">
            {content}
          </article>
        </div>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next "
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

