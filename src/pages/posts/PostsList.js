import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  //allPosts,
  fetchPosts,
  productsStatus,
} from "../../features/posts/PostsSlice";
import PaginationItems from "../../components/pagination/PaginationItems";
import SideBar from "../../components/sidebar/Sidebar";
import ReactPaginate from "react-paginate";
import "../../styles/Pagination.scss";
import { useLoaderData } from "react-router-dom";
import axiosInstance from "../../services/Axios";
import {
  items,
  pages,
  updateItems,
  updatePageCount,
} from "../../features/pagination/PaginationSlice";

export default function PostsList() {
  const dispatch = useDispatch();
  const allPosts = useLoaderData();
  const itemsOffset = useSelector(items);
  const pageCount = useSelector(pages);
  const itemsPerPage = 12;
  const endOffset = itemsOffset + itemsPerPage;
  const currentItems = allPosts.slice(itemsOffset, endOffset);
  useEffect(() => {
    dispatch(updatePageCount(Math.ceil(allPosts.length / itemsPerPage)));
  }, [allPosts, dispatch]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % allPosts.length;
    console.log(
      `user requested page number ${e.selected}, which is offset ${newOffset}`
    );
    dispatch(updateItems(newOffset));
  };

  const content =
    currentItems &&
    currentItems.map((item, index) => {
      const filterKey = item.brand;

      return <PaginationItems item={item} key={index} filterKey={filterKey} />;
    });

  return (
    <section className=" h-full w-[99%] min-[600px]:h-full md:w-[70%] lg:w-[76%] xl:w-[78%] p-0">
      {/*OUR PAGE CONTENT */}

      <span className="flex min-[600px]:h-[10%]">
        <h1 className="w-[20%] font-bold text-[0.6rem] min-[600px]:text-[0.9rem] xl:text-[1.7rem] ">
          ALL Brands
        </h1>
        <h3 className="text-[0.6rem] min-[600px]:text-[0.8rem] font-bold">
          SAMSUNG LG IPHONE XIAOMI GIONEE AND MANY MORE......
        </h3>
      </span>
      {/* OUR PRODUCTS LIST*/}
      <article className="flex relative flex-col md:flex-row top-0 flex-wrap justify-start md:justify-evenly w-[100%] h-full md:h-[95%]  min-[600px]:h-[80%]">
        {content}
      </article>
      {/* PAGINATION BUTTONS*/}
      <article className="relative bottom-[0] my-0 mx-auto border-t-[#EAE6E6] w-[100%] h-[50px] p-[2px]">
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
      </article>
    </section>
  );
}

export const getAllPosts = async () => {
  const response = await axiosInstance.get("products");
  return response.data;
};
