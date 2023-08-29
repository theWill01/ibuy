import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";

import Pagination from "../components/pagination/Pagination";
import PaginationItems from "../components/pagination/PaginationItems";
import axiosInstance from "../services/Axios";

const Search = () => {
  const params = useParams();
  const searchInput = params.search;

  const products = useLoaderData();
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

  const result =
    results &&
    results.map((item, index) => (
      <PaginationItems
        item={item}
        setCurrentPage={setCurrentPage}
        key={index}
      />
    ));

  const paginationNumbers = (
    <Pagination
      currentPage={currentPage}
      productsPerPage={productsPerPage}
      totalProducts={totalProducts}
    />
  );
  return (
    <section className="flex w-[70%] w-full h-full">
    
      <article className="w-full sm:w-[65%]">
        <h1 className="text-[1rem]">showing results for {searchInput.toUpperCase()}</h1>
        <article className="flex flex-wrap">{result}</article>
        <article>{paginationNumbers}</article>
      </article>
    </section>
  );
};

export default Search;

export const searchProducts = async (value) => {
  const response = await axiosInstance.get(`products?q=${value}`);
  console.log(response)
  return response.data;
};
