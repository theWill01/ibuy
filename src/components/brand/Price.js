import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  allPosts,
  fetchProducts,
  filterByPrice,
  productsStatus,
} from "../../features/posts/PostsSlice";
import axiosInstance from "../../services/Axios";
import PaginationItems from "../pagination/PaginationItems";
import SideBar from "../sidebar/Sidebar";
import ReactPaginate from "react-paginate";

export default function Price() {
  const params = useParams();
  const minPrice = Number(params.minPrice);
  const maxPrice = Number(params.maxPrice);
  const [price, setPrice] = useState([]);
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const products = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `products?price_gte=${minPrice}&price_lte=${maxPrice}`
      );
      setPrice(response.data);
    } catch (error) {
      return error.message;
    }
  }, [minPrice, maxPrice]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = price.slice(itemOffset, endOffset);

  useEffect(() => {
    products();
    return () => {
      setPageCount(Math.ceil(price.length / itemsPerPage));
    };
  }, [products, price.length]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    console.log(
      `user requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const content =
    currentItems &&
    currentItems.map((item, index) => (
      <PaginationItems item={item} key={index} />
    ));

  return (
    <section className="w-[99%] flex">
      {" "}
      <article className="w-[30%] border border-black hidden sm:block">
        <SideBar />
      </article>
      <article className="w-full sm:w-[70%] flex flex-col justify-between">
        <div>
          <span>
            <h1 className="text-[0.99rem]">
              from <strong> ${minPrice}</strong> to <strong>${maxPrice}</strong>
            </h1>
            <hr />
          </span>

          <article className="flex flex-wrap justify-start">{content}</article>
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
    </section>
  );
}


export const check = async () => {
  console.log("hey")
}
