import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Pagination from "../components/pagination/Pagination";
import PaginationItems from "../components/pagination/PaginationItems";
import SideBar from "../components/sidebar/Sidebar";
import {
  allProducts,
  editProducts,
  fetchProducts,
  productsStatus,
  searchProducts,
} from "../features/products/ProductsSlice";
import axiosInstance from "../services/Axios";

const Search = () => {
  const params = useParams();
  const searchInput = params.search;
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const status = useSelector(productsStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const lastPageIndex = currentPage * productsPerPage;
  const firstPageIndex = lastPageIndex - productsPerPage;
  const results = products.filter(
    (product) =>
      product.brand.includes(searchInput) === true ||
      product.title.includes(searchInput) === true
  );
  const totalProducts = results.length;

  const paginate = results.slice(firstPageIndex, lastPageIndex);


  useEffect(() => {
    if (status === "idle") {
      try {
       dispatch(searchProducts(searchInput));
       
      } catch (error) {
        return error.message;
      }
    }
  }, [dispatch, status, searchInput]);

  let result;
  switch (status) {
    case "loading":
      result = <>Loading.....</>;
      break;
    case "success":
      result =
        results &&
        results.map((item, index) => (
          <PaginationItems
            item={item}
            setCurrentPage={setCurrentPage}
            key={index}
          />
        ));
      break;
    default:
      break;
  }
  const paginationNumbers = (
    <Pagination
      currentPage={currentPage}
      productsPerPage={productsPerPage}
      totalProducts={totalProducts}
    />
  );
  return (
    <section className="flex w-full h-full">
      <article className="w-[30%] hidden sm:block">
        <SideBar />
      </article>
      <article className="w-full sm:w-[65%]">
        <h1 className="text-[2.5rem]">{searchInput.toUpperCase()}</h1>
        <article className="flex flex-wrap">{result}</article>
        <article>{paginationNumbers}</article>
      </article>
    </section>
  );
};

export default Search;
