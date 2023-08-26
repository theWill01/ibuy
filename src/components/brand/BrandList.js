import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import "../../styles/Pagination.scss";
import {
  allProducts,
  filterByBrand,
  productsError,
  productsStatus,
} from "../../features/posts/PostsSlice";
import PaginationItems from "../pagination/PaginationItems";
import SideBar from "../sidebar/Sidebar";
import axiosInstance from "../../services/Axios";

function BrandList() {
  const products = useLoaderData();
  const params = useParams();
  // const products = useSelector(allProducts);
  const error = useSelector(productsError);
  const status = useSelector(productsStatus);
  const filterKey = params.brand;
  const itemsPerPage = 8;
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [status, itemOffset, products]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  let box;

  switch (status) {
    case "loading":
      box = <>Loading...</>;

      break;
    case "success":
      box =
        currentItems &&
        currentItems.map((item, index) => (
          <PaginationItems item={item} filterKey={filterKey} key={index} />
        ));

      break;

    case "failed":
      box = <h1>OOOPS something went wrong : {error}</h1>;
      break;

    default:
    case "idle":
      break;
  }

  return (
    <section className="category-container w-100 h-[100%] flex">
      <article className="w-full h-full sm:w-[80%] flex flex-col justify-between border border-black">
        {" "}
        <div className="w-[100%] h-[95%] border border-black">
          <h1 className="text-[0.9rem] font-bold underline">RESULTS</h1>
          <h1 className="text-[0.9rem]">
            <strong>{filterKey.toUpperCase()} Devices</strong>
          </h1>
          <div className="flex flex-start flex-wrap overflow-hidden">{box}</div>
        </div>
        <div className="border border-red-500 w-full">
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
    </section>
  );
}

export default BrandList;

export const checkForBrand = async (val) => {
  const result = await axiosInstance.get(`products?brand=${val}`);
  return result.data;
};
