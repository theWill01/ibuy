import { current } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import PaginationItems from "../../components/pagination/PaginationItems";
import axiosInstance from "../../services/Axios";
import { singleItem } from "../posts/PostsSlice";
import { fetchSimilarBrand, requestStatus, sameItems } from "./SameBrandSlice";
import { useLoaderData } from "react-router-dom";

const SameBrand = () => {
  const loaderValue = useLoaderData();

  const dispatch = useDispatch();
  const items = useSelector(sameItems);
  const single = useSelector(singleItem);
  const itemsLength = items.length;
  const status = useSelector(requestStatus);
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const brand = loaderValue[0].brand;
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSimilarBrand(brand));
    }
  }, [itemsLength, dispatch, status, brand]);

  let page = "";

  switch (status) {
    case "loading":
      page = <>Loading</>;
      break;
    case "success":
      page =
        currentItems &&
        currentItems.map((item, index) => {
          const filterKey = brand;
          return (
            <PaginationItems item={item} key={index} filterKey={filterKey} />
          );
        });
      break;

    default:
    case "idle":
      break;
  }
  return (
    <div className="h-[100%] w-[100%] border border-blue-700 relative">
      {/*SIMILAR ITEMS*/}
      <article className="h-[75.3%] sm:h-[92%] lg:h-[85%] w-[100%]  overflow-hidden block md:flex flex-col md:flex-row flex-wrap border border-black relative md:justify-evenly">
        {page}
      </article>
    </div>
  );
};

export const MemoisedSameBrand = React.memo(SameBrand);
